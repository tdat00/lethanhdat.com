(() => {
  'use strict';

  const getElement = (id) => document.getElementById(id);
  const form = getElement('settings-form');
  const gridElement = getElement('animal-grid');
  const faces = window.AnimalFaces;
  const animals = new Map(faces.map((face) => [face.code, face]));
  const languageStorageKey = 'word-search-language';
  const settingsStorageKey = 'animal-search-settings-open';
  const translations = {
    vi: {
      title: 'Mê cung con vật', brand: 'mê cung con vật', tagline: 'CHƠI · HỌC · KHÁM PHÁ', language: 'Ngôn ngữ',
      gamesMenu: 'Chọn trò chơi', gamesTitle: 'Trò chơi', gameWords: 'Tìm chữ', gameNumbers: 'Tìm số', gameAnimals: 'Tìm con vật',
      settingsTitle: 'Thiết kế thử thách', rows: 'Số hàng', cols: 'Số cột', targetCount: 'Số đáp án', directions: 'Hướng tìm',
      minLength: 'Kích thước nhóm tối thiểu', maxLength: 'Kích thước nhóm tối đa', imageStyle: 'Hình ảnh', color: 'Có màu', monochrome: 'Trắng đen', minimal: 'Tối giản',
      horizontal: 'Ngang', vertical: 'Dọc', diagonal: 'Chéo', reverse: 'Ngược', generate: 'Tạo Bảng Mới', print: 'In A4', printText: 'In',
      panelTitle: 'Tìm bạn nhỏ', targetsTitle: 'Các nhóm bạn', progress: 'Tiến độ', cancel: 'Bỏ chọn', complete: 'Tìm thấy hết rồi!',
      footer: 'Một chút tập trung, một niềm vui nhỏ.', perSequence: 'con vật / đáp án',
      errorSize: 'Số hàng và cột phải là số nguyên từ 5 đến 16.', errorCount: 'Số đáp án phải là số nguyên từ 6 đến 16.',
      errorLength: 'Kích thước nhóm tối thiểu và tối đa phải là số nguyên từ 2 đến 8.',
      errorLengthRange: 'Kích thước nhóm tối thiểu không được lớn hơn tối đa.',
      errorDirections: 'Chọn ít nhất một hướng ngang, dọc hoặc chéo.', errorPlacement: 'Chưa xếp đủ đáp án. Hãy tăng kích thước hoặc thử lại.',
      errorUnexpected: 'Chưa thể tạo bảng. Vui lòng thử lại.', ready: 'Bảng con vật đã sẵn sàng.', anchor: 'Đã chọn ô đầu, hãy chọn ô cuối.',
      invalid: 'Hãy chọn một đường thẳng theo hướng đã bật cho bảng này.', noMatch: 'Chưa khớp chuỗi con vật theo hướng đã bật. Thử lại nhé!', found: 'Đã tìm thấy một nhóm bạn!',
      alreadyFound: 'Nhóm bạn này đã được tìm thấy.', cleared: 'Đã bỏ chọn.', selected: 'Đang chọn: {animals}',
      cellLabel: 'Hàng {row}, cột {col}: {animal}', targetLabel: 'Nhóm {index}: {animals}', foundLabel: 'Đã tìm thấy. {animals}',
      description: 'Trò chơi tìm chuỗi con vật bằng hình ảnh cho trẻ chưa biết chữ. 22 mặt thú hoạt hình, đáp án ngẫu nhiên từ 2 đến 8 hình và in giấy A4.'
    },
    en: {
      title: 'Animal Maze - Picture Search', brand: 'animal maze', tagline: 'PLAY · LEARN · EXPLORE', language: 'Language',
      gamesMenu: 'Choose a game', gamesTitle: 'Games', gameWords: 'Word search', gameNumbers: 'Number search', gameAnimals: 'Animal search',
      settingsTitle: 'Design your challenge', rows: 'Rows', cols: 'Columns', targetCount: 'Sequences', directions: 'Directions',
      minLength: 'Minimum group size', maxLength: 'Maximum group size', imageStyle: 'Images', color: 'Color', monochrome: 'Black & white', minimal: 'Minimal',
      horizontal: 'Across', vertical: 'Down', diagonal: 'Diagonal', reverse: 'Reverse', generate: 'Create New Puzzle', print: 'Print A4', printText: 'Print',
      panelTitle: 'Find little friends', targetsTitle: 'Groups to find', progress: 'Progress', cancel: 'Clear selection', complete: 'You found them all!',
      footer: 'A little focus, a little joy.', perSequence: 'animals / sequence',
      errorSize: 'Rows and columns must be whole numbers from 5 to 16.', errorCount: 'The sequence count must be a whole number from 6 to 16.',
      errorLength: 'Minimum and maximum group sizes must be whole numbers from 2 to 8.',
      errorLengthRange: 'Minimum group size must not exceed the maximum.',
      errorDirections: 'Choose at least one direction: across, down or diagonal.', errorPlacement: 'Not every sequence could fit. Increase the grid size or try again.',
      errorUnexpected: 'Could not create the puzzle. Please try again.', ready: 'Your animal puzzle is ready.', anchor: 'First cell selected. Choose the last cell.',
      invalid: 'Choose a straight line in a direction enabled for this puzzle.', noMatch: 'That sequence does not match in an enabled direction. Try again!', found: 'You found a group of friends!',
      alreadyFound: 'You already found this group.', cleared: 'Selection cleared.', selected: 'Selecting: {animals}',
      cellLabel: 'Row {row}, column {col}: {animal}', targetLabel: 'Group {index}: {animals}', foundLabel: 'Found. {animals}',
      description: 'A picture search game for children who cannot read yet. Find random sequences of 2 to 8 cartoon animal faces, play offline and print on A4 paper.'
    }
  };
  let language = 'vi';
  let game = null;
  let cells = [];
  let targets = new Map();
  let selectionStart = null;
  let selectedPath = [];
  let pointerSession = null;
  let generating = false;
  let status = { key: 'ready', values: {} };
  let errorKey = null;

  function translate(key, values = {}) {
    return translations[language][key].replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
  }

  function sequenceNames(word) {
    return [...word].map((code) => animals.get(code)[language]).join(', ');
  }

  function imageSource(code) {
    const face = animals.get(code);
    const style = document.body.dataset.imageStyle;
    if (style === 'minimal') return face.minimalSrc;
    return style === 'monochrome' ? face.monochromeSrc : face.src;
  }

  function applyImageStyle(style) {
    document.body.dataset.imageStyle = style;
    for (const image of document.querySelectorAll('.animal, .brand-face')) image.src = imageSource(image.dataset.animal);
  }

  function imageFor(code) {
    const image = document.createElement('img');
    image.dataset.animal = code;
    image.src = imageSource(code);
    image.alt = '';
    image.className = 'animal';
    image.draggable = false;
    return image;
  }

  function applyLanguage(nextLanguage) {
    language = Object.hasOwn(translations, nextLanguage) ? nextLanguage : 'vi';
    document.documentElement.lang = language;
    document.title = translate('title');
    document.querySelector('meta[name="description"]').content = translate('description');
    for (const element of document.querySelectorAll('[data-i18n]')) element.textContent = translate(element.dataset.i18n);
    for (const element of document.querySelectorAll('[data-i18n-aria-label]')) element.setAttribute('aria-label', translate(element.dataset.i18nAriaLabel));
    for (const element of document.querySelectorAll('[data-i18n-title]')) element.title = translate(element.dataset.i18nTitle);
    const input = getElement('language').querySelector(`input[value="${language}"]`);
    input.checked = true;
    const option = input.closest('label');
    getElement('language-flag').src = option.querySelector('img').src;
    getElement('language-current').textContent = option.querySelector('span').textContent;
    getElement('language-current').lang = language;
    for (const link of document.querySelectorAll('.game-menu-link')) {
      const url = new URL(link.href);
      url.searchParams.set('lang', language);
      link.href = url.href;
    }
    if (errorKey) getElement('form-error').textContent = translate(errorKey);
    if (game) refreshPuzzleText();
    getElement('game-status').textContent = translate(status.key, status.values);
  }

  function initialLanguage() {
    const requested = new URL(location.href).searchParams.get('lang');
    if (Object.hasOwn(translations, requested)) return requested;
    try {
      const saved = localStorage.getItem(languageStorageKey);
      if (Object.hasOwn(translations, saved)) return saved;
    } catch {}
    return 'vi';
  }

  function showError(key, element) {
    errorKey = key;
    getElement('form-error').textContent = translate(key);
    getElement('form-error').hidden = false;
    if (element) {
      element.setAttribute('aria-invalid', 'true');
      if (getElement('settings').open) element.focus();
    }
  }

  function getDirections(modes) {
    const directions = [];
    if (modes.includes('horizontal')) directions.push([0, 1]);
    if (modes.includes('vertical')) directions.push([1, 0]);
    if (modes.includes('diagonal')) directions.push([1, 1], [1, -1]);
    if (modes.includes('reverse')) directions.push(...directions.map(([dr, dc]) => [-dr, -dc]));
    return directions;
  }

  function shuffle(values) {
    const shuffled = [...values];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
    }
    return shuffled;
  }

  function readSettings() {
    const rows = getElement('rows').valueAsNumber;
    const cols = getElement('cols').valueAsNumber;
    for (const [id, value] of [['rows', rows], ['cols', cols]]) {
      if (!Number.isInteger(value) || value < 5 || value > 16) { showError('errorSize', getElement(id)); return null; }
    }
    const count = getElement('target-count').valueAsNumber;
    if (!Number.isInteger(count) || count < 6 || count > 16) { showError('errorCount', getElement('target-count')); return null; }
    const minLength = getElement('min-length').valueAsNumber;
    const maxLength = getElement('max-length').valueAsNumber;
    for (const [id, value] of [['min-length', minLength], ['max-length', maxLength]]) {
      if (!Number.isInteger(value) || value < 2 || value > 8) { showError('errorLength', getElement(id)); return null; }
    }
    if (minLength > maxLength) { showError('errorLengthRange', getElement('min-length')); return null; }
    const modes = [...form.querySelectorAll('input[name="mode"]:checked')].map((input) => input.value);
    const directions = getDirections(modes);
    if (!directions.length) { showError('errorDirections', form.querySelector('input[name="mode"]')); return null; }
    const alphabet = shuffle(faces.map((face) => face.code)).slice(0, 8).join('');
    const lengthCount = maxLength - minLength + 1;
    const offset = Math.floor(Math.random() * lengthCount);
    const lengths = shuffle(Array.from({ length: count }, (_, index) => minLength + (index + offset) % lengthCount));
    return { rows, cols, modes, directions, alphabet, lengths, minLength, maxLength };
  }

  function canPlacePath(path, placements) {
    const occupied = new Set(path.map(([row, col]) => `${row},${col}`));
    return placements.every((placement) => {
      let overlap = 0;
      for (const [row, col] of placement.path) {
        if (occupied.has(`${row},${col}`) && ++overlap > 1) return false;
      }
      return true;
    });
  }

  function createPuzzle(settings) {
    const { rows, cols, directions, alphabet, lengths, minLength, maxLength } = settings;
    const board = Array.from({ length: rows }, () => Array.from({ length: cols }, () => alphabet[Math.floor(Math.random() * alphabet.length)]));
    const candidatesByLength = new Map();
    for (let length = minLength; length <= maxLength; length++) {
      const candidates = new Map();
      for (const [dr, dc] of directions) {
        for (let row = 0; row < rows; row++) {
          const endRow = row + dr * (length - 1);
          if (endRow < 0 || endRow >= rows) continue;
          for (let col = 0; col < cols; col++) {
            const endCol = col + dc * (length - 1);
            if (endCol < 0 || endCol >= cols) continue;
            const path = pathBetween([row, col], [endRow, endCol]);
            const word = path.map(([pathRow, pathCol]) => board[pathRow][pathCol]).join('');
            const key = [word, [...word].reverse().join('')].sort()[0];
            if (new Set(word).size <= 1) continue;
            if (!candidates.has(key)) candidates.set(key, { word, path, key, paths: [] });
            candidates.get(key).paths.push(path);
          }
        }
      }
      candidatesByLength.set(length, shuffle([...candidates.values()]));
    }
    const placements = [];
    const answerPaths = [];
    const used = new Set();
    for (const length of lengths) {
      const choices = [length, ...shuffle([...candidatesByLength.keys()].filter((value) => value !== length))];
      const candidate = choices.map((value) => candidatesByLength.get(value).find((entry) =>
        !used.has(entry.key) && entry.paths.every((path) => canPlacePath(path, answerPaths)))).find(Boolean);
      if (!candidate) return null;
      used.add(candidate.key);
      placements.push({ word: candidate.word, path: candidate.path });
      answerPaths.push(...candidate.paths.map((path) => ({ path })));
    }
    return { ...settings, words: placements.map((entry) => entry.word), board, placements, found: new Set() };
  }

  function setStatus(key, tone = '', values = {}) {
    status = { key, values };
    getElement('game-status').textContent = translate(key, values);
    getElement('feedback').className = `feedback ${tone}`;
    getElement('feedback-icon').toggleAttribute('hidden', !tone);
    getElement('feedback-icon').querySelector('use').setAttribute('href', tone === 'warning' ? '#icon-close' : '#icon-check');
  }

  function refreshPuzzleText() {
    for (let row = 0; row < game.rows; row++) {
      for (let col = 0; col < game.cols; col++) cells[row][col].setAttribute('aria-label', translate('cellLabel', { row: row + 1, col: col + 1, animal: animals.get(game.board[row][col])[language] }));
    }
    game.words.forEach((word, index) => targets.get(word).setAttribute('aria-label', translate(game.found.has(word) ? 'foundLabel' : 'targetLabel', { index: index + 1, animals: sequenceNames(word) })));
    getElement('puzzle-meta').textContent = `${game.rows} × ${game.cols}`;
    getElement('sequence-length-range').textContent = game.minLength === game.maxLength ? String(game.minLength) : `${game.minLength}–${game.maxLength}`;
    getElement('found-count').textContent = `${game.found.size} / ${game.words.length}`;
    getElement('game-progress').max = game.words.length;
    getElement('game-progress').value = game.found.size;
    getElement('completion').hidden = game.found.size !== game.words.length;
  }

  function resizeGrid() {
    if (!game) return;
    const available = getElement('board-scroll').clientWidth - 14;
    const size = Math.max(44, Math.min(76, Math.floor((available - (game.cols - 1) * 3) / game.cols)));
    gridElement.style.setProperty('--cell-size', `${size}px`);
  }

  function renderPuzzle() {
    clearSelection();
    gridElement.replaceChildren();
    getElement('target-list').replaceChildren();
    cells = [];
    targets = new Map();
    gridElement.style.setProperty('--cols', game.cols);
    gridElement.style.setProperty('--print-cell', `${Math.min(170 / game.cols, 170 / game.rows).toFixed(3)}mm`);
    getElement('target-list').style.setProperty('--print-target-columns', game.words.length > 8 ? 3 : 2);
    gridElement.setAttribute('aria-rowcount', game.rows);
    gridElement.setAttribute('aria-colcount', game.cols);
    for (let row = 0; row < game.rows; row++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'grid-row';
      rowElement.setAttribute('role', 'row');
      rowElement.setAttribute('aria-rowindex', row + 1);
      cells[row] = [];
      for (let col = 0; col < game.cols; col++) {
        const cell = document.createElement('button');
        cell.type = 'button'; cell.className = 'cell';
        cell.dataset.row = row; cell.dataset.col = col; cell.dataset.animal = game.board[row][col];
        cell.tabIndex = row === 0 && col === 0 ? 0 : -1;
        cell.setAttribute('role', 'gridcell'); cell.setAttribute('aria-colindex', col + 1); cell.setAttribute('aria-selected', 'false');
        cell.append(imageFor(game.board[row][col])); rowElement.append(cell); cells[row][col] = cell;
      }
      gridElement.append(rowElement);
    }
    for (const word of game.words) {
      const item = document.createElement('li');
      const target = document.createElement('button');
      target.type = 'button'; target.className = 'target'; target.dataset.sequence = word; target.setAttribute('aria-pressed', 'false');
      const sequence = document.createElement('span'); sequence.className = 'sequence'; sequence.setAttribute('aria-hidden', 'true');
      for (const code of word) sequence.append(imageFor(code));
      const check = document.createElement('span'); check.className = 'target-check'; check.setAttribute('aria-hidden', 'true');
      const icon = getElement('feedback-icon').cloneNode(true); icon.removeAttribute('id'); icon.removeAttribute('hidden'); icon.querySelector('use').setAttribute('href', '#icon-check'); check.append(icon);
      target.append(sequence, check); item.append(target); getElement('target-list').append(item); targets.set(word, target);
      target.addEventListener('click', () => {
        const active = target.getAttribute('aria-pressed') === 'true';
        for (const button of targets.values()) button.setAttribute('aria-pressed', 'false');
        target.setAttribute('aria-pressed', String(!active));
      });
    }
    getElement('puzzle-content').hidden = false;
    getElement('print-button').disabled = false;
    getElement('board-scroll').scrollLeft = 0;
    refreshPuzzleText(); resizeGrid(); setStatus('ready');
  }

  async function generate(event) {
    event?.preventDefault();
    if (generating) return;
    errorKey = null; getElement('form-error').hidden = true;
    form.querySelectorAll('[aria-invalid]').forEach((element) => element.removeAttribute('aria-invalid'));
    const settings = readSettings();
    if (!settings) return;
    clearSelection(); generating = true;
    const generateButton = getElement('generate-button');
    generateButton.disabled = true;
    form.setAttribute('aria-busy', 'true');
    try {
      await new Promise((resolve) => setTimeout(resolve, 35));
      const nextGame = createPuzzle(settings);
      if (!nextGame) { showError('errorPlacement'); return; }
      game = nextGame; renderPuzzle();
    } catch (error) { console.error('Animal puzzle generation failed:', error); showError('errorUnexpected'); }
    finally { generating = false; generateButton.disabled = false; form.removeAttribute('aria-busy'); }
  }

  function pathBetween(start, end, directions) {
    if (!start || !end) return [];
    const deltaRow = end[0] - start[0];
    const deltaCol = end[1] - start[1];
    if (deltaRow !== 0 && deltaCol !== 0 && Math.abs(deltaRow) !== Math.abs(deltaCol)) return [];
    if (directions && (deltaRow !== 0 || deltaCol !== 0) && !directions.some(([rowStep, colStep]) =>
      (rowStep === Math.sign(deltaRow) && colStep === Math.sign(deltaCol)) ||
      (rowStep === -Math.sign(deltaRow) && colStep === -Math.sign(deltaCol)))) return [];
    const length = Math.max(Math.abs(deltaRow), Math.abs(deltaCol)) + 1;
    return Array.from({ length }, (_, offset) => [start[0] + offset * Math.sign(deltaRow), start[1] + offset * Math.sign(deltaCol)]);
  }

  function removePreview() {
    for (const [row, col] of selectedPath) {
      cells[row]?.[col]?.classList.remove('is-selected', 'selection-start');
      cells[row]?.[col]?.setAttribute('aria-selected', 'false');
    }
  }

  function clearSelection() {
    removePreview(); selectedPath = []; selectionStart = null;
    const session = pointerSession; pointerSession = null;
    if (session && gridElement.hasPointerCapture(session.id)) gridElement.releasePointerCapture(session.id);
    getElement('selection-preview').replaceChildren(); getElement('cancel-selection').disabled = true;
  }

  function updateSelection(end) {
    removePreview();
    const path = pathBetween(selectionStart, end, game.directions);
    selectedPath = path.length ? path : [selectionStart];
    for (const [row, col] of selectedPath) { cells[row][col].classList.add('is-selected'); cells[row][col].setAttribute('aria-selected', 'true'); }
    cells[selectionStart[0]][selectionStart[1]].classList.add('selection-start');
    getElement('selection-preview').replaceChildren(...selectedPath.slice(0, 8).map(([row, col]) => imageFor(game.board[row][col])));
    getElement('cancel-selection').disabled = false;
    setStatus(path.length ? 'selected' : 'invalid', path.length ? '' : 'warning', { animals: sequenceNames(selectedPath.map(([row, col]) => game.board[row][col]).join('')) });
  }

  function finishSelection(end) {
    const path = pathBetween(selectionStart, end, game.directions);
    if (!path.length) { clearSelection(); setStatus('invalid', 'warning'); return; }
    const selected = path.map(([row, col]) => game.board[row][col]).join('');
    const reversed = [...selected].reverse().join('');
    const rowStep = Math.sign(end[0] - selectionStart[0]);
    const colStep = Math.sign(end[1] - selectionStart[1]);
    const forwardAllowed = path.length === 1 || game.directions.some(([dr, dc]) => dr === rowStep && dc === colStep);
    const backwardAllowed = path.length === 1 || game.directions.some(([dr, dc]) => dr === -rowStep && dc === -colStep);
    const matches = game.words.filter((word) =>
      (forwardAllowed && word === selected) || (backwardAllowed && word === reversed));
    const newMatches = matches.filter((word) => !game.found.has(word));
    clearSelection();
    if (!matches.length) { setStatus('noMatch', 'warning'); return; }
    if (!newMatches.length) { setStatus('alreadyFound'); return; }
    for (const word of newMatches) { game.found.add(word); targets.get(word).classList.add('found'); targets.get(word).setAttribute('aria-pressed', 'false'); }
    for (const [row, col] of path) cells[row][col].classList.add('is-found');
    refreshPuzzleText(); setStatus(game.found.size === game.words.length ? 'complete' : 'found', 'success');
  }

  function getPoint(element) {
    const cell = element instanceof Element ? element.closest('.cell') : null;
    return cell && gridElement.contains(cell) ? [Number(cell.dataset.row), Number(cell.dataset.col)] : null;
  }

  function focusCell(point, focus = true) {
    const previous = gridElement.querySelector('[tabindex="0"]');
    if (previous) previous.tabIndex = -1;
    const cell = cells[point[0]][point[1]]; cell.tabIndex = 0;
    if (focus) cell.focus({ preventScroll: true });
  }

  function choosePoint(point) {
    if (selectionStart) finishSelection(point);
    else { selectionStart = point; updateSelection(point); setStatus('anchor'); }
  }

  gridElement.addEventListener('pointerdown', (event) => {
    if (!game || generating || event.button !== 0 || !event.isPrimary || pointerSession) return;
    const point = getPoint(event.target); if (!point) return;
    event.preventDefault(); focusCell(point, event.pointerType === 'mouse');
    const hadAnchor = Boolean(selectionStart);
    if (!selectionStart) selectionStart = point;
    pointerSession = { id: event.pointerId, hadAnchor, origin: point, moved: false };
    updateSelection(point); gridElement.setPointerCapture(event.pointerId);
  });
  gridElement.addEventListener('pointermove', (event) => {
    if (!selectionStart || (pointerSession && pointerSession.id !== event.pointerId)) return;
    const point = getPoint(document.elementFromPoint(event.clientX, event.clientY)); if (!point) return;
    if (pointerSession && (point[0] !== pointerSession.origin[0] || point[1] !== pointerSession.origin[1])) pointerSession.moved = true;
    updateSelection(point);
  });
  gridElement.addEventListener('pointerup', (event) => {
    if (!pointerSession || pointerSession.id !== event.pointerId) return;
    const session = pointerSession;
    const point = getPoint(document.elementFromPoint(event.clientX, event.clientY));
    pointerSession = null;
    if (gridElement.hasPointerCapture(event.pointerId)) gridElement.releasePointerCapture(event.pointerId);
    if (!point) { clearSelection(); return; }
    if (session.moved || session.hadAnchor) finishSelection(point); else setStatus('anchor');
  });
  gridElement.addEventListener('pointercancel', clearSelection);
  gridElement.addEventListener('lostpointercapture', () => { if (pointerSession) clearSelection(); });
  gridElement.addEventListener('dragstart', (event) => event.preventDefault());
  gridElement.addEventListener('click', (event) => {
    if (event.detail !== 0 || !game || generating) return;
    const point = getPoint(event.target); if (point) choosePoint(point);
  });
  gridElement.addEventListener('keydown', (event) => {
    const point = getPoint(event.target); if (!point || !game || generating) return;
    let [row, col] = point;
    switch (event.key) {
      case 'ArrowUp': row = Math.max(0, row - 1); break;
      case 'ArrowDown': row = Math.min(game.rows - 1, row + 1); break;
      case 'ArrowLeft': col = Math.max(0, col - 1); break;
      case 'ArrowRight': col = Math.min(game.cols - 1, col + 1); break;
      case 'Home': col = 0; if (event.ctrlKey) row = 0; break;
      case 'End': col = game.cols - 1; if (event.ctrlKey) row = game.rows - 1; break;
      case 'Enter': case ' ': event.preventDefault(); choosePoint(point); return;
      case 'Escape': event.preventDefault(); clearSelection(); setStatus('cleared'); return;
      default: return;
    }
    event.preventDefault(); focusCell([row, col]); cells[row][col].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (selectionStart) updateSelection([row, col]);
  });
  getElement('cancel-selection').addEventListener('click', () => { clearSelection(); setStatus('cleared'); });
  document.addEventListener('pointerdown', (event) => {
    if (!getElement('language-picker').contains(event.target)) getElement('language-picker').open = false;
    if (selectionStart && !gridElement.contains(event.target) && !getElement('language-picker').contains(event.target)) clearSelection();
  });
  document.addEventListener('focusin', (event) => { if (!getElement('language-picker').contains(event.target)) getElement('language-picker').open = false; });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (getElement('language-picker').open) { getElement('language-picker').open = false; getElement('language-toggle').focus(); }
    else if (selectionStart) { clearSelection(); setStatus('cleared'); }
  });
  window.addEventListener('blur', clearSelection);
  getElement('language').addEventListener('change', (event) => {
    if (event.target.name !== 'language' || !event.target.checked) return;
    applyLanguage(event.target.value); getElement('language-picker').open = false; getElement('language-toggle').focus({ preventScroll: true });
    try { localStorage.setItem(languageStorageKey, language); } catch {}
    const url = new URL(location.href); url.searchParams.set('lang', language);
    try { history.replaceState(null, '', url); } catch {}
  });
  const settingsPanel = getElement('settings');
  try {
    const savedOpen = localStorage.getItem(settingsStorageKey);
    if (savedOpen !== null) settingsPanel.open = savedOpen === 'true';
  } catch {}
  settingsPanel.addEventListener('toggle', () => {
    try { localStorage.setItem(settingsStorageKey, String(settingsPanel.open)); } catch {}
  });
  form.addEventListener('submit', generate);
  form.addEventListener('change', (event) => {
    if (event.target.name === 'image-style' && event.target.checked) applyImageStyle(event.target.value);
  });
  form.addEventListener('input', (event) => event.target.removeAttribute('aria-invalid'));
  getElement('print-button').addEventListener('click', () => { if (game) window.print(); });
  getElement('brand-face').dataset.animal = faces[0].code;
  applyImageStyle(form.querySelector('input[name="image-style"]:checked').value);
  applyLanguage(initialLanguage());
  if ('ResizeObserver' in window) new ResizeObserver(resizeGrid).observe(getElement('board-scroll'));
  else window.addEventListener('resize', resizeGrid);
  generate();
})();
