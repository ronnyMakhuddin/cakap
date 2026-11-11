/* CAKAP — pembangkit soal. Setiap soal: { q, stim?, memo?, choices[4], a } */
(function (root) {
  const BANK = root.CAKAP_BANK;
  const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = (a) => a[ri(0, a.length - 1)];
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = ri(0, i); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const sample = (arr, n) => shuffle(arr).slice(0, n);
  const fmt = (n) => (n < 0 ? '−' + Math.abs(n) : String(n));
  const rp = (n) => 'Rp' + n.toLocaleString('id-ID');

  // Tumpukan kartu: soal bank tidak berulang sampai semuanya keluar.
  const decks = new Map();
  function draw(arr) {
    let d = decks.get(arr);
    if (!d || !d.length) { d = shuffle(arr); decks.set(arr, d); }
    return d.pop();
  }

  function mk(q, correct, wrong, extra) {
    const ch = shuffle([correct].concat(wrong.slice(0, 3)));
    return Object.assign({ q: q, choices: ch, a: ch.indexOf(correct) }, extra || {});
  }

  function numQ(q, ans, o) {
    o = o || {};
    const step = o.step || 1, f = o.fmt || fmt;
    const out = [];
    for (const k of shuffle([1, -1, 2, -2, 3, -3, 4, 5, -5, 10, -10])) {
      const c = ans + k * step;
      if (ans >= 0 && c < 0) continue;
      if (!out.includes(c)) out.push(c);
      if (out.length === 3) break;
    }
    return mk(q, f(ans), out.map(f), o.extra);
  }

  /* ---------- ANGKA ---------- */
  const A = {
    tambah: (max) => { const a = ri(2, max), b = ri(2, max); return numQ(`${a} + ${b} = ?`, a + b); },
    kurang: (max) => { const a = ri(5, max), b = ri(1, a - 1); return numQ(`${a} − ${b} = ?`, a - b); },
    kali: (m, n) => { const a = ri(2, m), b = ri(2, n); return numQ(`${a} × ${b} = ?`, a * b); },
    bagi: (m, n) => { const b = ri(2, m), c = ri(2, n); return numQ(`${b * c} : ${b} = ?`, c); },
    isi: (max) => { const a = ri(2, max), b = ri(2, max); return numQ(`… + ${a} = ${a + b}<br><small>Bilangan yang tepat untuk mengisi titik-titik?</small>`, b); },
    deret: (t, show) => numQ(`Lanjutkan deret berikut:<br><b>${t.slice(0, show).map(fmt).join(', ')}, …</b>`, t[show]),
    deretArit: (lo, hi, turun) => {
      const neg = turun && ri(0, 1), d = ri(lo, hi) * (neg ? -1 : 1), s = neg ? ri(4 * hi + 2, 4 * hi + 40) : ri(1, 20);
      return A.deret([0, 1, 2, 3, 4].map((i) => s + i * d), 4);
    },
    urutOp: (m) => { const a = ri(2, 20), b = ri(2, m), c = ri(2, m); return numQ(`${a} + ${b} × ${c} = ?`, a + b * c); },
    kaliNeg: () => { const a = ri(2, 9), b = ri(2, 12); return numQ(`(−${a}) × ${b} = ?`, -a * b); },
    persen: () => { const p = pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]), n = ri(1, 20) * 20; return numQ(`${p}% dari ${n} = ?`, n * p / 100); },
    linear: (lo, hi) => {
      const x = ri(lo, hi), a = ri(2, 9), b = ri(1, 20);
      return numQ(`Jika ${a}x + ${b} = ${fmt(a * x + b)}, maka x = ?`, x);
    },
    kpk: () => {
      let a = ri(2, 12), b = ri(2, 12); if (a === b) b++;
      const g = (x, y) => (y ? g(y, x % y) : x);
      return numQ(`KPK dari ${a} dan ${b} = ?`, a * b / g(a, b));
    },
    fpb: () => {
      const k = ri(2, 9); let m = ri(2, 6), n = ri(2, 6); if (m === n) n++;
      const g = (x, y) => (y ? g(y, x % y) : x);
      return numQ(`FPB dari ${k * m} dan ${k * n} = ?`, g(k * m, k * n));
    },
    deretGeo: (rmax) => { const s = ri(1, 5), r = ri(2, rmax); return A.deret([0, 1, 2, 3, 4].map((i) => s * Math.pow(r, i)), 4); },
    bertingkat: () => {
      const t = [ri(1, 10)]; let d = ri(1, 5); const e = ri(1, 4);
      for (let i = 0; i < 5; i++) { t.push(t[i] + d); d += e; }
      return A.deret(t, 5);
    },
    kuadrat: () => { const k = ri(0, 4), c = ri(-3, 5); return A.deret([1, 2, 3, 4, 5].map((i) => (i + k) * (i + k) + c), 4); },
    fib: () => { const t = [ri(1, 5), ri(1, 5)]; for (let i = 2; i < 7; i++) t.push(t[i - 1] + t[i - 2]); return A.deret(t, 6); },
    selang: () => {
      const s1 = ri(1, 10), d1 = ri(2, 6), s2 = ri(20, 40), d2 = -ri(1, 5), t = [];
      for (let i = 0; i < 4; i++) { t.push(s1 + i * d1); t.push(s2 + i * d2); }
      return A.deret(t, 6);
    },
    banding: () => {
      let a = ri(1, 5), b = ri(1, 5); if (a === b) b++;
      const k = ri(2, 9) * 1000, n1 = pick(['Rani', 'Bayu', 'Sinta']), n2 = pick(['Doni', 'Tari', 'Yoga']);
      return numQ(`Perbandingan uang ${n1} dan ${n2} adalah ${a} : ${b}. Jumlah uang mereka ${rp((a + b) * k)}. Berapa uang ${n1}?`, a * k, { step: 1000, fmt: rp });
    },
    pangkat: () => { const b = ri(2, 5), e = ri(2, b === 2 ? 10 : 4); return numQ(`${b}<sup>${e}</sup> = ?`, Math.pow(b, e), { step: b }); },
    akar: () => { const n = ri(4, 25); return numQ(`√${n * n} = ?`, n); },
    persen2: () => {
      const h = ri(1, 9) * 10000, p = pick([10, 20, 25, 50]), q = pick([10, 20, 25, 50]);
      return numQ(`Harga sebuah barang ${rp(h)}. Harganya naik ${p}%, lalu turun ${q}%. Berapa harga akhirnya?`, h * (100 + p) * (100 - q) / 10000, { step: h / 100 * 5, fmt: rp });
    },
    spl: () => { const x = ri(3, 12), y = ri(1, x - 1); return numQ(`Jika x + y = ${x + y} dan x − y = ${x - y}, maka x × y = ?`, x * y); },
    log: () => { const b = ri(2, 5), e = ri(2, b === 2 ? 8 : 4); return numQ(`<sup>${b}</sup>log ${Math.pow(b, e)} = ?`, e); },
    kombinasi: () => { const n = ri(4, 12); return numQ(`Dari ${n} siswa akan dipilih 2 orang sebagai wakil kelas. Berapa banyak cara memilihnya?`, n * (n - 1) / 2); },
    rata: () => {
      const v = [ri(60, 95), ri(60, 95), ri(60, 95), ri(60, 95)], s = v.reduce((x, y) => x + y, 0);
      let e = ri(60, 90); while ((s + e) % 5) e++;
      v.push(e);
      return numQ(`Rata-rata dari ${v.join(', ')} adalah …`, (s + e) / 5);
    }
  };
  A.negatif = () => {
    const a = ri(2, 20), b = ri(2, 20);
    return pick([
      () => numQ(`${a} + (−${b}) = ?`, a - b),
      () => numQ(`${a} − (−${b}) = ?`, a + b),
      () => numQ(`(−${a}) − ${b} = ?`, -a - b),
      A.kaliNeg
    ])();
  };

  const ANGKA = {
    sd: [
      [() => A.tambah(20), () => A.kurang(20), () => A.tambah(50)],
      [() => A.kali(10, 10), () => A.bagi(9, 10), () => A.kurang(100)],
      [() => A.deretArit(2, 9, true), () => A.isi(30), () => A.urutOp(5), () => A.kali(12, 12)]
    ],
    smp: [
      [A.negatif, () => A.urutOp(12), () => A.kali(15, 12)],
      [A.persen, () => A.linear(1, 12), A.kpk, A.fpb],
      [() => A.deretGeo(3), A.bertingkat, A.banding, A.kuadrat]
    ],
    sma: [
      [A.pangkat, A.akar, () => A.linear(-9, 12), A.persen2],
      [A.fib, A.selang, A.kuadrat, () => A.deretGeo(4)],
      [A.spl, A.log, A.kombinasi, A.rata]
    ]
  };

  /* ---------- KATA ---------- */
  const K = {
    sinonim: (j) => { const it = draw(BANK[j].sinonim); return mk(`Sinonim (persamaan kata) dari<br><b>${it[0]}</b> adalah …`, it[1], it.slice(2)); },
    antonim: (j) => { const it = draw(BANK[j].antonim); return mk(`Antonim (lawan kata) dari<br><b>${it[0]}</b> adalah …`, it[1], it.slice(2)); },
    kelompok: (j) => { const it = draw(BANK[j].kelompok); return mk('Mana yang <b>tidak sekelompok</b> dengan yang lain?', it[0], it.slice(1)); },
    analogi: (j) => { const it = draw(BANK[j].analogi); return mk(`Lengkapi perbandingan kata:<br><b>${it[0]}</b>`, it[1], it.slice(2)); },
    anagram: (j) => {
      const list = BANK[j].anagram, w = draw(list);
      let s = w; for (let i = 0; i < 20 && s === w; i++) s = shuffle(w.split('')).join('');
      const wrong = sample(list.filter((x) => x !== w), 3);
      return mk(`Susun huruf acak ini menjadi kata yang benar:<br><b class="huruf">${s.split('').join(' ')}</b>`, w, wrong);
    }
  };
  const kataLevels = (j) => [
    [() => K.sinonim(j), () => K.antonim(j)],
    [() => K.kelompok(j), () => K.anagram(j)],
    [() => K.analogi(j), () => K.analogi(j), () => K.anagram(j), () => K.antonim(j)]
  ];
  const KATA = { sd: kataLevels('sd'), smp: kataLevels('smp'), sma: kataLevels('sma') };

  /* ---------- AKAL ---------- */
  const NAMA = ['Adi', 'Bima', 'Citra', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hadi', 'Indah', 'Joko', 'Kiki', 'Lala', 'Nanda', 'Putri', 'Rudi', 'Sari', 'Tono', 'Wulan'];
  const SIFAT = [
    ['lebih tinggi daripada', 'paling tinggi', 'paling pendek', 'tertinggi'],
    ['lebih tua daripada', 'paling tua', 'paling muda', 'tertua'],
    ['lebih cepat daripada', 'paling cepat', 'paling lambat', 'tercepat'],
    ['lebih berat daripada', 'paling berat', 'paling ringan', 'terberat']
  ];
  const HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const L = {
    bank: (j) => { const it = draw(BANK[j].akal); return mk(it[0], it[1], it.slice(2)); },
    urut: (n, ask) => {
      const ord = sample(NAMA, n), sf = pick(SIFAT), st = [];
      for (let i = 0; i < n - 1; i++) st.push(`${ord[i]} ${sf[0]} ${ord[i + 1]}.`);
      const mode = ask === 'k' ? pick(['max', 'min', 'k']) : pick(['max', 'min']);
      const ans = mode === 'max' ? ord[0] : mode === 'min' ? ord[n - 1] : ord[1];
      const tanya = mode === 'max' ? `Siapa yang ${sf[1]}?` : mode === 'min' ? `Siapa yang ${sf[2]}?` : `Siapa yang berada di urutan kedua ${sf[3]}?`;
      const wrong = sample(ord.filter((x) => x !== ans), 3);
      if (wrong.length < 3) wrong.push('Tidak dapat ditentukan');
      return mk(shuffle(st).join(' ') + `<br><b>${tanya}</b>`, ans, wrong);
    },
    hari: (lo, hi) => {
      const h = ri(0, 6), n = ri(lo, hi), ans = HARI[(h + n) % 7];
      return mk(`Hari ini hari ${HARI[h]}. Hari apakah ${n} hari lagi?`, ans, sample(HARI.filter((x) => x !== ans), 3));
    },
    umur: () => {
      const two = sample(NAMA, 2), b = ri(5, 15), d = ri(2, 9);
      return numQ(`${two[0]} ${d} tahun lebih tua daripada ${two[1]}. Jumlah umur mereka ${2 * b + d} tahun. Berapa umur ${two[1]}?`, b, { fmt: (n) => n + ' tahun' });
    }
  };
  const AKAL = {
    sd: [
      [() => L.urut(3), () => L.hari(2, 6)],
      [() => L.bank('sd')],
      [() => L.bank('sd'), () => L.urut(4), () => L.hari(7, 14)]
    ],
    smp: [
      [() => L.urut(4), () => L.hari(10, 60)],
      [() => L.bank('smp')],
      [() => L.bank('smp'), () => L.urut(5, 'k'), L.umur]
    ],
    sma: [
      [() => L.urut(5, 'k'), L.umur, () => L.hari(50, 365)],
      [() => L.bank('sma')],
      [() => L.bank('sma'), () => L.urut(6, 'k'), () => L.hari(100, 999)]
    ]
  };

  /* ---------- POLA (gambar SVG dibuat oleh kode) ---------- */
  const WARNA = { merah: '#e5484d', biru: '#3b82f6', hijau: '#1fa971', kuning: '#f2b100', ungu: '#8b5cf6', jingga: '#f97316' };
  const WN = Object.keys(WARNA);
  const BENTUK = ['lingkaran', 'persegi', 'segitiga', 'belah', 'bintang', 'segi6'];
  const POS = {
    1: [[32, 32]], 2: [[19, 32], [45, 32]], 3: [[32, 17], [17, 45], [47, 45]],
    4: [[18, 18], [46, 18], [18, 46], [46, 46]], 5: [[15, 15], [49, 15], [32, 32], [15, 49], [49, 49]],
    6: [[14, 20], [32, 20], [50, 20], [14, 44], [32, 44], [50, 44]]
  };
  function poly(pts) { return `<polygon points="${pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}"/>`; }
  function ngon(cx, cy, r, n, off, r2) {
    const pts = [], m = r2 ? n * 2 : n;
    for (let i = 0; i < m; i++) {
      const ang = (off + i * 360 / m) * Math.PI / 180, rr = r2 && i % 2 ? r2 : r;
      pts.push([cx + rr * Math.sin(ang), cy - rr * Math.cos(ang)]);
    }
    return poly(pts);
  }
  function bentuk(s, cx, cy, r) {
    switch (s) {
      case 'lingkaran': return `<circle cx="${cx}" cy="${cy}" r="${r * 0.9}"/>`;
      case 'persegi': return `<rect x="${cx - r * 0.82}" y="${cy - r * 0.82}" width="${r * 1.64}" height="${r * 1.64}" rx="${r * 0.12}"/>`;
      case 'segitiga': return ngon(cx, cy + r * 0.12, r * 1.05, 3, 0);
      case 'belah': return poly([[cx, cy - r], [cx + r * 0.68, cy], [cx, cy + r], [cx - r * 0.68, cy]]);
      case 'bintang': return ngon(cx, cy, r * 1.05, 5, 0, r * 0.45);
      case 'segi6': return ngon(cx, cy, r * 0.98, 6, 30);
      case 'panah': return poly([[cx, cy - r], [cx + r * 0.8, cy - r * 0.1], [cx + r * 0.3, cy - r * 0.1], [cx + r * 0.3, cy + r], [cx - r * 0.3, cy + r], [cx - r * 0.3, cy - r * 0.1], [cx - r * 0.8, cy - r * 0.1]]);
    }
    return '';
  }
  function fig(o) {
    const n = o.n || 1, r = n === 1 ? 23 : n <= 4 ? 11 : 8.5, rot = ((o.rot || 0) % 360 + 360) % 360;
    const body = POS[n].map((p) => `<g transform="rotate(${rot} ${p[0]} ${p[1]})">${bentuk(o.s, p[0], p[1], r)}</g>`).join('');
    return `<svg class="fig" viewBox="0 0 64 64" fill="${WARNA[o.c]}" stroke="#1f2440" stroke-width="2" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }
  const kunci = (o) => [o.s, o.c, ((o.rot || 0) % 360 + 360) % 360, o.n || 1].join('|');
  function figQ(q, stim, benar, salah) {
    const seen = new Set([kunci(benar)]), w = [];
    for (const o of salah) { const k = kunci(o); if (!seen.has(k)) { seen.add(k); w.push(o); } if (w.length === 3) break; }
    while (w.length < 3) { // cadangan: variasi acak
      const o = Object.assign({}, benar, pick([{ c: pick(WN) }, { s: benar.s === 'panah' ? 'panah' : pick(BENTUK) }]));
      if (!seen.has(kunci(o))) { seen.add(kunci(o)); w.push(o); }
    }
    return mk(q, fig(benar), w.map(fig), { stim: stim, gambar: true });
  }
  const baris = (figs) => `<div class="seq">${figs.map(fig).join('')}<span class="tanya">?</span></div>`;

  const P = {
    beda: (mode) => {
      let base, odd;
      if (mode === 'bentuk') { const s = sample(BENTUK, 2), c = pick(WN); base = { s: s[0], c: c }; odd = { s: s[1], c: c }; }
      else if (mode === 'warna') { const c = sample(WN, 2), s = pick(BENTUK); base = { s: s, c: c[0] }; odd = { s: s, c: c[1] }; }
      else if (mode === 'rot') { const r = ri(0, 7) * 45, c = pick(WN); base = { s: 'panah', c: c, rot: r }; odd = { s: 'panah', c: c, rot: r + pick([45, 90, -45]) }; }
      else { const n = ri(3, 5), s = pick(BENTUK), c = pick(WN); base = { s: s, c: c, n: n }; odd = { s: s, c: c, n: n + 1 }; }
      const ch = shuffle([odd, base, base, base]);
      return { q: 'Mana gambar yang <b>berbeda sendiri</b>?', choices: ch.map(fig), a: ch.indexOf(odd), gambar: true };
    },
    ulang: (p) => {
      const ss = sample(BENTUK, p), cs = sample(WN, p), unit = ss.map((s, i) => ({ s: s, c: cs[i] }));
      const len = p === 2 ? 5 : ri(5, 7), seq = []; for (let i = 0; i < len; i++) seq.push(unit[i % p]);
      const ans = unit[len % p];
      const salah = unit.filter((u) => u !== ans).concat([{ s: ans.s, c: pick(WN) }, { s: pick(BENTUK), c: ans.c }, { s: pick(BENTUK), c: pick(WN) }, { s: pick(BENTUK), c: pick(WN) }]);
      return figQ('Gambar mana yang melanjutkan pola?', baris(seq), ans, salah);
    },
    jumlah: () => {
      const s = pick(BENTUK), c = pick(WN), st = ri(1, 2), seq = [0, 1, 2].map((i) => ({ s: s, c: c, n: st + i })), a = st + 3;
      return figQ('Gambar mana yang melanjutkan pola?', baris(seq), { s: s, c: c, n: a }, shuffle([a - 1, a + 1, a - 2]).map((n) => ({ s: s, c: c, n: n })));
    },
    rotasi: (step) => {
      const c = pick(WN), st = ri(0, 7) * 45, d = step * pick([1, -1]);
      const seq = [0, 1, 2, 3].map((i) => ({ s: 'panah', c: c, rot: st + i * d })), a = st + 4 * d;
      return figQ('Panah berputar mengikuti pola. Gambar mana berikutnya?', baris(seq), { s: 'panah', c: c, rot: a }, shuffle([45, 90, 135, 180, -45, -90]).map((x) => ({ s: 'panah', c: c, rot: a + x })));
    },
    ganda: () => {
      const cs = sample(WN, 3), st = ri(0, 7) * 45, d = pick([45, 90, -45, -90]);
      const f = (i) => ({ s: 'panah', c: cs[i % 3], rot: st + i * d }), seq = [0, 1, 2, 3, 4].map(f), ans = f(5);
      return figQ('Perhatikan arah <b>dan</b> warna. Gambar mana berikutnya?', baris(seq), ans, [
        { s: 'panah', c: cs[0], rot: ans.rot }, { s: 'panah', c: ans.c, rot: ans.rot + d }, { s: 'panah', c: cs[1], rot: ans.rot - d },
        { s: 'panah', c: cs[0], rot: ans.rot + 180 }, { s: 'panah', c: ans.c, rot: ans.rot + 180 }
      ]);
    },
    ganda2: () => {
      const ss = sample(BENTUK, 2), c = pick(WN), f = (i) => ({ s: ss[i % 2], c: c, n: i + 1 }), seq = [0, 1, 2, 3].map(f), ans = f(4);
      return figQ('Perhatikan bentuk <b>dan</b> jumlah. Gambar mana berikutnya?', baris(seq), ans, [
        { s: ss[1], c: c, n: 5 }, { s: ss[0], c: c, n: 4 }, { s: ss[0], c: c, n: 6 }, { s: ss[1], c: c, n: 4 }
      ]);
    },
    matriks: (mode) => {
      const ss = sample(BENTUK, 3), cs = sample(WN, 3);
      const f = mode === 'sederhana' ? (r, c) => ({ s: ss[r], c: cs[c] })
        : mode === 'latin' ? (r, c) => ({ s: ss[(r + c) % 3], c: cs[(r + 2 * c) % 3] })
          : (r, c) => ({ s: ss[c], c: cs[(r + c) % 3], n: r + 1 });
      const mr = mode === 'sederhana' ? 2 : ri(0, 2), mc = mode === 'sederhana' ? 2 : ri(0, 2), ans = f(mr, mc);
      let cells = '';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells += r === mr && c === mc ? '<span class="tanya">?</span>' : fig(f(r, c));
      const os = ss.filter((x) => x !== ans.s), oc = cs.filter((x) => x !== ans.c);
      const salah = shuffle([
        Object.assign({}, ans, { s: os[0] }), Object.assign({}, ans, { c: oc[0] }), Object.assign({}, ans, { s: os[1], c: oc[1] }),
        Object.assign({}, ans, { s: os[1] }), Object.assign({}, ans, { c: oc[1] })
      ].concat(mode === 'tiga' ? [Object.assign({}, ans, { n: ans.n % 3 + 1 }), Object.assign({}, ans, { n: (ans.n + 1) % 3 + 1 })] : []));
      return figQ('Gambar mana yang tepat untuk mengisi kotak bertanda <b>?</b>', `<div class="mat">${cells}</div>`, ans, salah);
    }
  };
  const POLA = {
    sd: [
      [() => P.beda('bentuk'), () => P.beda('warna')],
      [() => P.ulang(2), () => P.ulang(3), P.jumlah],
      [() => P.ulang(3), P.jumlah, () => P.rotasi(90), () => P.beda('rot')]
    ],
    smp: [
      [() => P.beda('rot'), () => P.beda('jumlah'), () => P.ulang(3)],
      [() => P.rotasi(45), P.ganda2, P.jumlah],
      [() => P.matriks('sederhana'), () => P.rotasi(45), P.ganda]
    ],
    sma: [
      [P.ganda, P.ganda2, () => P.matriks('sederhana')],
      [() => P.matriks('latin'), P.ganda],
      [() => P.matriks('tiga'), () => P.matriks('latin'), P.ganda]
    ]
  };

  /* ---------- INGATAN ---------- */
  const ANGKA_CH = '0123456789'.split(''), HURUF_CH = 'ABCDEFGHJKLMNPRSTUVWXYZ'.split('');
  function ingat(len, campur, posisi) {
    const pool = campur ? ANGKA_CH.concat(HURUF_CH) : ANGKA_CH, seq = sample(pool, len);
    const tampil = (a) => `<span class="urutan">${a.join(' ')}</span>`;
    const memo = { html: `<div class="memo">${seq.map((c) => `<span>${c}</span>`).join('')}</div>`, ms: 1200 + 450 * len };
    if (posisi && ri(0, 1)) {
      const k = ri(0, len - 1);
      const wrong = sample(seq.filter((c) => c !== seq[k]), 3);
      return mk(`Karakter apa yang tadi berada di <b>urutan ke-${k + 1}</b> dari kiri?`, seq[k], wrong, { memo: memo });
    }
    const set = new Set([seq.join('')]), wrong = [];
    for (let guard = 0; wrong.length < 3 && guard < 200; guard++) {
      const m = seq.slice(), t = ri(0, 2);
      if (t === 0) { const i = ri(0, len - 2); [m[i], m[i + 1]] = [m[i + 1], m[i]]; }
      else if (t === 1) { const i = ri(0, len - 1); m[i] = pick(pool.filter((c) => !seq.includes(c))); }
      else { const i = ri(0, len - 1); let j = ri(0, len - 1); if (i === j) j = (j + 2) % len; [m[i], m[j]] = [m[j], m[i]]; }
      if (!set.has(m.join(''))) { set.add(m.join('')); wrong.push(tampil(m)); }
    }
    return mk('Urutan mana yang tadi muncul?', tampil(seq), wrong, { memo: memo });
  }
  const INGATAN = {
    sd: [[() => ingat(4)], [() => ingat(5)], [() => ingat(6, false, true)]],
    smp: [[() => ingat(6)], [() => ingat(7, false, true)], [() => ingat(7, true, true)]],
    sma: [[() => ingat(8)], [() => ingat(8, true, true)], [() => ingat(9, true, true)]]
  };

  /* ---------- API ---------- */
  const SEMUA = { angka: ANGKA, kata: KATA, akal: AKAL, pola: POLA, ingatan: INGATAN };
  function buatRonde(jenjang, kategori, level, n) {
    const gens = SEMUA[kategori][jenjang][level], out = [], seen = new Set();
    let urut = shuffle(gens);
    for (let i = 0; out.length < n; i++) {
      if (i % gens.length === 0) urut = shuffle(gens);
      let s, k, coba = 0;
      do { s = urut[i % gens.length](); k = s.q + (s.stim || '') + (s.memo ? s.memo.html : '') + (s.choices || []).join() + (s.sel || []).join(); coba++; } while (seen.has(k) && coba < 15);
      seen.add(k); out.push(s);
    }
    return out;
  }
  root.CAKAP_SOAL = { buatRonde: buatRonde, fig: fig, SEMUA: SEMUA, util: { ri: ri, pick: pick, shuffle: shuffle, sample: sample, mk: mk, numQ: numQ, fig: fig, figQ: figQ, bentuk: bentuk, draw: draw, fmt: fmt, rp: rp, A: A, K: K, L: L, P: P, ingat: ingat, WN: WN, BENTUK: BENTUK, WARNA: WARNA, NAMA: NAMA } };
})(typeof window !== 'undefined' ? window : globalThis);
