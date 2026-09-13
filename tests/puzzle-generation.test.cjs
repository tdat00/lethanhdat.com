const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

function loadAnimalFaces() {
  const directory = path.join(__dirname, '..', 'toys');
  const html = readFileSync(path.join(directory, 'animal-search-puzzle.html'), 'utf8');
  const script = html.match(/src="(animal-faces(?:\.[a-f0-9]+)?\.js)"/)[1];
  const context = { window: {} };
  vm.runInNewContext(readFileSync(path.join(directory, script), 'utf8'), context);
  return context.window.AnimalFaces;
}

test('animal artwork: 22 distinct faces with stable puzzle codes and three styles', () => {
  const faces = loadAnimalFaces();
  const ids = 'tiger lion pig dog cat rabbit panda penguin fox rhino elephant monkey cow sheep goat zebra deer hippo mouse frog owl chick'.split(' ');
  assert.equal(faces.length, 22);
  assert.ok(Object.isFrozen(faces));
  for (const [index, face] of faces.entries()) {
    assert.equal(face.id, ids[index]);
    assert.equal(face.code, String.fromCharCode(65 + index));
    assert.ok(face.vi && face.en && Object.isFrozen(face));
  }
  for (const style of ['src', 'monochromeSrc', 'minimalSrc']) {
    assert.equal(new Set(faces.map((face) => face[style])).size, 22);
  }
});

test('animal artwork: print styles preserve geometry with grayscale and ink-saving palettes', () => {
  for (const face of loadAnimalFaces()) {
    const drawings = ['src', 'monochromeSrc', 'minimalSrc'].map((style) => {
      assert.ok(face[style].startsWith('data:image/svg+xml;charset=utf-8,'));
      const svg = decodeURIComponent(face[style].split(',')[1]);
      assert.match(svg, /viewBox="0 0 100 100"/);
      assert.match(svg, /stroke-width="2\.8"/);
      assert.doesNotMatch(svg, /undefined|NaN|<image|<filter|<script|<text/);
      if (style === 'minimalSrc') {
        assert.ok([...svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)].every((match) => ['#ffffff', '#000000', 'none'].includes(match[1])), `${face.id}: binary print palette`);
      }
      if (style === 'monochromeSrc') {
        const colors = [...svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)].map((match) => match[1]);
        assert.ok(colors.every((color) => color === 'none' || /^#([a-f0-9]{2})\1\1$/.test(color)), `${face.id}: neutral grayscale`);
        const grayColors = colors.filter((color) => !['none', '#000000', '#ffffff'].includes(color));
        assert.ok(grayColors.every((color) => parseInt(color.slice(1, 3), 16) >= 128), `${face.id}: light to medium gray patches`);
        if (face.id !== 'rabbit') {
          assert.ok(colors.some((color) => !['none', '#ffffff', '#000000'].includes(color)), `${face.id}: gray recognition patches`);
        }
      }
      return svg.replace(/ (?:fill|stroke)="[^"]+"/g, '');
    });
    assert.equal(drawings[0], drawings[1], `${face.id}: monochrome geometry`);
    assert.equal(drawings[0], drawings[2], `${face.id}: minimal geometry`);
  }
});

test('animal artwork: all faces have two level, centered eyes in frontal view', () => {
  for (const face of loadAnimalFaces()) {
    for (const style of ['src', 'monochromeSrc', 'minimalSrc']) {
      const svg = decodeURIComponent(face[style]);
      const eyeRadii = face.id === 'owl' ? 'rx="5" ry="6"' : 'rx="3\\.1" ry="3\\.8"';
      const eyes = [...svg.matchAll(new RegExp(`<ellipse cx="([\\d.]+)" cy="([\\d.]+)" ${eyeRadii} fill="([^"]+)"`, 'g'))];
      assert.equal(eyes.length, 2, `${face.id}: two visible eyes`);
      assert.equal(Number(eyes[0][1]) + Number(eyes[1][1]), 100, `${face.id}: centered eyes`);
      assert.equal(eyes[0][2], eyes[1][2], `${face.id}: level eyes`);
      if (style === 'monochromeSrc') {
        assert.ok(eyes.every((eye) => eye[3] === '#000000'), `${face.id}: dark eyes on lighter gray patches`);
      }
    }
  }
});

