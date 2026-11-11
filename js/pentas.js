/* CAKAP — pentas: latar pemandangan beranimasi untuk tiap arena (gambar orisinal, dibuat dengan kode) */
(function () {
  const r = (a, b) => a + Math.random() * (b - a);
  const ulang = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');
  const awan = (x, y, s, kelas) => `<g class="awan ${kelas}" transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="60" ry="22"/><ellipse cx="-30" cy="-14" rx="34" ry="24"/><ellipse cx="22" cy="-20" rx="40" ry="30"/></g>`;
  const bukit = (d, w) => `<path d="${d}" fill="${w}"/>`;
  const balon = (x, y, s, w1, w2, kelas) => `<g class="apung ${kelas}"><g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-12 62 L-8 84 M12 62 L8 84" stroke="#3b2a1a" stroke-width="2" fill="none"/>
    <path d="M0 -60 C46 -60 56 -6 30 36 C22 50 14 58 12 62 L-12 62 C-14 58 -22 50 -30 36 C-56 -6 -46 -60 0 -60Z" fill="${w1}"/>
    <path d="M0 -60 C18 -40 18 30 6 62 L-6 62 C-18 30 -18 -40 0 -60Z" fill="${w2}"/>
    <rect x="-10" y="84" width="20" height="15" rx="3" fill="#8b5a2b"/></g></g>`;
  const layang = (x, y, s, w1, w2, kelas) => `<g class="layang ${kelas}"><g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 40 C-14 70 16 96 -4 130 C-18 156 8 176 0 200" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none"/>
    <path d="M0 -44 L30 0 L0 40 L-30 0Z" fill="${w1}"/><path d="M0 -44 L30 0 L0 0Z" fill="${w2}"/><path d="M0 0 L0 40 L-30 0Z" fill="${w2}" fill-opacity=".55"/>
    <path d="M-7 76 l14 6 -14 6z M-3 112 l14 6 -14 6z M-9 150 l14 6 -14 6z" fill="${w1}"/></g></g>`;
  const ikan = (y, s, w, kelas, lama, tunda) => `<g class="renang ${kelas}" style="animation-duration:${lama}s;animation-delay:${tunda}s"><g transform="translate(0 ${y}) scale(${s})">
    <path d="M-34 0 L-58 -18 L-52 0 L-58 18Z" fill="${w}"/><ellipse cx="0" cy="0" rx="38" ry="20" fill="${w}"/>
    <path d="M-6 -19 Q6 -36 20 -17Z" fill="${w}"/><circle cx="20" cy="-4" r="5" fill="#fff"/><circle cx="22" cy="-4" r="2.4" fill="#1f2440"/>
    <path d="M-4 -12 Q-10 0 -4 12" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/></g></g>`;
  const rumput = (x, h, w, tunda) => `<path class="goyang" style="animation-delay:${tunda}s" d="M${x} 700 C${x - 16} ${700 - h * 0.5} ${x + 18} ${700 - h * 0.75} ${x} ${700 - h} C${x + 30} ${700 - h * 0.7} ${x + 4} ${700 - h * 0.4} ${x + 22} 700Z" fill="${w}"/>`;

  const PENTAS = {
    angka: () => `<div class="pentas p-angka"><svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
      <circle class="matahari" cx="930" cy="250" r="90" fill="#ffd166"/><circle cx="930" cy="250" r="62" fill="#fff1b8"/>
      <g fill="#fff" fill-opacity=".8">${awan(160, 150, 1.2, 'aw1')}${awan(700, 90, 0.9, 'aw2')}${awan(1050, 330, 1, 'aw3')}</g>
      ${balon(210, 300, 1.15, '#e5484d', '#ffc93c', 'ap1')}${balon(560, 210, 0.75, '#3b82f6', '#ffffff', 'ap2')}${balon(1010, 330, 0.95, '#8b5cf6', '#5eead4', 'ap3')}
      ${bukit('M0 600 C200 520 380 560 560 590 C760 620 940 530 1200 580 L1200 700 L0 700Z', '#7c3f6b')}
      ${bukit('M0 650 C240 590 520 660 760 630 C940 610 1080 640 1200 620 L1200 700 L0 700Z', '#4b2552')}</svg></div>`,
    kata: () => `<div class="pentas p-kata"><svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
      <g fill="#fff" fill-opacity=".85">${awan(240, 120, 1.1, 'aw2')}${awan(820, 170, 1.3, 'aw1')}${awan(520, 300, 0.8, 'aw3')}</g>
      ${layang(230, 250, 1.1, '#ffc93c', '#f97316', 'la1')}${layang(960, 200, 0.9, '#f472b6', '#8b5cf6', 'la2')}${layang(640, 330, 0.65, '#5eead4', '#1fa971', 'la3')}
      <g class="burung" stroke="#1f2440" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0 0 q10 -10 20 0 q10 -10 20 0"/><path d="M60 26 q8 -8 16 0 q8 -8 16 0"/><path d="M-40 34 q8 -8 16 0 q8 -8 16 0"/></g>
      ${bukit('M0 610 C180 540 360 520 540 580 C720 640 960 520 1200 590 L1200 700 L0 700Z', '#2f9e6b')}
      ${bukit('M0 660 C260 600 480 650 720 640 C900 632 1060 600 1200 640 L1200 700 L0 700Z', '#1c7a52')}</svg></div>`,
    akal: () => `<div class="pentas p-akal"><svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
      ${ulang(70, () => `<circle class="kelip" style="animation-delay:${r(0, 4).toFixed(2)}s" cx="${r(0, 1200).toFixed(0)}" cy="${r(0, 700).toFixed(0)}" r="${r(0.8, 2.6).toFixed(1)}" fill="#fff"/>`)}
      <g class="apung ap2"><g transform="translate(950 240)"><circle r="78" fill="#f59e0b"/><path d="M-70 -30 Q0 -6 72 -28 M-76 14 Q0 40 76 12" stroke="#b45309" stroke-width="10" fill="none" stroke-linecap="round"/>
        <ellipse rx="130" ry="26" fill="none" stroke="#fde68a" stroke-width="9" transform="rotate(-18)"/></g></g>
      <g class="apung ap1"><circle cx="190" cy="470" r="46" fill="#7dd3fc"/><circle cx="174" cy="456" r="10" fill="#38bdf8"/><circle cx="206" cy="488" r="14" fill="#38bdf8"/></g>
      <g class="roket"><g transform="rotate(38)"><path class="api-roket" d="M-12 44 Q0 96 12 44Z" fill="#ffc93c"/><path d="M0 -54 C24 -30 24 20 16 46 L-16 46 C-24 20 -24 -30 0 -54Z" fill="#f8fafc"/>
        <circle cy="-10" r="10" fill="#3b82f6"/><path d="M-16 20 L-34 50 L-16 44Z M16 20 L34 50 L16 44Z" fill="#e5484d"/></g></g>
      <path class="komet" d="M0 0 L120 -40" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg></div>`,
    pola: () => `<div class="pentas p-pola"><svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
      <g class="sinar" fill="#fff"><path d="M260 0 L380 0 L200 700 L40 700Z"/><path d="M620 0 L700 0 L640 700 L520 700Z"/><path d="M940 0 L1040 0 L1160 700 L1010 700Z"/></g>
      ${ikan(210, 1.1, '#f97316', 'ke-kanan', 26, 0)}${ikan(420, 0.8, '#ffc93c', 'ke-kiri', 32, -8)}${ikan(560, 1.3, '#f472b6', 'ke-kanan', 38, -20)}${ikan(120, 0.6, '#c4b5fd', 'ke-kiri', 30, -17)}
      ${ulang(22, () => { const x = r(0, 1200).toFixed(0); return `<circle class="gelembung" style="animation-duration:${r(7, 15).toFixed(1)}s;animation-delay:-${r(0, 15).toFixed(1)}s" cx="${x}" cy="720" r="${r(4, 13).toFixed(1)}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`; })}
      ${rumput(90, 190, '#0f766e', 0)}${rumput(170, 130, '#14b8a6', -1)}${rumput(1020, 210, '#0f766e', -2)}${rumput(1110, 150, '#14b8a6', -0.5)}${rumput(560, 110, '#0f766e', -1.5)}
      ${bukit('M0 670 C200 640 420 690 640 664 C860 640 1040 684 1200 660 L1200 700 L0 700Z', '#e9c46a')}</svg></div>`,
    ingatan: () => `<div class="pentas p-ingatan"><svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
      ${ulang(40, () => `<circle class="kelip" style="animation-delay:${r(0, 4).toFixed(2)}s" cx="${r(0, 1200).toFixed(0)}" cy="${r(0, 380).toFixed(0)}" r="${r(0.8, 2).toFixed(1)}" fill="#fff"/>`)}
      <circle class="matahari" cx="220" cy="190" r="70" fill="#fef3c7"/><circle cx="250" cy="170" r="60" fill="#3b1d5e"/>
      ${bukit('M0 600 C220 540 400 600 620 570 C840 540 1000 600 1200 560 L1200 700 L0 700Z', '#2a1648')}
      <g fill="#1a0d30"><path d="M130 620 L130 470 C80 470 70 400 120 380 C110 320 190 300 210 350 C270 340 280 420 230 440 C250 470 200 480 170 470 L170 620Z"/>
        <path d="M980 630 L980 500 C940 500 930 440 972 428 C966 380 1034 366 1046 410 C1094 404 1100 466 1060 480 C1074 504 1036 512 1012 502 L1012 630Z"/></g>
      ${bukit('M0 660 C300 610 600 670 900 640 C1020 628 1120 650 1200 636 L1200 700 L0 700Z', '#12081f')}
      ${ulang(26, () => `<g class="kunang" style="animation-duration:${r(6, 13).toFixed(1)}s;animation-delay:-${r(0, 12).toFixed(1)}s"><circle class="kelip" style="animation-delay:${r(0, 3).toFixed(2)}s;animation-duration:${r(1.4, 3).toFixed(1)}s" cx="${r(0, 1200).toFixed(0)}" cy="${r(300, 660).toFixed(0)}" r="${r(3, 6).toFixed(1)}" fill="#fde047"/></g>`)}</svg></div>`,
    kilat: () => `<div class="pentas p-kilat"><svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice">
      <path class="petir pt1" d="M300 120 L250 320 L310 310 L260 520 L380 270 L318 280 L360 120Z" fill="#ffe066"/>
      <path class="petir pt2" d="M900 80 L860 250 L910 244 L870 420 L970 210 L920 218 L950 80Z" fill="#ffe066"/>
      <g fill="#312e81">${awan(260, 130, 2.2, 'aw1')}${awan(880, 100, 2.4, 'aw2')}${awan(560, 190, 1.8, 'aw3')}</g>
      ${ulang(40, () => `<path class="hujan" style="animation-duration:${r(0.7, 1.3).toFixed(2)}s;animation-delay:-${r(0, 1.3).toFixed(2)}s" d="M${r(0, 1260).toFixed(0)} -20 l-14 44" stroke="#c7d2fe" stroke-opacity=".6" stroke-width="2.5" stroke-linecap="round"/>`)}
      ${bukit('M0 640 C240 590 520 650 760 620 C940 600 1080 640 1200 610 L1200 700 L0 700Z', '#1e1b4b')}</svg></div>`
  };
  let kini = null;
  window.CAKAP_PENTAS = function (k) {
    const el = document.getElementById('pentas'); if (!el || k === kini) return;
    kini = k;
    const lama = el.firstElementChild;
    if (lama) { lama.classList.remove('tampil'); setTimeout(() => lama.remove(), 700); }
    if (!k || !PENTAS[k]) return;
    el.insertAdjacentHTML('beforeend', PENTAS[k]());
    const baru = el.lastElementChild; requestAnimationFrame(() => requestAnimationFrame(() => baru.classList.add('tampil')));
  };
})();
