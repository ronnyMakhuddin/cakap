/* CAKAP — jenis soal ala tes IQ klasik (isi soal dibuat sendiri). Memperluas CAKAP_SOAL. */
(function (root) {
  const S = root.CAKAP_SOAL, U = S.util, g = S.SEMUA;
  const { ri, pick, shuffle, sample, mk, numQ, fig, fmt, WN, BENTUK, WARNA, NAMA } = U;
  const Y = {};
  const kecil = (o) => fig(o).replace('class="fig"', 'class="fig kecil"');
  const kotak = (v) => `<span class="bx${v === '?' ? ' q' : ''}">${v}</span>`;

  /* ================= KATA ================= */
  // Pasangan kelompok yang berdekatan: tiga kata dari kelompok pertama, satu penyusup dari kelompok kedua.
  const KEL = {
    sd: [
      [['apel', 'jeruk', 'mangga', 'pisang', 'rambutan', 'durian', 'salak', 'manggis'], ['bayam', 'kangkung', 'wortel', 'kubis', 'terung', 'buncis', 'sawi', 'labu']],
      [['ayam', 'bebek', 'angsa', 'merpati', 'kalkun', 'puyuh'], ['lele', 'gurami', 'bandeng', 'tongkol', 'nila', 'kakap']],
      [['pensil', 'pulpen', 'penghapus', 'penggaris', 'spidol', 'kapur'], ['sendok', 'garpu', 'piring', 'mangkuk', 'gelas', 'sumpit']],
      [['mobil', 'bus', 'truk', 'sepeda', 'kereta', 'becak'], ['kapal', 'perahu', 'rakit', 'sampan', 'feri', 'kano']]
    ],
    smp: [
      [['gitar', 'kecapi', 'sasando', 'ukulele', 'harpa', 'mandolin'], ['suling', 'terompet', 'saksofon', 'klarinet', 'harmonika', 'serunai']],
      [['jahe', 'kunyit', 'lengkuas', 'kencur', 'temulawak'], ['lada', 'pala', 'ketumbar', 'jintan', 'kemiri']],
      [['Semeru', 'Merapi', 'Rinjani', 'Kerinci', 'Bromo', 'Slamet'], ['Toba', 'Singkarak', 'Maninjau', 'Poso', 'Sentani', 'Matano']],
      [['sepak bola', 'voli', 'basket', 'futsal', 'rugbi'], ['silat', 'karate', 'judo', 'taekwondo', 'tinju', 'gulat']],
      [['persegi', 'segitiga', 'lingkaran', 'trapesium', 'jajargenjang'], ['kubus', 'balok', 'tabung', 'kerucut', 'limas']],
      [['paus', 'lumba-lumba', 'dugong', 'anjing laut', 'singa laut'], ['hiu', 'pari', 'tuna', 'kerapu', 'barakuda']]
    ],
    sma: [
      [['besi', 'tembaga', 'emas', 'perak', 'aluminium', 'seng'], ['karbon', 'belerang', 'fosfor', 'oksigen', 'nitrogen', 'helium']],
      [['kecepatan', 'gaya', 'percepatan', 'perpindahan', 'momentum'], ['massa', 'waktu', 'suhu', 'energi', 'volume', 'jarak']],
      [['cerpen', 'novel', 'roman', 'hikayat', 'dongeng'], ['pantun', 'syair', 'gurindam', 'seloka', 'karmina']],
      [['mitokondria', 'ribosom', 'lisosom', 'kloroplas', 'vakuola'], ['jantung', 'hati', 'ginjal', 'paru-paru', 'lambung']],
      [['2', '3', '5', '7', '11', '13', '17', '19', '23', '29'], ['9', '15', '21', '25', '27', '33', '35', '49']],
      [['Merkurius', 'Venus', 'Mars', 'Jupiter', 'Saturnus', 'Neptunus'], ['Bulan', 'Titan', 'Europa', 'Ganimede', 'Io', 'Fobos']]
    ]
  };
  Y.penyusup = (j) => {
    const p = pick(KEL[j]), balik = ri(0, 1), a = p[balik ? 1 : 0], b = p[balik ? 0 : 1];
    return mk('Tiga pilihan berasal dari kelompok yang sama. Mana <b>penyusupnya</b>?', pick(b), sample(a, 3));
  };
  const BIL = [
    ['solo', 1, 1], ['jumlah sisi segitiga', 3, 1], ['sepasang', 2, 1], ['duet', 2, 1], ['trio', 3, 1], ['jumlah sisi persegi', 4, 1], ['selusin', 12, 1], ['jumlah hari dalam sepekan', 7, 1], ['jumlah bulan dalam setahun', 12, 1], ['jumlah lengan gurita', 8, 1],
    ['kuartet', 4, 2], ['triwulan (dalam bulan)', 3, 2], ['caturwulan (dalam bulan)', 4, 2], ['semester (dalam bulan)', 6, 2], ['pancaindra', 5, 2], ['setengah lusin', 6, 2], ['jumlah warna pelangi', 7, 2], ['sekodi', 20, 2], ['dasawarsa (dalam tahun)', 10, 2], ['seabad (dalam tahun)', 100, 2],
    ['windu (dalam tahun)', 8, 3], ['lustrum (dalam tahun)', 5, 3], ['oktaf (jumlah nada)', 8, 3], ['dekade (dalam tahun)', 10, 3], ['milenium (dalam tahun)', 1000, 3], ['jumlah sisi heksagon', 6, 3], ['segros', 144, 3]
  ];
  Y.kataAngka = (j) => {
    const lv = j === 'sd' ? 1 : j === 'smp' ? 2 : 3, pool = BIL.filter((x) => x[2] <= lv && (j === 'sd' || x[2] >= lv - 1));
    if (j !== 'sma') { const it = pick(pool); return numQ(`Bilangan berapa yang diwakili oleh<br><b>${it[0]}</b>?`, it[1]); }
    const two = sample(pool.filter((x) => x[1] < 200), 2), kali = two[0][1] * two[1][1] <= 200 && ri(0, 1);
    return numQ(`Ubah tiap istilah menjadi bilangan, lalu hitung:<br><b>${two[0][0]} ${kali ? '×' : '+'} ${two[1][0]}</b>`, kali ? two[0][1] * two[1][1] : two[0][1] + two[1][1]);
  };
  const H = (i) => String.fromCharCode(65 + ((i % 26) + 26) % 26);
  Y.deretHuruf = (j) => {
    const q = (t) => `Huruf apa yang melanjutkan deret ini?<br><b class="huruf">${t.join(', ')}, …</b>`;
    const satu = (t) => { const a = t[t.length - 1]; return mk(q(t.slice(0, -1).map(H)), H(a), [H(a + 1), H(a - 1), H(a + 2)]); };
    if (j === 'sd') { const s = ri(0, 8), d = ri(1, 3); return satu([0, 1, 2, 3, 4].map((i) => s + i * d)); }
    if (j === 'smp') {
      if (ri(0, 1)) { const t = []; let s = ri(0, 5), d = 1; for (let i = 0; i < 6; i++) { t.push(s); s += d; d++; } return satu(t); }
      const s = ri(17, 25), d = ri(2, 4); return satu([0, 1, 2, 3, 4].map((i) => s - i * d));
    }
    if (ri(0, 1)) {
      const s = ri(0, 6), d = ri(1, 2), f = (i) => H(s + i * d) + H(25 - s - i * d), a = s + 4 * d, b = 25 - s - 4 * d;
      return mk(`Pasangan huruf apa yang melanjutkan deret ini?<br><b class="huruf">${[0, 1, 2, 3].map(f).join(', ')}, …</b>`, f(4), [H(a + 1) + H(b), H(a) + H(b + 1), H(a) + H(b - 1)]);
    }
    const s1 = ri(0, 5), d1 = ri(2, 3), s2 = ri(20, 25), d2 = ri(1, 3), t = [];
    for (let i = 0; i < 4; i++) { t.push(s1 + i * d1); t.push(s2 - i * d2); }
    return satu(t.slice(0, 7));
  };

  /* ================= ANGKA ================= */
  const OPS = { '+': (a, b) => a + b, '−': (a, b) => a - b, '×': (a, b) => a * b, ':': (a, b) => a / b };
  const sama = (x, y) => Math.abs(x - y) < 1e-9;
  Y.operator = (j) => {
    for (;;) {
      if (j === 'sd') {
        const b = ri(2, 9), op = pick(Object.keys(OPS)), a = op === ':' ? b * ri(2, 9) : ri(2, 12), r = OPS[op](a, b);
        if (Object.keys(OPS).filter((o) => sama(OPS[o](a, b), r)).length !== 1) continue;
        return mk(`Tanda apa yang tepat untuk mengisi kotak?<br><b>${a} ▢ ${b} = ${fmt(r)}</b>`, op, Object.keys(OPS).filter((o) => o !== op));
      }
      const ops = j === 'smp' ? ['+', '−', '×'] : ['+', '−', '×', ':'], a = ri(2, 12), b = ri(2, 9), c = ri(2, 9), hi = (o) => o === '×' || o === ':';
      const ev = (o1, o2) => (hi(o2) && !hi(o1) ? OPS[o1](a, OPS[o2](b, c)) : OPS[o2](OPS[o1](a, b), c));
      const o1 = pick(ops), o2 = pick(ops), r = ev(o1, o2), semua = [];
      if (!Number.isInteger(r)) continue;
      ops.forEach((x) => ops.forEach((y) => semua.push([x, y])));
      if (semua.filter((p) => sama(ev(p[0], p[1]), r)).length !== 1) continue;
      const nm = (p) => `${p[0]} lalu ${p[1]}`;
      return mk(`Isi kedua kotak dengan tanda yang tepat.<br><b>${a} ▢ ${b} ▢ ${c} = ${fmt(r)}</b><br><small>Kali dan bagi dikerjakan lebih dulu.</small>`, nm([o1, o2]), sample(semua.filter((p) => p[0] !== o1 || p[1] !== o2), 3).map(nm));
    }
  };
  Y.relasi = (j) => {
    if (j === 'sd') {
      const k = ri(2, 6), f = pick([(x) => x * k, (x) => x + k + 3, (x) => 2 * x + 1, (x) => x * x]), xs = sample([2, 3, 4, 5, 6, 7, 8, 9], 4);
      return numQ(`Perhatikan pola perubahan bilangan:<br><b>${xs.slice(0, 3).map((x) => `${x} → ${f(x)}`).join(' &nbsp;·&nbsp; ')}</b><br>Maka <b>${xs[3]} → ?</b>`, f(xs[3]));
    }
    const f = pick(j === 'smp'
      ? [(a, b) => a * b + a, (a, b) => 2 * a + b, (a, b) => (a + b) * 2, (a, b) => a * b - b, (a, b) => a + 3 * b]
      : [(a, b) => a * a + b, (a, b) => a * a - b * b, (a, b) => (a + b) * (a + b), (a, b) => a * b + a + b, (a, b) => a * a + b * b, (a, b) => (a - b) * (a + 1)]);
    const as = sample([2, 3, 4, 5, 6, 7, 8, 9], 4), bs = sample([1, 2, 3, 4, 5, 6, 7], 4);
    return numQ(`Tanda ◆ adalah operasi rahasia.<br><b>${[0, 1, 2].map((i) => `${as[i]} ◆ ${bs[i]} = ${fmt(f(as[i], bs[i]))}`).join('<br>')}</b><br>Maka <b>${as[3]} ◆ ${bs[3]} = ?</b>`, f(as[3], bs[3]));
  };
  Y.ajaib = (j) => {
    let m = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
    for (let i = ri(0, 3); i > 0; i--) m = m[0].map((_, c) => m.map((r) => r[c]).reverse());
    if (ri(0, 1)) m = m.map((r) => r.slice().reverse());
    const k = ri(0, j === 'sd' ? 5 : 15), mul = j === 'sma' ? ri(1, 3) : 1, val = (i) => m[Math.floor(i / 3)][i % 3] * mul + k, semua = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let ask, show;
    if (j === 'sd') { ask = ri(0, 8); show = semua.filter((i) => i !== ask); }
    else if (j === 'smp') { ask = pick([0, 1, 2, 3, 5, 6, 7, 8]); const sembunyi = sample(semua.filter((i) => i !== ask && i !== 4 && i !== 8 - ask), 2); show = semua.filter((i) => i !== ask && !sembunyi.includes(i)); }
    else { const line = pick([[0, 1, 2], [6, 7, 8], [0, 3, 6], [2, 5, 8]]), extra = pick(semua.filter((i) => i !== 4 && !line.includes(i) && !line.includes(8 - i))); ask = 8 - extra; show = line.concat([extra]); }
    return numQ('Pada kotak ajaib, jumlah bilangan di setiap baris, kolom, dan diagonal selalu sama. Berapa isi kotak <b>?</b>', val(ask),
      { extra: { stim: `<div class="ajaib">${semua.map((i) => kotak(i === ask ? '?' : show.includes(i) ? val(i) : '')).join('')}</div>` } });
  };

  /* ================= AKAL ================= */
  Y.sudoku = (j) => {
    const d = shuffle([1, 2, 3, 4]);
    let gr = [[0, 1, 2, 3], [2, 3, 0, 1], [1, 0, 3, 2], [3, 2, 1, 0]].map((r) => r.map((v) => d[v]));
    if (ri(0, 1)) gr = [gr[1], gr[0], gr[2], gr[3]];
    if (ri(0, 1)) gr = [gr[0], gr[1], gr[3], gr[2]];
    if (ri(0, 1)) gr = gr.map((r) => [r[1], r[0], r[2], r[3]]);
    if (ri(0, 1)) gr = gr.map((r) => [r[0], r[1], r[3], r[2]]);
    const ar = ri(0, 3), ac = ri(0, 3), ans = gr[ar][ac], show = new Set(), peers = [], lain = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      if (r === ar && c === ac) continue;
      (r === ar || c === ac || ((r >> 1) === (ar >> 1) && (c >> 1) === (ac >> 1)) ? peers : lain).push([r, c]);
    }
    if (j === 'sd') peers.filter((p) => p[0] === ar).forEach((p) => show.add(p[0] * 4 + p[1]));
    else [1, 2, 3, 4].filter((v) => v !== ans).forEach((v) => { const p = pick(peers.filter((x) => gr[x[0]][x[1]] === v)); show.add(p[0] * 4 + p[1]); });
    sample(lain.concat(peers), j === 'sd' ? 5 : j === 'smp' ? 4 : 2).forEach((p) => show.add(p[0] * 4 + p[1]));
    let h = '';
    for (let i = 0; i < 16; i++) h += `<span class="${i === ar * 4 + ac ? 'q' : ''}">${i === ar * 4 + ac ? '?' : show.has(i) ? gr[i >> 2][i % 4] : ''}</span>`;
    return mk('Setiap baris, kolom, dan kotak 2×2 harus berisi angka 1–4 tepat satu kali. Angka berapa di kotak <b>?</b>', String(ans), [1, 2, 3, 4].filter((v) => v !== ans).map(String), { stim: `<div class="sudoku">${h}</div>` });
  };
  Y.jujur = (j) => {
    const n = j === 'sma' ? 4 : 3;
    for (;;) {
      const nm = sample(NAMA, n), st = nm.map((_, i) => { const y = ri(0, n - 1); return { y: y, acc: y !== i && ri(0, 1) === 1 }; });
      const satuJujur = ri(0, 1) === 1, target = satuJujur ? 1 : n - 1, sol = [];
      for (let c = 0; c < n; c++) if (st.filter((s) => (s.acc ? s.y === c : s.y !== c)).length === target) sol.push(c);
      if (sol.length !== 1 || st.filter((s) => s.acc).length === 0) continue;
      const kata = st.map((s, i) => `${nm[i]}: “${s.acc ? nm[s.y] + ' pelakunya.' : s.y === i ? 'Bukan aku pelakunya.' : nm[s.y] + ' bukan pelakunya.'}”`).join('<br>');
      const wrong = nm.filter((_, i) => i !== sol[0]); if (wrong.length < 3) wrong.push('Tidak dapat ditentukan');
      return mk(`Sebuah vas pecah. Pelakunya satu orang di antara mereka.<br><span class="kutip">${kata}</span><br><b>Tepat satu orang ${satuJujur ? 'berkata jujur' : 'berbohong'}. Siapa pelakunya?</b>`, nm[sol[0]], wrong);
    }
  };

  /* ================= POLA ================= */
  Y.jaring = (tipe) => {
    const ss = shuffle(BENTUK), cs = shuffle(WN), f = ss.map((s, i) => ({ s: s, c: cs[i] }));
    let cells, pasangan, kol;
    if (tipe === '141') { const a = ri(0, 3), b = ri(0, 3); cells = [[0, a], [1, 0], [1, 1], [1, 2], [1, 3], [2, b]]; pasangan = [[0, 5], [1, 3], [2, 4]]; kol = 4; }
    else { cells = [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [1, 4]]; pasangan = [[0, 2], [3, 5], [1, 4]]; kol = 5; }
    const baris = cells.reduce((m, c) => Math.max(m, c[0]), 0) + 1; let h = '';
    for (let r = 0; r < baris; r++) for (let c = 0; c < kol; c++) { const i = cells.findIndex((x) => x[0] === r && x[1] === c); h += i < 0 ? '<span></span>' : `<span class="sisi">${fig(f[i])}</span>`; }
    const p = pick(pasangan), balik = ri(0, 1), tanya = p[balik], ans = p[1 - balik];
    return mk(`Jaring-jaring ini dilipat menjadi kubus. Gambar mana yang berada di sisi <b>berhadapan</b> dengan ${kecil(f[tanya])}?`, fig(f[ans]),
      sample([0, 1, 2, 3, 4, 5].filter((i) => i !== ans && i !== tanya), 3).map((i) => fig(f[i])), { stim: `<div class="jaring" style="--k:${kol}">${h}</div>`, gambar: true });
  };
  function petak(n, cells, c, kelas) {
    const s = 60 / n; let o = '';
    for (let i = 0; i < n * n; i++) o += `<rect x="${(2 + (i % n) * s).toFixed(1)}" y="${(2 + Math.floor(i / n) * s).toFixed(1)}" width="${s}" height="${s}" fill="${cells.has(i) ? WARNA[c] : '#fff'}"/>`;
    return `<svg class="${kelas || 'fig'}" viewBox="0 0 64 64" stroke="#1f2440" stroke-width="1.5" aria-hidden="true">${o}</svg>`;
  }
  const putar90 = (cells, n) => new Set(Array.from(cells).map((i) => (i % n) * n + (n - 1 - Math.floor(i / n))));
  const cermin = (cells, n) => new Set(Array.from(cells).map((i) => Math.floor(i / n) * n + (n - 1 - i % n)));
  const kset = (s) => Array.from(s).sort((a, b) => a - b).join();
  Y.samaPutar = (j) => {
    const n = j === 'sd' ? 3 : j === 'smp' ? 4 : 5, k = j === 'sd' ? 4 : j === 'smp' ? ri(5, 7) : ri(8, 11), c = pick(WN);
    for (;;) {
      const a = new Set(sample(Array.from(Array(n * n).keys()), k)), rot = [a], mir = [cermin(a, n)];
      for (let i = 0; i < 3; i++) { rot.push(putar90(rot[i], n)); mir.push(putar90(mir[i], n)); }
      if (new Set(rot.concat(mir).map(kset)).size < 8) continue;
      return mk('Mana gambar yang <b>sama</b> dengan gambar ini, hanya diputar (bukan dicerminkan)?', petak(n, rot[ri(1, 3)], c), sample(mir, 3).map((x) => petak(n, x, c)),
        { stim: `<div class="seq">${petak(n, a, c, 'fig besar')}</div>`, gambar: true });
    }
  };
  Y.segitiga = (j) => {
    const n = j === 'sd' ? ri(1, 2) : j === 'smp' ? ri(2, 3) : ri(2, 4), m = j === 'sd' ? 0 : j === 'smp' ? ri(0, 1) : ri(1, 2);
    const A = [100, 8], L = [16, 112], R = [184, 112], ln = (p, q) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}"/>`;
    const mix = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]; let o = '';
    for (let i = 1; i <= n; i++) o += ln(A, mix(L, R, i / (n + 1)));
    for (let i = 1; i <= m; i++) o += ln(mix(A, L, i / (m + 1)), mix(A, R, i / (m + 1)));
    const svg = `<svg class="segi" viewBox="0 0 200 120" stroke="#1f2440" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" fill="#fff3c4" aria-hidden="true"><polygon points="100,8 16,112 184,112"/>${o}</svg>`;
    return numQ('Ada berapa segitiga pada gambar ini?<br><small>Hitung semua segitiga, besar maupun kecil.</small>', (n + 1) * (n + 2) / 2 * (m + 1), { extra: { stim: svg } });
  };
  const kertas = (holes, bagian) => {
    const lub = holes.map((h) => `<circle cx="${(2 + h[0] * 60).toFixed(1)}" cy="${(2 + h[1] * 60).toFixed(1)}" r="3.6" fill="#1f2440" stroke="none"/>`).join('');
    if (!bagian) return `<svg class="fig" viewBox="0 0 64 64" stroke="#1f2440" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2" width="60" height="60" fill="#fff3c4"/>${lub}</svg>`;
    return `<svg class="fig besar" viewBox="0 0 64 64" stroke="#1f2440" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2" width="60" height="60" fill="none" stroke-dasharray="3 3" stroke-opacity=".45"/><rect x="2" y="2" width="30" height="${bagian === 2 ? 30 : 60}" fill="#ffd166"/>${lub}</svg>`;
  };
  Y.lipat = (kali, jml) => {
    const P = [0.1, 0.18, 0.34, 0.4], pts = [];
    while (pts.length < jml) { const p = [pick(P), kali === 2 ? pick(P) : pick([0.14, 0.3, 0.42, 0.62, 0.8])]; if (!pts.some((q) => Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) < 0.15)) pts.push(p); }
    const mH = pts.map((p) => [1 - p[0], p[1]]), mV = pts.map((p) => [p[0], 1 - p[1]]), mHV = pts.map((p) => [1 - p[0], 1 - p[1]]);
    const gH = pts.map((p) => [p[0] + 0.5, p[1]]), gV = pts.map((p) => [p[0], p[1] + 0.5]), gHV = pts.map((p) => [p[0] + 0.5, p[1] + 0.5]);
    const benar = kali === 2 ? pts.concat(mH, mV, mHV) : pts.concat(mH);
    const salah = kali === 2 ? [pts.concat(mH), pts.concat(mV), pts.concat(gH, gV, gHV)] : [pts, pts.concat(gH), pts.concat(mV)];
    return mk(kali === 2
      ? 'Kertas persegi dilipat dua ke kiri, lalu dilipat lagi ke atas, kemudian dilubangi seperti gambar. Seperti apa kertas itu saat dibuka?'
      : 'Kertas persegi dilipat dua ke kiri (sisi kanan menutup sisi kiri), lalu dilubangi seperti gambar. Seperti apa kertas itu saat dibuka?',
    kertas(benar), salah.map((x) => kertas(x)), { stim: `<div class="seq">${kertas(pts, kali)}</div>`, gambar: true });
  };

  /* ================= INGATAN ================= */
  Y.simon = (n, len) => {
    const seq = []; while (seq.length < len) { const c = ri(0, n * n - 1); if (c !== seq[seq.length - 1]) seq.push(c); }
    return { tipe: 'grid', urut: true, q: `Ketuk petak sesuai <b>urutan</b> menyalanya! (${len} ketukan)`, n: n, sel: seq };
  };

  /* ================= TAMBAHKAN KE LEVEL ================= */
  const add = (k, j, l, arr) => arr.forEach((f) => g[k][j][l].push(f));
  ['sd', 'smp', 'sma'].forEach((j) => {
    add('kata', j, 0, [() => Y.penyusup(j)]);
    add('kata', j, 1, [() => Y.kataAngka(j), () => Y.deretHuruf(j)]);
    add('kata', j, 2, [() => Y.deretHuruf(j), () => Y.kataAngka(j), () => Y.penyusup(j)]);
    add('angka', j, j === 'sd' ? 1 : 0, [() => Y.operator(j)]);
    add('angka', j, j === 'sd' ? 2 : 1, [() => Y.relasi(j)]);
    add('angka', j, 2, [() => Y.ajaib(j), () => Y.operator(j)]);
    add('akal', j, j === 'sd' ? 1 : 0, [() => Y.sudoku(j)]);
    add('akal', j, 1, [() => Y.jujur(j)]);
    add('akal', j, 2, [() => Y.jujur(j), () => Y.sudoku(j)]);
  });
  add('pola', 'sd', 1, [() => Y.segitiga('sd')]);
  add('pola', 'sd', 2, [() => Y.lipat(1, 1), () => Y.samaPutar('sd')]);
  add('pola', 'smp', 0, [() => Y.segitiga('smp')]);
  add('pola', 'smp', 1, [() => Y.lipat(1, 2), () => Y.samaPutar('smp'), () => Y.jaring('141')]);
  add('pola', 'smp', 2, [() => Y.jaring('141'), () => Y.lipat(2, 1), () => Y.segitiga('smp')]);
  add('pola', 'sma', 0, [() => Y.segitiga('sma'), () => Y.samaPutar('sma')]);
  add('pola', 'sma', 1, [() => Y.jaring('141'), () => Y.lipat(2, 1)]);
  add('pola', 'sma', 2, [() => Y.jaring('33'), () => Y.lipat(2, 2), () => Y.samaPutar('sma')]);
  [['sd', [[3, 3], [3, 4], [3, 5]]], ['smp', [[3, 4], [3, 5], [4, 6]]], ['sma', [[4, 5], [4, 6], [4, 7]]]].forEach((x) => x[1].forEach((p, l) => add('ingatan', x[0], l, [() => Y.simon(p[0], p[1])])));

  /* ================= PILIHAN GANDA KOMPLEKS (lebih dari satu jawaban) ================= */
  const T = root.CAKAP_BANK.tambahan;
  const mq = (q, benar, salah, extra) => {
    const ch = shuffle(benar.concat(salah));
    return Object.assign({ tipe: 'multi', q: q + '<br><small>Jawaban benar bisa lebih dari satu.</small>', choices: ch, benar: ch.map((c, i) => (benar.includes(c) ? i : -1)).filter((i) => i >= 0) }, extra || {});
  };
  const NAMA_KEL = {
    sd: [['buah', 'sayur'], ['unggas', 'ikan'], ['alat tulis', 'alat makan'], ['kendaraan darat', 'kendaraan air']],
    smp: [['alat musik petik', 'alat musik tiup'], ['rempah rimpang', 'rempah biji'], ['gunung', 'danau'], ['olahraga bola', 'bela diri'], ['bangun datar', 'bangun ruang'], ['mamalia laut', 'ikan']],
    sma: [['logam', 'nonlogam'], ['besaran vektor', 'besaran skalar'], ['prosa', 'puisi lama'], ['organel sel', 'organ tubuh'], ['bilangan prima', 'bilangan komposit'], ['planet', 'satelit alami']]
  };
  Y.mKelompok = (j) => {
    const i = ri(0, KEL[j].length - 1), sisi = ri(0, 1), nb = ri(2, 4);
    return mq(`Pilih <b>semua</b> yang termasuk <b>${NAMA_KEL[j][i][sisi]}</b>.`, sample(KEL[j][i][sisi], nb), sample(KEL[j][i][1 - sisi], 6 - nb));
  };
  Y.mBaku = (j) => {
    const ps = sample(T.baku[j], 6), nb = ri(2, 4);
    return mq('Pilih <b>semua</b> penulisan kata yang <b>baku</b>.', ps.slice(0, nb).map((p) => p[0]), ps.slice(nb).map((p) => p[1]));
  };
  const prima = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  Y.mAngka = (j) => {
    for (;;) {
      let q, items, ok;
      if (j === 'sma' || (j === 'smp' && ri(0, 1))) {
        const t = pick([12, 16, 18, 20, 24, 30, 36, 40, 48, 60]), buat = (v) => pick([
          () => { const a = pick([2, 3, 4, 5, 6].filter((d) => v % d === 0 && v / d > 1).concat([1])); return a === 1 ? null : [`${a} × ${v / a}`, v]; },
          () => { const a = ri(3, v - 3); return [`${a} + ${v - a}`, v]; },
          () => { const a = ri(v + 2, v + 30); return [`${a} − ${a - v}`, v]; },
          () => { const d = ri(2, 6); return [`${v * d} : ${d}`, v]; }
        ])();
        items = []; while (items.length < 6) { const it = buat(t + (ri(0, 1) ? 0 : pick([-2, -1, 1, 2, 4]))); if (it && !items.some((x) => x[0] === it[0])) items.push(it); }
        q = `Pilih <b>semua</b> yang hasilnya <b>${t}</b>.`; ok = (x) => x[1] === t; items = items.map((x) => [x[0], ok(x)]);
      } else {
        const k = ri(3, 9), r = pick(j === 'sd' ? [['bilangan genap', (n) => n % 2 === 0], ['bilangan ganjil', (n) => n % 2 === 1], [`kelipatan ${k}`, (n) => n % k === 0]] : [['bilangan prima', prima], [`habis dibagi ${k}`, (n) => n % k === 0], ['bilangan kuadrat', (n) => Number.isInteger(Math.sqrt(n))]]);
        const ns = []; while (ns.length < 6) { const n = ri(0, 1) && r[0].indexOf('ganjil') < 0 && r[0].indexOf('genap') < 0 && r[0].indexOf('prima') < 0 ? (r[0].indexOf('kuadrat') >= 0 ? Math.pow(ri(2, 10), 2) : k * ri(2, 11)) : ri(2, j === 'sd' ? 60 : 99); if (!ns.includes(n)) ns.push(n); }
        q = `Pilih <b>semua</b> <b>${r[0]}</b>.`; items = ns.map((n) => [String(n), r[1](n)]);
      }
      const b = items.filter((x) => x[1]).map((x) => x[0]), w = items.filter((x) => !x[1]).map((x) => x[0]);
      if (b.length >= 2 && w.length >= 2) return mq(q, b, w);
    }
  };
  Y.mLogika = (j) => {
    const n = j === 'sd' ? 4 : j === 'smp' ? 5 : 6, ord = sample(NAMA, n), sf = pick([['lebih tinggi daripada', 'lebih pendek daripada'], ['lebih tua daripada', 'lebih muda daripada'], ['lebih cepat daripada', 'lebih lambat daripada']]);
    const fakta = shuffle(ord.slice(0, -1).map((x, i) => `${x} ${sf[0]} ${ord[i + 1]}.`)).join(' ');
    for (;;) {
      const b = [], w = [], seen = [];
      while (b.length + w.length < 4) {
        const p = sample(Array.from(Array(n).keys()), 2), key = Math.min(p[0], p[1]) + '-' + Math.max(p[0], p[1]);
        if (seen.includes(key) || Math.abs(p[0] - p[1]) < (n > 4 ? 2 : 1)) continue; seen.push(key);
        const pakaiLawan = ri(0, 1), benar = pakaiLawan ? p[0] > p[1] : p[0] < p[1];
        (benar ? b : w).push(`${ord[p[0]]} ${sf[pakaiLawan]} ${ord[p[1]]}`);
      }
      if (b.length && w.length) return mq(`${fakta}<br><b>Pilih semua pernyataan yang pasti benar.</b>`, b, w);
    }
  };
  Y.mPutar = (j) => {
    const n = j === 'sd' ? 3 : j === 'smp' ? 4 : 5, k = j === 'sd' ? 4 : j === 'smp' ? ri(5, 7) : ri(8, 11), c = pick(WN);
    for (;;) {
      const a = new Set(sample(Array.from(Array(n * n).keys()), k)), rot = [a], mir = [cermin(a, n)];
      for (let i = 0; i < 3; i++) { rot.push(putar90(rot[i], n)); mir.push(putar90(mir[i], n)); }
      if (new Set(rot.concat(mir).map(kset)).size < 8) continue;
      const nb = ri(1, 3);
      return mq('Pilih <b>semua</b> gambar yang sama dengan contoh, hanya diputar (bukan dicerminkan).', sample(rot.slice(1), nb).map((x) => petak(n, x, c)), sample(mir, 4 - nb).map((x) => petak(n, x, c)),
        { stim: `<div class="seq">${petak(n, a, c, 'fig besar')}</div>`, gambar: true });
    }
  };
  Y.mDaftar = (k) => {
    const w = sample(T.kataIngat, k + 4), tampil = w.slice(0, k), nb = ri(2, 4);
    return mq('Pilih <b>semua</b> kata yang tadi muncul.', sample(tampil, nb), w.slice(k).slice(0, 6 - nb), { memo: { html: `<div class="chips">${tampil.map((x) => `<span>${x}</span>`).join('')}</div>`, ms: 1500 + 800 * k, teks: 'Ingat kata-kata ini!' } });
  };
  ['sd', 'smp', 'sma'].forEach((j, x) => {
    add('kata', j, 0, [() => Y.mKelompok(j)]); add('kata', j, 1, [() => Y.mBaku(j)]); add('kata', j, 2, [() => Y.mKelompok(j), () => Y.mBaku(j)]);
    add('angka', j, 0, [() => Y.mAngka(j)]); add('angka', j, 1, [() => Y.mAngka(j)]); add('angka', j, 2, [() => Y.mAngka(j)]);
    add('akal', j, 0, [() => Y.mLogika(j)]); add('akal', j, 2, [() => Y.mLogika(j)]);
    add('pola', j, 1, [() => Y.mPutar(j)]); add('pola', j, 2, [() => Y.mPutar(j)]);
    add('ingatan', j, 1, [() => Y.mDaftar(5 + x)]); add('ingatan', j, 2, [() => Y.mDaftar(6 + x)]);
  });
  S.Y = Y;
})(typeof window !== 'undefined' ? window : globalThis);
