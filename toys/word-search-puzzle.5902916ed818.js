(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const form = $('settings-form');
  const gridElement = $('letter-grid');
  const translations = {
    vi: {
      title: 'Mê cung chữ — Trò chơi tìm chữ',
      description: 'Tự tạo trò chơi tìm chữ, đánh dấu từ trực tiếp và in ra giấy A4. Hoạt động hoàn toàn ngoại tuyến.',
      appName: 'Mê cung chữ',
      language: 'Ngôn ngữ',
      gamesMenu: 'Chọn trò chơi',
      gamesTitle: 'Trò chơi',
      gameWords: 'Tìm chữ',
      gameNumbers: 'Tìm số',
      gameAnimals: 'Tìm con vật',
      brand: 'mê cung chữ',
      tagline: 'CHƠI · HỌC · KHÁM PHÁ',
      eyebrow: 'GÓC NHỎ CHO TRÍ TÒ MÒ',
      headlineFirst: 'Ẩn những con chữ.',
      headlineSecond: 'Mở những niềm vui.',
      settingsLabel: 'Thiết lập trò chơi',
      settingsTitle: 'Thiết kế thử thách',
      boardSize: 'Kích thước bảng',
      rows: 'Số hàng (M)',
      cols: 'Số cột (N)',
      sizeHint: 'Từ 1–30 hàng / cột. Bảng lớn, nhiều chỗ ẩn hơn.',
      wordsLabel: 'Những từ cần tìm',
      wordCount: '{count} từ',
      wordsHint: 'Ngăn cách bằng dấu phẩy, khoảng trắng hoặc xuống dòng. Tối đa 40 từ, chỉ dùng chữ A–Z; từ trùng sẽ được gộp.',
      directionsLabel: 'Hướng giấu chữ',
      horizontal: 'Ngang',
      vertical: 'Dọc',
      diagonal: 'Chéo',
      reverse: 'Ngược',
      modesHint: 'Chọn một hoặc nhiều hướng. “Ngược” bổ sung chiều đảo lại cho các hướng đã chọn.',
      generate: 'Tạo ô chữ',
      generating: 'Đang giấu những con chữ…',
      privacy: 'Miễn phí · Không tài khoản · Dùng được ngoại tuyến',
      tipTitle: 'Mẹo nhỏ:',
      tip: 'Chọn các từ cùng chủ đề như trái cây, động vật hoặc gia đình để việc học thú vị hơn.',
      panelTitle: 'Bảng tìm chữ',
      stateEmpty: 'CHƯA BẮT ĐẦU',
      statePlaying: 'ĐANG KHÁM PHÁ',
      stateComplete: 'HOÀN THÀNH',
      print: 'In A4',
      printLabel: 'In bảng tìm chữ ra giấy A4',
      emptyTitle: 'Mỗi ô chữ, một khám phá.',
      emptyFirst: 'Chọn kích thước và những từ bạn thích.',
      emptySecond: 'Một mê cung chữ đang chờ được tạo ra!',
      emptyGenerate: 'Tạo ô chữ đầu tiên',
      paperTitle: 'MÊ CUNG CHỮ',
      paperInstructions: 'Tìm và khoanh tròn các từ được giấu trong bảng.',
      paperName: 'Họ tên: ..........................................',
      wordBankTitle: 'NHỮNG TỪ ĐANG ẨN MÌNH',
      progressLabel: 'Tiến độ tìm từ',
      keyboardTitle: 'Cách chơi & phím tắt',
      keyboardInstructions: 'Từ nằm trên một đường thẳng, không gấp khúc. Kéo chuột hoặc chạm ô đầu rồi ô cuối; có thể chọn từ theo cả hai chiều. Với bàn phím: Tab vào bảng, dùng phím mũi tên để di chuyển, Enter hoặc Space để chọn đầu và cuối, Esc để bỏ chọn. Bảng rộng có thể cuộn ngang. Bản in không hiển thị đáp án đã đánh dấu.',
      printFooter: 'Một chút tập trung, một niềm vui nhỏ. · Mê cung chữ',
      footerFirst: 'Được tạo cho những phút giây vừa chơi, vừa học.',
      footerSecond: 'Chậm lại một chút. Tìm thêm một từ.',
      errorSize: 'Số hàng và số cột phải là số nguyên từ 1 đến 30.',
      errorEmpty: 'Hãy nhập ít nhất một từ để bắt đầu.',
      errorLetters: 'Chỉ dùng chữ A–Z, không dấu và không chữ số. Vui lòng sửa: {words}.',
      errorCount: 'Mỗi bảng hỗ trợ tối đa 40 từ khác nhau để dễ chơi và in trên một trang A4.',
      errorDirections: 'Chọn ít nhất một hướng: Ngang, Dọc hoặc Chéo. “Ngược” cần đi cùng một trong các hướng này.',
      errorLength: 'Từ không vừa bảng theo hướng đã chọn: {words}. Hãy tăng kích thước hoặc đổi hướng.',
      errorCapacity: 'Bảng quá nhỏ để chứa các chữ cái của tất cả các từ. Hãy tăng kích thước hoặc bớt từ.',
      errorPlacement: 'Chưa thể xếp đủ tất cả các từ vào bảng này. Hãy tăng kích thước, bật thêm hướng, bớt từ hoặc thử tạo lại. Bảng cũ (nếu có) vẫn được giữ nguyên.',
      errorUnexpected: 'Có lỗi khi tạo bảng chữ. Vui lòng thử lại.',
      gridLabel: 'Bảng tìm chữ {rows} hàng, {cols} cột',
      cellLabel: 'Hàng {row}, cột {col}: {letter}',
      dimensions: '{rows} × {cols} ô chữ · {words}',
      foundCount: ' / {total} từ đã tìm thấy',
      foundLabel: '{word}: đã tìm thấy',
      selectionDefault: 'Kéo từ ô đầu đến ô cuối, hoặc chạm lần lượt hai ô.',
      selectionPreview: '{letters} · Chọn ô cuối để đánh dấu',
      selectionInvalid: 'Hãy chọn một đường thẳng theo hướng đã bật cho bảng này.',
      statusInitial: 'Mọi cuộc khám phá đều bắt đầu từ một con chữ.',
      statusReady: 'Bảng chữ đã sẵn sàng. Bạn sẽ tìm thấy từ nào đầu tiên?',
      statusDirection: 'Chưa đúng hướng. Hãy chọn một đường thẳng theo hướng đã bật cho bảng này.',
      statusNoMatch: '“{letters}” chưa khớp từ nào theo hướng đã bật. Thử một đường khác nhé!',
      statusAlreadyFound: 'Bạn đã tìm thấy {words} rồi. Tìm tiếp những từ còn lại nhé!',
      statusComplete: 'Tuyệt vời! Bạn đã tìm đủ {total} từ. Tạo một bảng mới để khám phá tiếp nhé!',
      statusFound: 'Đã tìm thấy {words}. Còn {remaining} từ nữa!',
      statusAnchor: 'Đã chọn ô đầu. Chọn ô cuối của từ; nhấn Esc để bỏ chọn.',
      statusTouchAnchor: 'Đã chọn ô đầu. Chạm ô cuối của từ để đánh dấu.',
      statusCleared: 'Đã bỏ chọn. Hãy thử tìm một từ mới.'
    },
    en: {
      title: 'Word Maze - Free Printable Word Search Puzzle',
      description: 'Create a free word search puzzle, find and mark words on screen, and print on A4 paper. Works completely offline, with English and Vietnamese interfaces.',
      appName: 'Word Maze',
      language: 'Language',
      gamesMenu: 'Choose a game',
      gamesTitle: 'Games',
      gameWords: 'Word search',
      gameNumbers: 'Number search',
      gameAnimals: 'Animal search',
      brand: 'word maze',
      tagline: 'PLAY · LEARN · EXPLORE',
      eyebrow: 'A LITTLE SPACE FOR CURIOSITY',
      headlineFirst: 'Hide the letters.',
      headlineSecond: 'Find the fun.',
      settingsLabel: 'Game settings',
      settingsTitle: 'Design your challenge',
      boardSize: 'Grid size',
      rows: 'Rows (M)',
      cols: 'Columns (N)',
      sizeHint: '1-30 rows / columns. A bigger grid means more hiding places.',
      wordsLabel: 'Words to find',
      wordCount: '{count} words',
      wordCountOne: '{count} word',
      wordsHint: 'Separate with commas, spaces or new lines. Up to 40 words, A-Z only; duplicates are merged.',
      directionsLabel: 'Word directions',
      horizontal: 'Across',
      vertical: 'Down',
      diagonal: 'Diagonal',
      reverse: 'Reverse',
      modesHint: 'Choose one or more directions. "Reverse" also allows words to run backward in the selected directions.',
      generate: 'Create puzzle',
      generating: 'Hiding the letters...',
      privacy: 'Free · No account · Works offline',
      tipTitle: 'Quick tip:',
      tip: 'Choose words from a shared theme, such as fruit, animals or family, to make learning more fun.',
      panelTitle: 'Word search',
      stateEmpty: 'NOT STARTED',
      statePlaying: 'EXPLORING',
      stateComplete: 'COMPLETE',
      print: 'Print A4',
      printLabel: 'Print the word search on A4 paper',
      emptyTitle: 'A discovery in every puzzle.',
      emptyFirst: 'Choose a grid size and your favorite words.',
      emptySecond: 'Your next word maze is waiting!',
      emptyGenerate: 'Create your first puzzle',
      paperTitle: 'WORD MAZE',
      paperInstructions: 'Find and circle the words hidden in the grid.',
      paperName: 'Name: ..........................................',
      wordBankTitle: 'THE HIDDEN WORDS',
      progressLabel: 'Word search progress',
      keyboardTitle: 'How to play & keyboard controls',
      keyboardInstructions: 'Words follow a straight line without turns. Drag or tap the first and last cells; you can select in either direction. Keyboard: Tab into the grid, use arrow keys to move, Enter or Space to select the first and last cells, and Esc to cancel. Wide grids can scroll horizontally. Found words are not marked on the printout.',
      printFooter: 'A little focus, a little joy. · Word Maze',
      footerFirst: 'Made for moments of play and learning.',
      footerSecond: 'Slow down a little. Find one more word.',
      errorSize: 'Rows and columns must be whole numbers from 1 to 30.',
      errorEmpty: 'Enter at least one word to get started.',
      errorLetters: 'Use only letters A-Z, without accents or numbers. Please fix: {words}.',
      errorCount: 'Each puzzle supports up to 40 unique words to keep it playable and printable on one A4 page.',
      errorDirections: 'Choose at least one direction: Across, Down or Diagonal. "Reverse" must be combined with one of these.',
      errorLength: 'These words do not fit in the selected directions: {words}. Increase the grid size or change directions.',
      errorCapacity: 'The grid is too small for all the letters in your words. Increase the grid size or remove some words.',
      errorPlacement: 'Could not fit every word in this grid. Increase the size, enable more directions, remove some words or try again. Your previous puzzle, if any, is unchanged.',
      errorUnexpected: 'Something went wrong while creating the puzzle. Please try again.',
      gridLabel: 'Word search with {rows} rows and {cols} columns',
      cellLabel: 'Row {row}, column {col}: {letter}',
      dimensions: '{rows} × {cols} grid · {words}',
      foundCount: ' / {total} found',
      foundLabel: '{word}: found',
      selectionDefault: 'Drag from the first to the last cell, or tap the two cells in turn.',
      selectionPreview: '{letters} · Select the last cell to mark the word',
      selectionInvalid: 'Choose a straight line in a direction enabled for this puzzle.',
      statusInitial: 'Every discovery begins with a letter.',
      statusReady: 'Your puzzle is ready. Which word will you find first?',
      statusDirection: 'Choose a straight line in a direction enabled for this puzzle.',
      statusNoMatch: '"{letters}" does not match a word in an enabled direction. Try another line!',
      statusAlreadyFound: 'You already found {words}. Keep looking for the remaining words!',
      statusComplete: 'You found every word! Create another puzzle to keep exploring.',
      statusFound: 'Found {words}. {remaining} left!',
      statusAnchor: 'First cell selected. Choose the last cell of the word; press Esc to cancel.',
      statusTouchAnchor: 'First cell selected. Tap the last cell to mark the word.',
      statusCleared: 'Selection cleared. Try finding another word.'
    }
  };
  const pageUrl = 'https://lethanhdat.com/toys/word-search-puzzle.html';
  const languageStorageKey = 'word-search-language';
  let language = 'vi';
  function translate(key, values = {}) {
    const singular = values.count === 1 && translations[language][`${key}One`];
    return (singular || translations[language][key]).replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
  }

  function applyLanguage(nextLanguage) {
    language = Object.hasOwn(translations, nextLanguage) ? nextLanguage : 'vi';
    document.documentElement.lang = language;
    const languageInput = $('language').querySelector(`input[value="${language}"]`);
    languageInput.checked = true;
    const languageOption = languageInput.closest('.language-option');
    $('language-flag').src = languageOption.querySelector('img').src;
    $('language-current').textContent = languageOption.querySelector('span').textContent;
    $('language-current').lang = language;
    $('language-label').textContent = translate('language');
    document.title = translate('title');
    const localizedUrl = `${pageUrl}?lang=${language}`;
    document.querySelector('link[rel="canonical"]').href = localizedUrl;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector).content = translate('description');
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector).content = translate('title');
    }
    document.querySelector('meta[property="og:url"]').content = localizedUrl;
    document.querySelector('meta[property="og:locale"]').content = language === 'vi' ? 'vi_VN' : 'en_US';
    document.querySelector('meta[property="og:locale:alternate"]').content = language === 'vi' ? 'en_US' : 'vi_VN';
    const structuredData = JSON.parse($('structured-data').textContent);
    Object.assign(structuredData, { name: translate('appName'), description: translate('description'), url: localizedUrl });
    $('structured-data').textContent = JSON.stringify(structuredData);
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      element.setAttribute('aria-label', translate(element.dataset.i18nAriaLabel));
    });
    $('input-word-count').textContent = translate('wordCount', { count: parseWords($('words').value).words.length });
    $('generate-label').textContent = translate(generating ? 'generating' : 'generate');
    if (formError) $('form-error').textContent = translate(formError.key, formError.values);
    setStatus(statusMessage.key, statusMessage.tone, statusMessage.values);
    setSelectionHint(selectionMessage.key, selectionMessage.values);
    if (game) {
      refreshPuzzleText();
      resizeGrid();
    } else {
      $('state-badge').textContent = translate('stateEmpty');
    }
  }

  function initialLanguage() {
    const requested = new URL(window.location.href).searchParams.get('lang');
    if (Object.hasOwn(translations, requested)) return requested;
    try {
      const saved = localStorage.getItem(languageStorageKey);
      if (Object.hasOwn(translations, saved)) return saved;
    } catch {}
    return 'vi';
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let statusMessage = { key: 'statusInitial', tone: '', values: {} };
  let selectionMessage = { key: 'selectionDefault', values: {} };
  let formError = null;
  let game = null;
  let cells = [];
  let chips = new Map();
  let selectionStart = null;
  let selectedPath = [];
  let pointerSession = null;
  let generating = false;

  // Treat quotes/brackets as list syntax, not as letters in a word.
  function parseWords(text) {
    const tokens = text.replace(/["'“”‘’\[\]]/g, '').split(/[\s,;]+/u).filter(Boolean);
    const invalid = tokens.filter((word) => !/^[a-z]+$/i.test(word));
    const words = [...new Set(tokens.map((word) => word.toUpperCase()))];
    return { words, invalid };
  }

  function getDirections(modes) {
    const directions = [];
    if (modes.includes('horizontal')) directions.push([0, 1]);
    if (modes.includes('vertical')) directions.push([1, 0]);
    if (modes.includes('diagonal')) directions.push([1, 1], [1, -1]);
    if (modes.includes('reverse')) directions.push(...directions.map(([dr, dc]) => [-dr, -dc]));
    return directions;
  }

  function showFormError(key, element, values = {}) {
    formError = { key, values };
    $('form-error').textContent = translate(key, values);
    $('form-error').hidden = false;
    if (element) {
      element.setAttribute('aria-invalid', 'true');
      element.focus();
    }
  }

  function readSettings() {
    const rows = $('rows').valueAsNumber;
    const cols = $('cols').valueAsNumber;
    for (const [id, value] of [['rows', rows], ['cols', cols]]) {
      if (!Number.isInteger(value) || value < 1 || value > 30) {
        showFormError('errorSize', $(id));
        return null;
      }
    }
    const { words, invalid } = parseWords($('words').value);
    if (!words.length) {
      showFormError('errorEmpty', $('words'));
      return null;
    }
    if (invalid.length) {
      const examples = invalid.slice(0, 3).map((word) => word.slice(0, 35)).join(', ');
      showFormError('errorLetters', $('words'), { words: examples });
      return null;
    }
    if (words.length > 40) {
      showFormError('errorCount', $('words'));
      return null;
    }
    const modes = [...form.querySelectorAll('input[name="mode"]:checked')].map((input) => input.value);
    const directions = getDirections(modes);
    if (!directions.length) {
      showFormError('errorDirections', form.querySelector('input[name="mode"]'));
      return null;
    }
    const tooLong = words.filter((word) => !directions.some(([dr, dc]) =>
      (dr === 0 || word.length <= rows) && (dc === 0 || word.length <= cols)));
    if (tooLong.length) {
      showFormError('errorLength', $('words'), { words: tooLong.slice(0, 4).map((word) => word.slice(0, 32)).join(', ') });
      return null;
    }
    if (new Set(words.join('')).size > rows * cols) {
      showFormError('errorCapacity');
      return null;
    }
    return { rows, cols, words, modes, directions };
  }

  function createPuzzle(settings) {
    const { rows, cols, words, directions } = settings;
    const board = Array.from({ length: rows }, () => Array(cols).fill(''));
    const deadline = performance.now() + 1800;
    const timedOut = Symbol('search-budget');
    let checks = 0;
    let visits = 0;
    const ordered = words.map((word) => ({ word, tie: Math.random() }))
      .sort((first, second) => second.word.length - first.word.length || first.tie - second.tie);
    const placements = [];

    function solve(index) {
      if (index === ordered.length) return true;
      if (++visits > 18000 || performance.now() > deadline) throw timedOut;
      const word = ordered[index].word;
      const candidates = [];
      for (const [dr, dc] of directions) {
        for (let row = 0; row < rows; row++) {
          const endRow = row + dr * (word.length - 1);
          if (endRow < 0 || endRow >= rows) continue;
          for (let col = 0; col < cols; col++) {
            if ((++checks & 255) === 0 && performance.now() > deadline) throw timedOut;
            const endCol = col + dc * (word.length - 1);
            if (endCol < 0 || endCol >= cols) continue;
            let overlap = 0;
            let compatible = true;
            for (let offset = 0; offset < word.length; offset++) {
              const letter = board[row + offset * dr][col + offset * dc];
              if (letter && letter !== word[offset]) { compatible = false; break; }
              if (letter) overlap++;
            }
            if (compatible) candidates.push({ row, col, dr, dc, score: overlap + Math.random() * 3 });
          }
        }
      }
      candidates.sort((first, second) => second.score - first.score);
      for (const candidate of candidates) {
        const changed = [];
        const path = [];
        for (let offset = 0; offset < word.length; offset++) {
          const row = candidate.row + offset * candidate.dr;
          const col = candidate.col + offset * candidate.dc;
          path.push([row, col]);
          if (!board[row][col]) {
            changed.push([row, col]);
            board[row][col] = word[offset];
          }
        }
        placements.push({ word, path });
        if (solve(index + 1)) return true;
        placements.pop();
        for (const [row, col] of changed) board[row][col] = '';
      }
      return false;
    }

    try {
      if (!solve(0)) return null;
    } catch (error) {
      if (error === timedOut) return null;
      throw error;
    }
    for (const row of board) {
      for (let col = 0; col < cols; col++) {
        if (!row[col]) row[col] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
    return { ...settings, board, placements, found: new Set() };
  }

  function resizeGrid() {
    if (!game) return;
    const available = $('board-scroll').clientWidth - 6;
    const gap = game.cols > 20 ? 2 : 3;
    // Keep large grids usable: small screens can scroll instead of shrinking targets indefinitely.
    const size = Math.max(26, Math.min(42, Math.floor((available - (game.cols - 1) * gap) / game.cols)));
    gridElement.style.setProperty('--cell-size', `${size}px`);
    gridElement.style.setProperty('--grid-gap', `${gap}px`);
  }

  function setStatus(key, tone = '', values = {}) {
    statusMessage = { key, tone, values };
    $('game-status').textContent = translate(key, values);
    $('game-status').className = tone;
  }

  function setSelectionHint(key, values = {}) {
    selectionMessage = { key, values };
    $('selection-text').textContent = translate(key, values);
  }

  function updateProgress() {
    const count = game.found.size;
    const total = game.words.length;
    $('found-count').replaceChildren();
    const strong = document.createElement('strong');
    strong.textContent = count;
    $('found-count').append(strong, translate('foundCount', { total }));
    $('game-progress').max = total;
    $('game-progress').value = count;
    $('progress-percent').textContent = `${Math.round(count / total * 100)}%`;
    $('state-badge').textContent = translate(count === total ? 'stateComplete' : 'statePlaying');
  }

  function refreshPuzzleText() {
    gridElement.setAttribute('aria-label', translate('gridLabel', { rows: game.rows, cols: game.cols }));
    for (let row = 0; row < game.rows; row++) {
      for (let col = 0; col < game.cols; col++) {
        cells[row][col].setAttribute('aria-label', translate('cellLabel', { row: row + 1, col: col + 1, letter: game.board[row][col] }));
      }
    }
    for (const word of game.found) chips.get(word).setAttribute('aria-label', translate('foundLabel', { word }));
    $('puzzle-meta').replaceChildren();
    const dimensions = document.createElement('span');
    dimensions.textContent = translate('dimensions', { rows: game.rows, cols: game.cols, words: translate('wordCount', { count: game.words.length }) });
    $('puzzle-meta').append(dimensions);
    for (const mode of game.modes) {
      const tag = document.createElement('span');
      tag.className = 'meta-tag';
      tag.textContent = translate(mode);
      $('puzzle-meta').append(tag);
    }
    updateProgress();
  }

  function renderPuzzle() {
    clearSelection();
    gridElement.replaceChildren();
    $('word-list').replaceChildren();
    cells = [];
    chips = new Map();
    gridElement.style.setProperty('--cols', game.cols);
    // Reserve room on A4 for the 1 cm inset, larger type and up to ten rows of words.
    const printExtent = Math.min(160, 190 - Math.ceil(game.words.length / 4) * 5);
    const printCell = Math.min(9, printExtent / Math.max(game.rows, game.cols));
    gridElement.style.setProperty('--print-cell', `${printCell.toFixed(3)}mm`);
    gridElement.style.setProperty('--print-font', `${Math.min(16, printCell * 1.7).toFixed(2)}pt`);
    gridElement.setAttribute('aria-rowcount', game.rows);
    gridElement.setAttribute('aria-colcount', game.cols);

    const fragment = document.createDocumentFragment();
    for (let row = 0; row < game.rows; row++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'grid-row';
      rowElement.setAttribute('role', 'row');
      rowElement.setAttribute('aria-rowindex', row + 1);
      cells[row] = [];
      for (let col = 0; col < game.cols; col++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cell';
        cell.textContent = game.board[row][col];
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.tabIndex = row === 0 && col === 0 ? 0 : -1;
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('aria-colindex', col + 1);
        cell.setAttribute('aria-selected', 'false');
        rowElement.append(cell);
        cells[row][col] = cell;
      }
      fragment.append(rowElement);
    }
    gridElement.append(fragment);
    for (const word of game.words) {
      const chip = document.createElement('li');
      chip.className = 'word-chip';
      const preferredPrintFont = word.length > 23 ? 6.5 : word.length > 17 ? 8 : 9;
      // Four print columns leave 37.5 mm for each word after its checkbox and gap.
      const fittingPrintFont = (37.5 * 72 / 25.4) / (word.length * 0.6);
      chip.style.setProperty('--print-word-font', `${Math.min(preferredPrintFont, fittingPrintFont).toFixed(2)}pt`);
      const check = document.createElement('span');
      check.className = 'word-check';
      check.setAttribute('aria-hidden', 'true');
      const text = document.createElement('span');
      text.className = 'word-text';
      text.textContent = word;
      chip.append(check, text);
      chips.set(word, chip);
      $('word-list').append(chip);
    }
    $('empty-state').hidden = true;
    $('puzzle-content').hidden = false;
    $('print-button').disabled = false;
    $('state-badge').classList.add('active');
    $('board-scroll').scrollLeft = 0;
    setStatus('statusReady');
    refreshPuzzleText();
    resizeGrid();
  }

  async function generate(event) {
    event.preventDefault();
    if (generating) return;
    $('form-error').hidden = true;
    formError = null;
    form.querySelectorAll('[aria-invalid]').forEach((element) => element.removeAttribute('aria-invalid'));
    const settings = readSettings();
    if (!settings) return;
    generating = true;
    $('generate-button').disabled = true;
    $('empty-generate').disabled = true;
    $('generate-label').textContent = translate('generating');
    form.setAttribute('aria-busy', 'true');
    try {
      // Give the browser a paint before the bounded search begins.
      await new Promise((resolve) => setTimeout(resolve, 35));
      const nextGame = createPuzzle(settings);
      if (!nextGame) {
        showFormError('errorPlacement');
        return;
      }
      game = nextGame;
      renderPuzzle();
      if (window.matchMedia('(max-width: 760px)').matches) {
        $('panel-title').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Puzzle generation failed:', error);
      showFormError('errorUnexpected');
    } finally {
      generating = false;
      $('generate-button').disabled = false;
      $('empty-generate').disabled = false;
      $('generate-label').textContent = translate('generate');
      form.removeAttribute('aria-busy');
    }
  }

  function getPoint(element) {
    const cell = element instanceof Element ? element.closest('.cell') : null;
    return cell && gridElement.contains(cell) ? [Number(cell.dataset.row), Number(cell.dataset.col)] : null;
  }

  function pathBetween(start, end) {
    if (!start || !end) return [];
    const deltaRow = end[0] - start[0];
    const deltaCol = end[1] - start[1];
    if (deltaRow !== 0 && deltaCol !== 0 && Math.abs(deltaRow) !== Math.abs(deltaCol)) return [];
    if ((deltaRow !== 0 || deltaCol !== 0) && !game.directions.some(([rowStep, colStep]) =>
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

  function updateSelection(end) {
    removePreview();
    const path = pathBetween(selectionStart, end);
    selectedPath = path.length ? path : [selectionStart];
    for (const [row, col] of selectedPath) {
      cells[row][col].classList.add('is-selected');
      cells[row][col].setAttribute('aria-selected', 'true');
    }
    cells[selectionStart[0]][selectionStart[1]].classList.add('selection-start');
    setSelectionHint(path.length ? 'selectionPreview' : 'selectionInvalid', { letters: path.map(([row, col]) => game.board[row][col]).join('') });
  }

  function clearSelection() {
    removePreview();
    selectedPath = [];
    selectionStart = null;
    const session = pointerSession;
    pointerSession = null;
    if (session && gridElement.hasPointerCapture(session.id)) gridElement.releasePointerCapture(session.id);
    setSelectionHint('selectionDefault');
  }

  function finishSelection(end) {
    const path = pathBetween(selectionStart, end);
    if (!path.length) {
      clearSelection();
      setStatus('statusDirection', 'warning');
      return;
    }
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
    if (!matches.length) {
      setStatus('statusNoMatch', 'warning', { letters: selected });
      return;
    }
    if (!newMatches.length) {
      setStatus('statusAlreadyFound', '', { words: matches.join(', ') });
      return;
    }
    for (const word of newMatches) {
      game.found.add(word);
      chips.get(word).classList.add('found');
      chips.get(word).setAttribute('aria-label', translate('foundLabel', { word }));
    }
    for (const [row, col] of path) cells[row][col].classList.add('is-found');
    updateProgress();
    setStatus(game.found.size === game.words.length ? 'statusComplete' : 'statusFound', 'success', {
      total: game.words.length, words: newMatches.join(', '), remaining: game.words.length - game.found.size
    });
  }

  function focusCell(point, focus = true) {
    const previous = gridElement.querySelector('[tabindex="0"]');
    if (previous) previous.tabIndex = -1;
    const cell = cells[point[0]][point[1]];
    cell.tabIndex = 0;
    if (focus) cell.focus({ preventScroll: true });
  }

  function choosePoint(point) {
    if (selectionStart) {
      finishSelection(point);
    } else {
      selectionStart = point;
      updateSelection(point);
      if (game.words.includes(game.board[point[0]][point[1]])) finishSelection(point);
      else setStatus('statusAnchor');
    }
  }

  gridElement.addEventListener('pointerdown', (event) => {
    if (!game || generating || event.button !== 0 || !event.isPrimary || pointerSession) return;
    const point = getPoint(event.target);
    if (!point) return;
    event.preventDefault();
    focusCell(point, event.pointerType === 'mouse');
    const hadAnchor = Boolean(selectionStart);
    if (!selectionStart) selectionStart = point;
    pointerSession = { id: event.pointerId, hadAnchor, origin: point, moved: false };
    updateSelection(point);
    gridElement.setPointerCapture(event.pointerId);
  });

  gridElement.addEventListener('pointermove', (event) => {
    if (!selectionStart || (pointerSession && pointerSession.id !== event.pointerId)) return;
    const point = getPoint(document.elementFromPoint(event.clientX, event.clientY));
    if (!point) return;
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
    if (session.moved || session.hadAnchor || game.words.includes(game.board[point[0]][point[1]])) finishSelection(point);
    else setStatus('statusTouchAnchor');
  });

  gridElement.addEventListener('pointercancel', clearSelection);
  gridElement.addEventListener('lostpointercapture', () => { if (pointerSession) clearSelection(); });
  gridElement.addEventListener('dragstart', (event) => event.preventDefault());
  // A screen reader can activate a cell without a physical pointer event.
  gridElement.addEventListener('click', (event) => {
    if (event.detail !== 0 || !game || generating) return;
    const point = getPoint(event.target);
    if (point) choosePoint(point);
  });

  gridElement.addEventListener('keydown', (event) => {
    const point = getPoint(event.target);
    if (!point || !game || generating) return;
    let [row, col] = point;
    switch (event.key) {
      case 'ArrowUp': row = Math.max(0, row - 1); break;
      case 'ArrowDown': row = Math.min(game.rows - 1, row + 1); break;
      case 'ArrowLeft': col = Math.max(0, col - 1); break;
      case 'ArrowRight': col = Math.min(game.cols - 1, col + 1); break;
      case 'Home': col = 0; if (event.ctrlKey) row = 0; break;
      case 'End': col = game.cols - 1; if (event.ctrlKey) row = game.rows - 1; break;
      case 'Enter': case ' ': event.preventDefault(); choosePoint(point); return;
      case 'Escape': event.preventDefault(); clearSelection(); setStatus('statusCleared'); return;
      default: return;
    }
    event.preventDefault();
    focusCell([row, col]);
    cells[row][col].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (selectionStart) updateSelection([row, col]);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!$('language-picker').contains(event.target)) $('language-picker').open = false;
    if (selectionStart && !gridElement.contains(event.target) && !event.target.closest('.header-actions')) clearSelection();
  });
  document.addEventListener('focusin', (event) => {
    if (!$('language-picker').contains(event.target)) $('language-picker').open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if ($('language-picker').open) {
      $('language-picker').open = false;
      $('language-toggle').focus({ preventScroll: true });
      return;
    }
    if (selectionStart) clearSelection();
  });
  window.addEventListener('blur', clearSelection);
  form.addEventListener('submit', generate);
  form.addEventListener('input', (event) => {
    event.target.removeAttribute('aria-invalid');
    if (event.target.id === 'words') $('input-word-count').textContent = translate('wordCount', { count: parseWords(event.target.value).words.length });
  });
  $('print-button').addEventListener('click', () => { if (game) window.print(); });
  $('language').addEventListener('change', (event) => {
    if (event.target.name !== 'language' || !event.target.checked) return;
    applyLanguage(event.target.value);
    $('language-picker').open = false;
    $('language-toggle').focus({ preventScroll: true });
    try { localStorage.setItem(languageStorageKey, language); } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    try { window.history.replaceState(null, '', url); } catch {}
  });
  applyLanguage(initialLanguage());
  if ('ResizeObserver' in window) new ResizeObserver(resizeGrid).observe($('board-scroll'));
  else window.addEventListener('resize', resizeGrid);
})();
