(() => {
  'use strict';

  const ink = '#263238';
  const palettes = {
    tiger: ['#ffbc47', '#ffe9b2', '#ed8a31', '#69402a'],
    lion: ['#ffdb61', '#fff1bd', '#f29438', '#69402a'],
    pig: ['#ff9fbb', '#ffe0e8', '#ef7097', '#973954'],
    dog: ['#e9b572', '#fff1d6', '#a96837', '#704527'],
    cat: ['#66d5ed', '#ddf8ff', '#28a8cc', '#226b80'],
    rabbit: ['#fff4eb', '#ffc2d4', '#f19aae', '#925261'],
    panda: ['#ffffff', '#ffffff', '#35434d', '#35434d'],
    penguin: ['#56a9dc', '#ffffff', '#ffbf42', '#286587'],
    fox: ['#ff8b57', '#fff3dc', '#e96339', '#8b432c'],
    rhino: ['#9cbed0', '#dcecf2', '#7a9eb6', '#4f7185'],
    elephant: ['#86baf4', '#cbe5ff', '#649ce0', '#395e88'],
    monkey: ['#be865c', '#ffe4b5', '#e5b77f', '#6f4934'],
    cow: ['#fffef5', '#ffbdd0', '#efb75e', '#35434d'],
    sheep: ['#fffdf1', '#d2bfe9', '#aa8fc7', '#69527e'],
    goat: ['#f4dca7', '#fff5d9', '#b79a6e', '#806d4c'],
    zebra: ['#ffffff', '#d9e3e9', '#35434d', '#35434d'],
    deer: ['#dfad67', '#fff0cf', '#a17642', '#73512f'],
    hippo: ['#c29aeb', '#e1c6fa', '#a67cd0', '#735095'],
    mouse: ['#c5cdd4', '#ffcad6', '#9baab6', '#596a78'],
    frog: ['#9bdb59', '#f5ffd9', '#6db83e', '#3e6b32'],
    owl: ['#54c7be', '#efffde', '#ffca5d', '#287d79'],
    chick: ['#ffe45f', '#fff4b9', '#ffa344', '#986022']
  };

  const grayscalePalettes = {
    tiger: ['#e6e6e6', '#ffffff', '#d4d4d4', '#8c8c8c'],
    lion: ['#f2f2f2', '#ffffff', '#bfbfbf', '#8c8c8c'],
    pig: ['#f2f2f2', '#d4d4d4', '#bfbfbf', '#8c8c8c'],
    dog: ['#e6e6e6', '#ffffff', '#a6a6a6', '#8c8c8c'],
    cat: ['#d4d4d4', '#ffffff', '#bfbfbf', '#8c8c8c'],
    rabbit: ['#ffffff', '#e6e6e6', '#d4d4d4', '#8c8c8c'],
    panda: ['#ffffff', '#ffffff', '#8c8c8c', '#8c8c8c'],
    penguin: ['#bfbfbf', '#ffffff', '#d4d4d4', '#a6a6a6'],
    fox: ['#bfbfbf', '#ffffff', '#a6a6a6', '#8c8c8c'],
    rhino: ['#d4d4d4', '#f2f2f2', '#bfbfbf', '#8c8c8c'],
    elephant: ['#e6e6e6', '#ffffff', '#bfbfbf', '#8c8c8c'],
    monkey: ['#bfbfbf', '#ffffff', '#d4d4d4', '#8c8c8c'],
    cow: ['#ffffff', '#d4d4d4', '#bfbfbf', '#8c8c8c'],
    sheep: ['#ffffff', '#d4d4d4', '#bfbfbf', '#8c8c8c'],
    goat: ['#f2f2f2', '#ffffff', '#bfbfbf', '#8c8c8c'],
    zebra: ['#ffffff', '#bfbfbf', '#8c8c8c', '#808080'],
    deer: ['#e6e6e6', '#ffffff', '#bfbfbf', '#8c8c8c'],
    hippo: ['#bfbfbf', '#e6e6e6', '#a6a6a6', '#8c8c8c'],
    mouse: ['#e6e6e6', '#ffffff', '#bfbfbf', '#8c8c8c'],
    frog: ['#d4d4d4', '#ffffff', '#bfbfbf', '#8c8c8c'],
    owl: ['#bfbfbf', '#ffffff', '#d4d4d4', '#8c8c8c'],
    chick: ['#f2f2f2', '#ffffff', '#bfbfbf', '#8c8c8c']
  };

  function drawFace(id, mode) {
    const [fur, light, accent, marking] = mode === 'color' ? palettes[id] : grayscalePalettes[id];
    const outline = mode === 'color' ? ink : '#000000';
    const colors = mode === 'minimal'
      ? { fur: '#ffffff', light: '#ffffff', accent: '#ffffff', marking: '#ffffff',
        paper: '#ffffff', ink: outline, eye: outline, glint: outline }
      : { fur, light, accent, marking, paper: '#ffffff', ink: outline, eye: outline,
        glint: mode === 'monochrome' ? outline : '#ffffff' };
    const path = (shape, tone = 'fur', outlined = true) => `<path d="${shape}" fill="${tone === 'none' ? 'none' : colors[tone]}"${outlined ? '' : ' stroke="none"'}/>`;
    const ellipse = (centerX, centerY, radiusX, radiusY, tone = 'fur', outlined = true) => `<ellipse cx="${centerX}" cy="${centerY}" rx="${radiusX}" ry="${radiusY}" fill="${colors[tone]}"${outlined ? '' : ' stroke="none"'}/>`;
    const eyes = (left = 36, right = 64, height = 51, tone = 'eye') => ellipse(left, height, 3.1, 3.8, tone, false) + ellipse(right, height, 3.1, 3.8, tone, false);
    const nose = (height = 66) => path(`M46 ${height}Q50 ${height - 2} 54 ${height}L50 ${height + 4}Z`, 'ink', false);
    const smile = (height = 70) => path(`M50 ${height}v4m-9 0q4 6 9 0 5 6 9 0`, 'none');
    const spots = (shape) => path(shape, 'marking', mode === 'minimal');
    const roundEars = (left, right, height, radius, tone = 'fur') => ellipse(left, height, radius, radius, tone) + ellipse(right, height, radius, radius, tone);
    let drawing;

    switch (id) {
      case 'tiger':
        drawing = roundEars(25, 75, 26, 12)
          + path('M18 49Q18 26 50 26T82 49V61Q82 87 50 87T18 61Z')
          + spots('M44 27H56L50 41ZM19 46 32 51 18 55ZM81 46 68 51 82 55Z')
          + ellipse(50, 70, 20, 13, 'light', false) + eyes() + nose() + smile();
        break;
      case 'lion':
        drawing = path('M35 13Q50 3 65 13 81 10 84 27 97 35 89 50 98 64 84 74 82 91 65 88 50 99 35 88 18 91 16 74 2 64 11 50 3 35 16 27 19 10 35 13Z', 'accent')
          + roundEars(28, 72, 32, 8)
          + path('M25 49Q25 30 50 30T75 49V63Q75 82 50 82T25 63Z')
          + ellipse(50, 67, 17, 12, 'light', false) + eyes(38, 62, 51) + nose(62) + smile(66);
        break;
      case 'pig':
        drawing = path('M19 44 10 17Q25 12 38 29M62 29Q75 12 90 17L81 44')
          + path('M17 54Q17 29 50 29T83 54V63Q83 87 50 87T17 63Z')
          + path('M11 18 19 38 30 25M89 18 81 38 70 25', 'light')
          + eyes(35, 65, 50) + ellipse(50, 69, 22, 15, 'light')
          + ellipse(42, 68, 3, 4, 'ink', false) + ellipse(58, 68, 3, 4, 'ink', false);
        break;
      case 'dog':
        drawing = path('M22 51Q22 25 50 25T78 51V63Q78 87 50 87T22 63Z')
          + path('M28 28Q10 19 8 39L9 66Q19 76 26 61ZM72 28Q90 19 92 39L91 66Q81 76 74 61Z', 'accent')
          + ellipse(50, 69, 18, 14, 'light', false) + eyes(37, 63, 50)
          + path('M45 77V83Q50 90 55 83V77', 'light') + nose(62) + smile(66);
        break;
      case 'cat':
        drawing = path('M18 46 17 13 38 28Q50 24 62 28L83 13 82 46Q89 84 50 87 11 84 18 46Z')
          + path('M24 25 25 37 34 32M76 25 75 37 66 32', 'light')
          + eyes(35, 65, 51) + nose(64) + smile(68)
          + path('M28 64 9 60M28 72 10 76M72 64 91 60M72 72 90 76', 'none');
        break;
      case 'rabbit':
        drawing = path('M25 46Q13 7 27 6 39 5 40 40M60 40Q61 5 73 6 87 7 75 46')
          + path('M28 15 33 35M72 15 67 35', mode === 'color' ? 'light' : 'none')
          + path('M21 61Q21 38 50 38T79 61Q83 88 50 91 17 88 21 61Z')
          + eyes(36, 64, 61) + nose(72) + path('M43 80Q50 86 57 80', 'none');
        break;
      case 'panda':
        drawing = roundEars(25, 75, 25, 13, 'marking')
          + path('M17 51Q17 25 50 25T83 51V61Q83 87 50 87T17 61Z')
          + path('M23 47Q28 35 40 41 48 47 39 60 28 67 23 57ZM77 47Q72 35 60 41 52 47 61 60 72 67 77 57Z', 'marking', mode === 'minimal')
          + eyes(35, 65, 51, 'glint') + nose(67) + smile(71);
        break;
      case 'penguin':
        drawing = path('M16 57Q16 17 50 17T84 57Q86 87 50 88 14 87 16 57Z', mode === 'color' ? 'fur' : 'marking')
          + path('M50 43C31 19 23 42 23 60Q23 81 50 81T77 60C77 42 69 19 50 43Z', 'paper')
          + eyes(36, 64, 52) + path('M37 66 50 58 63 66 50 76Z', 'accent')
          + path('M38 66H62', 'none');
        break;
      case 'fox':
        drawing = path('M17 44 12 9 39 29Q50 26 61 29L88 9 83 44 90 59Q75 75 50 89 25 75 10 59Z')
          + path('M20 22 24 38 33 33M80 22 76 38 67 33', 'light')
          + path('M12 58Q31 48 50 76 69 48 88 58 71 79 50 89 29 79 12 58Z', 'light')
          + eyes(34, 66, 50) + nose(76);
        break;
      case 'rhino':
        drawing = path('M24 39Q9 26 17 14 32 17 35 34M65 34Q68 17 83 14 91 26 76 39')
          + path('M23 47Q22 28 50 28T77 47L84 69Q85 88 50 88T16 69Z')
          + eyes(33, 67, 48)
          + path('M23 61Q50 54 77 61L80 73Q80 85 50 85T20 73Z', 'light')
          + path('M42 64Q48 52 57 35 57 54 63 65Z', 'paper')
          + path('M30 69V72M70 69V72M41 79H59', 'none');
        break;
      case 'elephant':
        drawing = path('M31 34C-2 12 0 79 21 78L35 65M69 34C102 12 100 79 79 78L65 65')
          + path('M23 39Q10 31 12 57M77 39Q90 31 88 57', 'none')
          + path('M25 49Q25 24 50 24T75 49V60Q75 76 59 78H41Q25 76 25 60Z')
          + eyes(36, 64, 51)
          + path('M42 65V81Q42 98 60 92 73 89 66 78L57 81Q61 86 54 85V65')
          + path('M44 74H52', 'none');
        break;
      case 'monkey':
        drawing = roundEars(16, 84, 52, 12, 'light')
          + ellipse(50, 54, 32, 33)
          + path('M50 42C31 23 24 43 28 58 16 76 39 87 50 84 61 87 84 76 72 58 76 43 69 23 50 42Z', 'light')
          + eyes(37, 63, 52) + path('M47 63H53M36 71Q50 85 64 71', 'none');
        break;
      case 'cow':
        drawing = path('M29 32Q15 27 23 10 26 23 37 24M71 32Q85 27 77 10 74 23 63 24', 'accent')
          + path('M26 38Q8 26 5 39 9 53 26 48M74 38Q92 26 95 39 91 53 74 48')
          + path('M27 47Q27 25 50 25T73 47L77 73H23Z')
          + spots('M30 34Q44 22 46 37 47 46 38 47L28 45Z')
          + eyes(36, 64, 52) + ellipse(50, 73, 29, 16, 'light')
          + ellipse(39, 72, 3, 4, 'ink', false) + ellipse(61, 72, 3, 4, 'ink', false);
        break;
      case 'sheep':
        drawing = path('M31 45Q9 35 7 49 14 63 29 55M69 45Q91 35 93 49 86 63 71 55', 'light')
          + path('M28 43H72L68 70Q66 90 50 90T32 70Z', 'light')
          + path('M19 40Q8 29 21 22 19 9 35 13 42 1 51 12 63 2 70 15 85 11 84 25 98 34 84 44 76 53 65 44 54 54 43 45 31 54 26 44 20 47 19 40Z')
          + eyes(38, 62, 59) + nose(72) + smile(76);
        break;
      case 'goat':
        drawing = path('M33 33Q16 13 34 6 27 17 42 28M67 33Q84 13 66 6 73 17 58 28', 'accent')
          + path('M41 78 50 94 59 78', 'light')
          + path('M29 41 7 33Q5 53 30 52M71 41 93 33Q95 53 70 52')
          + path('M29 45Q28 27 50 27T71 45L64 71Q60 85 50 85T36 71Z')
          + eyes(38, 62, 50) + nose(66) + smile(70);
        break;
      case 'zebra':
        drawing = path('M28 35Q15 6 28 9L42 29M72 35Q85 6 72 9L58 29')
          + path('M43 28 43 12Q50 6 57 12V28', 'marking')
          + path('M27 45Q26 24 50 24T73 45V70Q73 90 50 90T27 70Z')
          + spots('M44 25H56L54 32H46ZM28 35Q50 44 72 35L73 42Q50 51 27 42ZM27 56 39 61 27 65ZM73 56 61 61 73 65Z')
          + eyes(39, 61, 51) + ellipse(50, 76, 23, 14, 'light')
          + path('M40 73V76M60 73V76', 'none');
        break;
      case 'deer':
        drawing = path('M35 43 29 32H18Q10 32 10 24V19H15V24Q15 27 20 27H25L21 18V7H26V16L31 25 34 20V10H39V22L34 31 42 43ZM65 43 71 32H82Q90 32 90 24V19H85V24Q85 27 80 27H75L79 18V7H74V16L69 25 66 20V10H61V22L66 31 58 43Z', 'accent')
          + path('M33 49Q13 52 8 36 25 30 38 44ZM67 49Q87 52 92 36 75 30 62 44Z')
          + path('M29 57Q29 41 50 41T71 57Q68 78 58 88 50 94 42 88 32 78 29 57Z')
          + ellipse(50, 79, 14, 11, 'light', false)
          + eyes(39, 61, 61) + nose(76) + smile(80);
        break;
      case 'hippo':
        drawing = roundEars(25, 75, 24, 8)
          + path('M22 51Q20 32 32 30 41 29 43 36H57Q59 29 68 30 80 32 78 51L83 68H17Z')
          + eyes(33, 67, 43)
          + path('M15 65Q14 51 30 53H70Q86 51 85 65V74Q85 89 68 89H32Q15 89 15 74Z', 'light')
          + ellipse(30, 63, 3, 3, 'ink', false) + ellipse(70, 63, 3, 3, 'ink', false)
          + path('M34 79V86H42V80M58 80V86H66V79', 'paper')
          + path('M27 77Q50 84 73 77', 'none');
        break;
      case 'mouse':
        drawing = roundEars(24, 76, 28, 19)
          + roundEars(24, 76, 28, 11, 'light')
          + path('M26 49Q29 31 50 31T74 49Q86 65 50 89 14 65 26 49Z')
          + eyes(37, 63, 54) + nose(76)
          + path('M31 68 12 64M32 75 14 80M69 68 88 64M68 75 86 80', 'none');
        break;
      case 'frog':
        drawing = path('M12 47Q6 19 28 18 45 18 45 36H55Q55 18 72 18 94 19 88 47 99 83 50 86 1 83 12 47Z')
          + ellipse(28, 37, 10, 12, 'paper') + ellipse(72, 37, 10, 12, 'paper')
          + eyes(29, 71, 37) + path('M25 63Q50 85 75 63', 'none');
        break;
      case 'owl':
        drawing = path('M17 43 13 16 35 28Q50 22 65 28L87 16 83 43Q94 87 50 90 6 87 17 43Z')
          + ellipse(33, 52, 17, 19, 'light') + ellipse(67, 52, 17, 19, 'light')
          + ellipse(34, 52, 5, 6, 'ink', false) + ellipse(66, 52, 5, 6, 'ink', false)
          + path('M43 69 50 79 57 69Z', 'accent');
        break;
      case 'chick':
        drawing = path('M39 29Q26 12 41 15L47 23Q49 6 57 12L57 24Q74 14 68 31')
          + ellipse(50, 58, 34, 31) + eyes(36, 64, 53)
          + path('M38 67 50 59 62 67 50 77Z', 'accent') + path('M39 67H61', 'none');
        break;
    }

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke="${mode === 'color' ? ink : '#000000'}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">${drawing}</g></svg>`);
  }

  const animals = [
    ['tiger', 'Hổ', 'Tiger'], ['lion', 'Sư tử', 'Lion'], ['pig', 'Lợn', 'Pig'],
    ['dog', 'Chó', 'Dog'], ['cat', 'Mèo', 'Cat'], ['rabbit', 'Thỏ', 'Rabbit'],
    ['panda', 'Gấu trúc', 'Panda'], ['penguin', 'Chim cánh cụt', 'Penguin'],
    ['fox', 'Cáo', 'Fox'], ['rhino', 'Tê giác', 'Rhinoceros'], ['elephant', 'Voi', 'Elephant'],
    ['monkey', 'Khỉ', 'Monkey'], ['cow', 'Bò', 'Cow'], ['sheep', 'Cừu', 'Sheep'],
    ['goat', 'Dê', 'Goat'], ['zebra', 'Ngựa vằn', 'Zebra'], ['deer', 'Hươu', 'Deer'],
    ['hippo', 'Hà mã', 'Hippo'], ['mouse', 'Chuột', 'Mouse'], ['frog', 'Ếch', 'Frog'],
    ['owl', 'Cú mèo', 'Owl'], ['chick', 'Gà con', 'Chick']
  ];

  window.AnimalFaces = Object.freeze(animals.map(([id, vi, en], index) => Object.freeze({
    id, vi, en, code: String.fromCharCode(65 + index),
    src: drawFace(id, 'color'),
    monochromeSrc: drawFace(id, 'monochrome'),
    minimalSrc: drawFace(id, 'minimal')
  })));
})();