function loadGenerator(name, seed = 1) {
  const directory = path.join(__dirname, '..', 'toys');
  const html = readFileSync(path.join(directory, `${name}-search-puzzle.html`), 'utf8');
  const script = html.match(new RegExp(`src="(${name}-search-puzzle\\.[a-f0-9]+\\.js)"`))[1];
  const source = readFileSync(path.join(directory, script), 'utf8');
  const names = ['getDirections', 'canPlacePath', 'createPuzzle'];
  if (name === 'animal') names.push('shuffle', 'pathBetween');
  if (name === 'word') names.push('findContainedWords', 'hasValidIntersections');
  const functions = names.map((name) => {
    const match = source.match(new RegExp(`^  function ${name}\\([^]*?^  \\}`, 'm'));
    assert.ok(match, `Missing function ${name}`);
    return match[0];
  });
  const math = Object.create(Math);
  math.random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return vm.runInNewContext(`${functions.join('\n')}\n({ ${names.join(', ')} })`, {
    Math: math, performance, alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  });
}

function assertValidPuzzle(puzzle, count) {
  assert.ok(puzzle, 'Expected a puzzle');
  assert.equal(puzzle.placements.length, count);
  for (const [index, placement] of puzzle.placements.entries()) {
    assert.equal(placement.path.map(([row, col]) => puzzle.board[row][col]).join(''), placement.word);
    const occupied = new Set(placement.path.map((point) => point.join(',')));
    for (const other of puzzle.placements.slice(index + 1)) {
      const overlap = other.path.filter((point) => occupied.has(point.join(','))).length;
      assert.ok(overlap <= 1, `${placement.word} and ${other.word} share ${overlap} cells`);
    }
  }
  const occurrences = [];
  for (const word of puzzle.words) {
    for (let row = 0; row < puzzle.rows; row++) {
      for (let col = 0; col < puzzle.cols; col++) {
        for (const [rowStep, colStep] of puzzle.directions) {
          const cells = Array.from({ length: word.length }, (_, offset) => [row + offset * rowStep, col + offset * colStep]);
          if (!cells.every(([pathRow, pathCol], index) => puzzle.board[pathRow]?.[pathCol] === word[index])) continue;
          const occupied = new Set(cells.map((point) => point.join(',')));
          for (const other of occurrences) {
            if (other.word === word) continue;
            const overlap = other.cells.filter((point) => occupied.has(point.join(','))).length;
            assert.ok(overlap <= 1, `Actual answers ${word} and ${other.word} share ${overlap} cells`);
          }
          occurrences.push({ word, cells });
        }
      }
    }
  }
}

for (const name of ['word', 'animal']) {
  test(`${name}: reject nested, partial and reversed overlaps`, () => {
    const { canPlacePath } = loadGenerator(name);
    const placements = [{ path: [[0, 0], [0, 1], [0, 2], [0, 3]] }];
    assert.equal(canPlacePath([[0, 1], [0, 2], [0, 3]], placements), false);
    assert.equal(canPlacePath([[0, 2], [0, 3], [0, 4]], placements), false);
    assert.equal(canPlacePath([[0, 3], [0, 2], [0, 1]], placements), false);
    assert.equal(canPlacePath([[0, 3], [0, 4], [0, 5]], placements), true);
    assert.equal(canPlacePath([[1, 0], [1, 1], [1, 2]], placements), true);
  });

  test(`${name}: allow one intersection with each of multiple answers`, () => {
    const { canPlacePath } = loadGenerator(name);
    assert.equal(canPlacePath([[1, 0], [1, 1], [1, 2]], [
      { path: [[0, 0], [1, 0], [2, 0]] },
      { path: [[0, 2], [1, 2], [2, 2]] }
    ]), true);
    assert.equal(canPlacePath([[0, 0]], [{ path: [[0, 0]] }]), true);
  });
}

