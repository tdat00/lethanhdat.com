(() => {
  'use strict';

  /* GEN:BEGIN */
  const SBOX = [
    45, 20, 6, 29, 2, 34, 9, 42, 52, 14, 0, 41, 55, 31, 37, 10,
    26, 15, 56, 3, 40, 17, 19, 46, 61, 22, 7, 54, 13, 32, 44, 59,
    27, 5, 12, 18, 38, 48, 28, 25, 23, 62, 11, 33, 58, 35, 39, 30,
    24, 1, 51, 63, 16, 43, 57, 47, 49, 8, 53, 4, 21, 50, 36, 60
  ];

  // Returns 18 values (0-63): [0..9] is line 1, [10..17] is line 2.
  // s.levels and s.round hold the level (1-64) and round (1-64) shown in game; the password stores each minus 1.
  function generateValues(s) {
    const c = new Array(14).fill(0);
    for (let d = 0; d < 10; d++) c[d] = ((s.levels[d] - 1) << 2) | s.exps[d];
    c[10] = ((s.round - 1) << 2) | (s.cyclone ? 2 : 0) | (s.drive ? 1 : 0);

    const g = s.random;
    c[11] = (g & 48) | (s.guts ? 128 : 0);
    c[13] = (g & 15) << 4;

    let h = c[11] | (g & 15);
    let f = (c[11] & 240) + c[13];
    for (let d = 0; d < 11; d++) f += c[d];
    f += 777;
    c[12] = f & 255;
    c[11] |= (f >> 8) & 15;

    const b = new Array(18);
    for (let d = 0; d < 4; d++) {
      const k = d * 4, l = d * 3;
      b[k] = c[l] >> 2;
      b[k + 1] = ((c[l] & 3) << 4) | (c[l + 1] >> 4);
      b[k + 2] = ((c[l + 1] & 15) << 2) | (c[l + 2] >> 6);
      b[k + 3] = c[l + 2] & 63;
    }
    b[16] = c[12] >> 2;
    b[17] = ((c[12] & 3) << 4) | (c[13] >> 4);

    return b.map((v, d) => {
      let m = SBOX[v];
      if (d < 15) { h++; m = (m + h) & 63; }
      return m;
    });
  }
  /* GEN:END */

  // Value N is the Nth cell of the game input screen (13 columns, row by row); the last cell is the End key.
  const CHARSETS = {
    ja: { chars: 'あかさたなはまらがざばぱやいきしちにひみりぎじびぴゆうくすつぬふむるぐずぶぷよえけせてねへめれげぜべぺわおこそとのほもろごぞぼぽ', end: 'E' },
    en: { chars: 'AFKPUZejoty49BGLQVafkpuz50CHMRWbglqv16+DINSXchmrw27,EJOTYdinsx38', end: 'GO' }
  };

  const TEAMS = [
    { key: 'sp', name: 'São Paulo' },
    { key: 'nk', name: 'Nankatsu' },
    { key: 'jp', name: 'Japan' }
  ];

  // Rounds 1-6 and 13-16: São Paulo, 7-12: Nankatsu, 17 onwards: Japan.
  const MAX_VALID_ROUND = 33;
  const teamForRound = (r) => (r <= 6 || (r >= 13 && r <= 16) ? 'sp' : r <= 12 ? 'nk' : 'jp');

  // Opponent of round N is OPPONENTS[N - 1].
  const OPPONENTS = [
    'フルミネンセ (Fluminense)',
    'コリンチャンス (Corinthians)',
    'グレミオ (Grêmio)',
    'パルメイラス (Palmeiras)',
    'サントス (Santos)',
    'フラメンゴ (Flamengo)',
    'くにみがくいん (Kunimi Institute)',
    'あきたしょうこう (Akita Shōkō High School)',
    'たつなみ (Tatsunami)',
    'むさし (Musashi)',
    'ふらの (Furano)',
    'とうほう (Tōhō)',
    'ローマ (Roma)',
    'ウルグアイ (Uruguay)',
    'ハンブルガーSV (Hamburger SV)',
    'ぜんにほん (Japan)',
    'シリア (Syria)',
    'ちゅうごく (China)',
    'イラン (Iran)',
    'きたちょうせん (North Korea)',
    'サウジアラビア (Saudi Arabia)',
    'かんこく (South Korea)',
    'バスコダガマ (Vasco da Gama)',
    'ポーランド (Poland)',
    'イングランド (England)',
    'ソビエト (Soviet Union)',
    'フランス (France)',
    'メキシコ (Mexico)',
    'イタリア (Italy)',
    'オランダ (Holland)',
    'アルゼンチン (Argentina)',
    'ニシドイツ (West Germany)',
    'ブラジル (Brazil)'
  ];

  // Match types shown as option groups in the Round list.
  const ROUND_STAGES = [
    { name: 'São Paulo Matches', from: 1, to: 6 },
    { name: 'Nankatsu Matches (Japan Tournament)', from: 7, to: 12 },
    { name: 'Friendly Matches', from: 13, to: 16 },
    { name: 'Asian Cup Matches', from: 17, to: 22 },
    { name: 'Exhibition Matches', from: 23, to: 27 },
    { name: 'World Cup Matches', from: 28, to: MAX_VALID_ROUND }
  ];

  // Per group: [São Paulo, Nankatsu, Japan]; each entry is [romaji, kana].
  const PLAYERS = [
    [[['Tsubasa', 'つばさ']], [['Urabe', 'うらべ']], [['Tsubasa', 'つばさ']]],
    [[['Renato', 'レナート']], [['Nakayama', 'なかやま'], ['Kishida', 'きしだ']], [['Takasugi', 'たかすぎ'], ['Izawa', 'いざわ'], ['Taki', 'たき'], ['Kisugi', 'きすぎ'], ['Morisaki', 'もりさき']]],
    [[['Lima', 'リマ'], ['Marini', 'マリーニ']], [['Morisaki', 'もりさき']], [['Misaki', 'みさき']]],
    [[['Amaral', 'アマラウ']], [['Takasugi', 'たかすぎ']], [['Ishizaki', 'いしざき']]],
    [[['Doutor', 'ドトール']], [['Misaki', 'みさき']], [['Nitta', 'にった'], ['Kazuo', 'かずお'], ['Masao', 'まさお'], ['Jito', 'じとう'], ['Misugi', 'みすぎ']]],
    [[['Batista', 'バチスタ']], [['Izawa', 'いざわ']], [['Soda', 'そうだ'], ['Sano', 'さの'], ['Sawada', 'さわだ'], ['Sorimachi', 'そりまち']]],
    [[['Tahamata', 'タハマタ']], [['Taki', 'たき']], [['Hyuga', 'ひゅうが']]],
    [[['Babinton', 'バビントン']], [['Ishizaki', 'いしざき']], [['Matsuyama', 'まつやま']]],
    [[['Gil', 'ジウ']], [['Nitta', 'にった']], [['Wakabayashi', 'わかばやし']]],
    [[['Plato', 'プラトン']], [['Kisugi', 'きすぎ']], [['Wakashimazu', 'わかしまづ']]]
  ];

  const EXP_LABELS = ['0%', '25%', '50%', '75%'];
  const STORAGE_KEY = 'tsubasa2-password:v1';

  const defaults = () => ({
    v: 3,
    levels: Array(10).fill(1),
    exps: Array(10).fill(0),
    round: 1,
    random: 0,
    cyclone: false,
    drive: false,
    guts: false,
    lang: 'ja',
    randMode: 'balanced',
    randAllMode: 'balanced'
  });

  const clamp = (v, max) => {
    const n = Math.trunc(Number(v));
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), max) : 0;
  };

  function sanitize(raw) {
    const s = defaults();
    if (!raw || typeof raw !== 'object') return s;
    // Older saves stored the raw value (levels before v2, rounds before v3), which the game shows as value + 1.
    const levelShift = raw.v >= 2 ? 0 : 1;
    const roundShift = raw.v >= 3 ? 0 : 1;
    s.levels = s.levels.map((_, i) => Math.max(1, clamp(Number(raw.levels?.[i]) + levelShift, 64)));
    s.exps = s.exps.map((_, i) => clamp(raw.exps?.[i], 3));
    s.round = Math.max(1, clamp(Number(raw.round) + roundShift, 64));
    s.random = clamp(raw.random, 63);
    s.cyclone = raw.cyclone === true;
    s.drive = raw.drive === true;
    s.guts = raw.guts === true;
    s.lang = raw.lang === 'en' ? 'en' : 'ja';
    s.randMode = raw.randMode === 'unbalanced' ? 'unbalanced' : 'balanced';
    s.randAllMode = raw.randAllMode === 'unbalanced' ? 'unbalanced' : 'balanced';
    return s;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? sanitize(JSON.parse(raw)) : defaults();
    } catch {
      return defaults();
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage unavailable */ }
  }

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };

  const state = load();

  // Stepper with -/+ buttons and a slider; shared by Round-like numbers, Seed, and each group's Level and Exp.
  // With `format` the value is shown as text (e.g. '50%') and cannot be typed.
  function numberControl({ id, label, min = 0, max, format, onChange }) {
    const root = el('div', 'num');
    root.innerHTML = `
      <div class="stepper">
        <button type="button" tabindex="-1" data-step="-1" aria-label="Decrease ${label}">&minus;</button>
        <input class="num-input" id="${id}" type="text" inputmode="numeric" autocomplete="off" maxlength="2" aria-label="${label}"${format ? ' readonly' : ''}>
        <button type="button" tabindex="-1" data-step="1" aria-label="Increase ${label}">+</button>
      </div>
      <input class="range" type="range" min="${min}" step="1" aria-label="${label} slider">`;

    const input = root.querySelector('.num-input');
    const range = root.querySelector('.range');
    let value = min;
    let limit = max;
    const fit = (v) => Math.max(min, clamp(v, limit));

    const paintRange = () => { range.max = limit; range.value = value; };
    const paint = () => { input.value = format ? format(value) : value; paintRange(); };
    const commit = (v) => { value = fit(v); paint(); onChange(value); };

    input.addEventListener('input', () => {
      const digits = input.value.replace(/\D/g, '');
      value = digits ? fit(digits) : min;
      if (digits) input.value = value;
      paintRange();
      onChange(value);
    });
    input.addEventListener('blur', paint);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        commit(value + (e.key === 'ArrowUp' ? 1 : -1));
      }
    });
    range.addEventListener('input', () => commit(range.value));
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-step]');
      if (btn) commit(value + Number(btn.dataset.step));
    });

    paint();
    return {
      el: root,
      set(v) { value = fit(v); paint(); },
      setMax(m) { limit = m; value = fit(value); paint(); }
    };
  }

  // ---------- Build the UI ----------
  const roundSel = $('#round');
  roundSel.addEventListener('change', () => { state.round = Number(roundSel.value); update(); });

  const randomCtl = numberControl({
    id: 'seed', label: 'Seed', max: 63,
    onChange: (v) => { state.random = v; update(); }
  });
  $('#random-slot').replaceWith(randomCtl.el);

  const levelCtls = [];
  const expCtls = [];
  const slotsEl = $('#slots');

  PLAYERS.forEach((teams, i) => {
    const card = el('article', 'slot');
    const rows = teams.map((list, ti) => {
      const chips = list.map(([en, jp]) => `<span class="chip" data-jp="${jp}" data-en="${en}"></span>`).join('');
      return `<div class="char-row" data-t="${TEAMS[ti].key}">${chips}</div>`;
    }).join('');

    card.innerHTML = `
      <div class="slot-fields">
        <div>
          <div class="field-head"><span class="label">Player Level</span></div>
          <div data-level></div>
        </div>
        <div>
          <div class="field-head"><span class="label-line"><span class="label">Exp</span><span data-help="exp"></span></span></div>
          <div data-exp></div>
        </div>
      </div>
      <div>
        <div class="field-head"><span class="label">Players</span></div>
        <div class="chars">${rows}</div>
      </div>`;

    const ctl = numberControl({
      id: `level-${i}`, label: `Group ${i + 1} level`, min: 1, max: 64,
      onChange: (v) => { state.levels[i] = v; update(); }
    });
    card.querySelector('[data-level]').replaceWith(ctl.el);
    levelCtls.push(ctl);

    const expCtl = numberControl({
      id: `exp-${i}`, label: `Group ${i + 1} exp`, max: EXP_LABELS.length - 1, format: (v) => EXP_LABELS[v],
      onChange: (v) => { state.exps[i] = v; update(); }
    });
    card.querySelector('[data-exp]').replaceWith(expCtl.el);
    expCtls.push(expCtl);

    slotsEl.append(card);
  });

  // ---------- Help tooltips ----------
  const HELP = {
    round: 'There are 33 valid rounds in this game (1\u201333), but the password system allows up to 64. Rounds 34 and above are listed as unofficial and will glitch or hang the game.',
    guts: "Jun Misugi's guts test starts in round 17. If his guts drop below 100 after a round (win or lose), he will have zero guts in the next round. This option stores that state in the password.",
    players: 'Each player group stores a single level shared by several characters, because the game has more characters across the teams than the password can hold. The characters shown follow the current round: rounds 1\u20136 and 13\u201316 show São Paulo players, 7\u201312 show Nankatsu players, and 17 onwards show Japan players. Names are shown in English; hover over a name, or switch the game language to Japanese, to see its kana.',
    exp: "The players' current experience toward the next level, in steps of 0%, 25%, 50% and 75%.",
    seed: 'A number from 0 to 63 that is mixed into the password to scramble its characters. It has no effect in the game: the same round, levels and abilities with a different seed produce a different but equally valid password.',
    randomize: 'Randomize: gives every group a random Level and Exp, keeping all levels within 5 of each other.\nRandomize (unbalanced): the same, but levels can differ by up to 30.\nChoosing an option from the menu runs it and makes it the default for the main button.',
    randomizeAll: "Random Match: randomizes the Round (1\u201333), the Seed, the Cyclone, Drive Overhead and Misugi's guts options, and the Level and Exp of every player group, keeping all levels within 5 of each other.\nRandom Match (unbalanced): the same, but levels can differ by up to 30.\nChoosing an option from the menu runs it and makes it the default for the main button."
  };

  document.querySelectorAll('[data-help]').forEach((slot, n) => {
    const wrap = el('span', 'help-wrap');
    wrap.innerHTML = `<button type="button" class="help" aria-label="Help" aria-describedby="tip-${n}">?</button><span class="tip" id="tip-${n}" role="tooltip"></span>`;
    wrap.querySelector('.tip').textContent = HELP[slot.dataset.help];
    slot.replaceWith(wrap);
  });

  function placeTip(wrap) {
    const r = wrap.querySelector('.help').getBoundingClientRect();
    const tip = wrap.querySelector('.tip');
    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    const below = r.bottom + 8 + h <= innerHeight;
    tip.style.left = `${Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8)}px`;
    tip.style.top = `${below ? r.bottom + 8 : r.top - 8 - h}px`;
  }

  const closeTips = () => document.querySelectorAll('.help-wrap.open').forEach((w) => w.classList.remove('open'));
  const onHelpEnter = (e) => { const w = e.target.closest('.help-wrap'); if (w) placeTip(w); };
  document.addEventListener('mouseover', onHelpEnter);
  document.addEventListener('focusin', onHelpEnter);
  document.addEventListener('click', (e) => {
    const w = e.target.closest('.help-wrap');
    const wasOpen = w?.classList.contains('open');
    closeTips();
    if (w && !wasOpen) { placeTip(w); w.classList.add('open'); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeTips(); });
  addEventListener('scroll', closeTips, { passive: true });

  const passEl = $('#pass');
  const tiles = [];
  [[5, 5], [5, 3]].forEach((groups) => {
    const row = el('div', 'pass-row');
    groups.forEach((len) => {
      const grp = el('div', 'grp');
      for (let k = 0; k < len; k++) {
        const tile = el('button', 'tile');
        tile.type = 'button';
        tile.title = `Highlight character ${tiles.length + 1}`;
        grp.append(tile);
        tiles.push(tile);
      }
      row.append(grp);
    });
    passEl.append(row);
  });

  const switches = ['cyclone', 'drive', 'guts'];
  switches.forEach((key) => {
    $(`#${key}`).addEventListener('change', (e) => {
      state[key] = e.target.checked;
      update();
    });
  });

  // OPPONENTS entries look like 'kana (English)'.
  const opponentName = (round) => {
    const full = OPPONENTS[round - 1];
    return state.lang === 'ja' ? full : full.replace(/^.* \((.*)\)$/, '$1');
  };

  function buildRoundOptions() {
    const group = (label, from, to, text) => {
      const g = el('optgroup');
      g.label = label;
      for (let r = from; r <= to; r++) g.append(new Option(text(r), r));
      return g;
    };
    roundSel.replaceChildren(
      ...ROUND_STAGES.map(({ name, from, to }) =>
        group(`${name}: rounds ${from}\u2013${to}`, from, to, (r) => `${r}. ${opponentName(r)}`)),
      group('Unofficial rounds (may hang the game)', MAX_VALID_ROUND + 1, 64, (r) => `Round ${r}`)
    );
    roundSel.value = String(state.round);
  }

  function renderChips() {
    const ja = state.lang === 'ja';
    document.querySelectorAll('.chip').forEach((chip) => {
      const { jp, en } = chip.dataset;
      chip.textContent = ja ? `${jp} (${en})` : en;
      if (ja) chip.removeAttribute('title');
      else chip.title = jp;
    });
  }

  // Everything whose text or charset depends on the game language.
  function applyLanguage() {
    renderLangDropdown();
    buildKeyboard();
    buildRoundOptions();
    renderChips();
  }

  function applyTeam() {
    $('#players').dataset.team = teamForRound(state.round);
  }

  function syncUI() {
    levelCtls.forEach((c, i) => c.set(state.levels[i]));
    expCtls.forEach((c, i) => c.set(state.exps[i]));
    switches.forEach((key) => { $(`#${key}`).checked = state[key]; });
    applyLanguage();
    randomCtl.set(state.random);
    renderGroupsSplit();
    renderAllSplit();
    update();
  }

  // ---------- Password display ----------
  const keyboardEl = $('#keyboard');
  let keys = [];

  function buildKeyboard() {
    const { chars, end } = CHARSETS[state.lang];
    keys = [...chars].map((ch) => {
      const key = el('span', 'key');
      key.textContent = ch;
      return key;
    });
    const endKey = el('span', 'key end');
    endKey.textContent = end;
    keyboardEl.replaceChildren(...keys, endKey);
    keyboardEl.lang = passEl.lang = state.lang;
  }

  let step = 0;
  let values = [];

  function renderStep() {
    tiles.forEach((t, i) => t.classList.toggle('current', i === step));
    keys.forEach((k, i) => k.classList.toggle('active', i === values[step]));
    $('#step').textContent = `${step + 1} / ${tiles.length}`;
    $('#prev').disabled = step === 0;
    $('#next').disabled = step === tiles.length - 1;
  }

  function update() {
    values = generateValues(state);
    const { chars } = CHARSETS[state.lang];
    values.forEach((v, i) => { tiles[i].textContent = chars[v]; });
    renderStep();

    $('#round-warn').hidden = state.round <= MAX_VALID_ROUND;
    applyTeam();
    save();
  }

  // ---------- Actions ----------
  // ---------- Language dropdown (custom, because native options cannot show flag icons) ----------
  const langBtn = $('#lang-btn');
  const langList = $('#lang-list');
  const langItems = [...langList.querySelectorAll('[role="option"]')];
  let langActive = 0;

  function renderLangDropdown() {
    const current = langItems.find((li) => li.dataset.value === state.lang);
    langItems.forEach((li) => li.setAttribute('aria-selected', String(li === current)));
    langBtn.querySelector('.flag').dataset.flag = state.lang;
    langBtn.querySelector('.dd-text').textContent = current.querySelector('.dd-text').textContent;
  }

  function setLangActive(i) {
    langActive = (i + langItems.length) % langItems.length;
    langItems.forEach((li, k) => li.classList.toggle('active', k === langActive));
    langList.setAttribute('aria-activedescendant', langItems[langActive].id);
  }

  function openLang() {
    langList.hidden = false;
    langBtn.setAttribute('aria-expanded', 'true');
    setLangActive(langItems.findIndex((li) => li.dataset.value === state.lang));
    langList.focus();
  }

  function closeLang(refocus) {
    langList.hidden = true;
    langBtn.setAttribute('aria-expanded', 'false');
    if (refocus) langBtn.focus();
  }

  function chooseLang(value) {
    closeLang(true);
    if (value === state.lang) return;
    state.lang = value;
    applyLanguage();
    update();
  }

  langBtn.addEventListener('click', () => (langList.hidden ? openLang() : closeLang(true)));
  langBtn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openLang(); }
  });
  langItems.forEach((li) => li.addEventListener('click', () => chooseLang(li.dataset.value)));
  langList.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setLangActive(langActive + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setLangActive(langActive - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chooseLang(langItems[langActive].dataset.value); }
    else if (e.key === 'Escape') { e.preventDefault(); closeLang(true); }
    else if (e.key === 'Tab') closeLang(false);
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.dropdown')) closeLang(false); });

  // ---------- Randomize split buttons ----------
  const RAND_SPREAD = { balanced: 5, unbalanced: 30 };
  const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  // Every group level lands within `spread` of the others; Exp is fully random.
  function randomizeLevels(spread) {
    const lowest = randInt(1, 64 - spread);
    state.levels.forEach((_, i) => { state.levels[i] = lowest + randInt(0, spread); });
    state.exps.forEach((_, i) => { state.exps[i] = randInt(0, 3); });
  }

  function randomizeGroups() {
    randomizeLevels(RAND_SPREAD[state.randMode]);
    syncUI();
  }

  // Round (valid rounds only), Seed, the option checkboxes and every group.
  function randomizeAll() {
    state.round = randInt(1, MAX_VALID_ROUND);
    state.random = randInt(0, 63);
    switches.forEach((key) => { state[key] = Math.random() < 0.5; });
    randomizeLevels(RAND_SPREAD[state.randAllMode]);
    syncUI();
  }

  // Split button: choosing a menu item runs it and makes it the main button; the choice is kept in state[modeKey].
  function splitButton(root, modeKey, run) {
    const main = root.querySelector('.split-main');
    const toggle = root.querySelector('.split-toggle');
    const menu = root.querySelector('.split-menu');
    const items = [...menu.querySelectorAll('[role="menuitemradio"]')];

    function close(refocus) {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      if (refocus) toggle.focus();
    }

    main.addEventListener('click', run);
    toggle.addEventListener('click', () => {
      if (!menu.hidden) { close(true); return; }
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      items.find((li) => li.classList.contains('active')).focus();
    });
    items.forEach((li) => li.addEventListener('click', () => {
      close(true);
      state[modeKey] = li.dataset.mode;
      run();
    }));
    menu.addEventListener('keydown', (e) => {
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); items[i].click(); }
      else if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'Tab') close(false);
    });
    document.addEventListener('click', (e) => { if (!root.contains(e.target)) close(false); });

    return function render() {
      items.forEach((li) => {
        const on = li.dataset.mode === state[modeKey];
        li.classList.toggle('active', on);
        li.setAttribute('aria-checked', String(on));
        if (on) main.textContent = li.textContent;
      });
    };
  }

  const renderGroupsSplit = splitButton($('#rand-groups'), 'randMode', randomizeGroups);
  const renderAllSplit = splitButton($('#rand-all'), 'randAllMode', randomizeAll);

  $('#prev').addEventListener('click', () => { step = Math.max(0, step - 1); renderStep(); });
  $('#next').addEventListener('click', () => { step = Math.min(tiles.length - 1, step + 1); renderStep(); });
  passEl.addEventListener('click', (e) => {
    const i = tiles.indexOf(e.target.closest('.tile'));
    if (i >= 0) { step = i; renderStep(); }
  });

  syncUI();
})();