test('word: impossible nested, partial and reversed overlaps fail', () => {
  const { createPuzzle, getDirections } = loadGenerator('word');
  for (const [cols, words] of [[4, ['SCAT', 'CAT']], [6, ['ABCD', 'CDEF']], [4, ['ABCD', 'DCBA']]]) {
    assert.equal(createPuzzle({ rows: 1, cols, words, directions: getDirections(['horizontal', 'reverse']) }), null);
  }
});

test('word: single-cell intersections fit, but nested words cannot be placed separately', () => {
  const { createPuzzle, getDirections } = loadGenerator('word');
  const directions = getDirections(['horizontal']);
  assertValidPuzzle(createPuzzle({ rows: 1, cols: 3, words: ['AB', 'BC'], directions }), 2);
  assert.equal(createPuzzle({ rows: 2, cols: 4, words: ['SCAT', 'CAT'], directions }), null);
  assertValidPuzzle(createPuzzle({ rows: 1, cols: 3, words: ['CAT', 'A'], directions }), 2);
});

test('word: reversed containment depends on enabled directions', () => {
  const { findContainedWords, getDirections } = loadGenerator('word');
  assert.equal(findContainedWords(['SCAT', 'TAC'], getDirections(['horizontal'])), null);
  assert.ok(findContainedWords(['SCAT', 'TAC'], getDirections(['horizontal', 'reverse'])));
  assert.ok(findContainedWords(['CAT', 'SCAT'], getDirections(['vertical'])));
  assert.equal(findContainedWords(['A', 'CAT'], getDirections(['horizontal', 'reverse'])), null);
});

test('word: detect accidental nested and partial matches on the board', () => {
  const { hasValidIntersections, getDirections } = loadGenerator('word');
  const directions = getDirections(['horizontal', 'reverse']);
  assert.equal(hasValidIntersections([Array.from('SCAT')], ['SCAT', 'CAT'], directions), false);
  assert.equal(hasValidIntersections([Array.from('ABCDEF')], ['ABCD', 'CDEF'], directions), false);
  assert.equal(hasValidIntersections([Array.from('ABC')], ['AB', 'BC'], directions), true);
  assert.equal(hasValidIntersections([Array.from('ABAB')], ['AB'], directions), true);
});

test('word: generated paths satisfy pairwise intersections across seeds and directions', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const { createPuzzle, getDirections } = loadGenerator('word', seed);
    const directions = getDirections(seed % 2 ? ['horizontal', 'vertical'] : ['horizontal', 'vertical', 'diagonal', 'reverse']);
    const words = ['DOOR', 'APPLE', 'GARDEN', 'CLOUD', 'SUN', 'MOON', 'TREE', 'BLOOM', 'ROOM', 'LEAF'];
    assertValidPuzzle(createPuzzle({ rows: 12, cols: 12, words, directions }), words.length);
  }
});

test('animal: generated paths satisfy pairwise intersections across sizes and directions', () => {
  for (let seed = 1; seed <= 20; seed++) {
    for (const [size, count, minLength, maxLength] of [[5, 6, 2, 2], [8, 8, 3, 6], [16, 16, 8, 8]]) {
      const { createPuzzle, getDirections } = loadGenerator('animal', seed);
      const directions = getDirections(seed % 2 ? ['horizontal', 'vertical'] : ['horizontal', 'vertical', 'diagonal', 'reverse']);
      const lengths = Array.from({ length: count }, (_, index) => minLength + index % (maxLength - minLength + 1));
      const puzzle = createPuzzle({ rows: size, cols: size, directions, alphabet: 'ABCDEFGH', lengths, minLength, maxLength });
      assertValidPuzzle(puzzle, count);
      assert.ok(puzzle.words.every((word) => word.length >= minLength && word.length <= maxLength));
    }
  }
});
