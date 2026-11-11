/* CAKAP — jenis soal tambahan + susunan level. Memperluas CAKAP_SOAL. */
(function (root) {
  const S = root.CAKAP_SOAL, U = S.util, T = root.CAKAP_BANK.tambahan;
  const { ri, pick, shuffle, sample, mk, numQ, fig, bentuk, draw, fmt, rp, A, K, L, P, ingat, WN, BENTUK, WARNA, NAMA } = U;
  const NB = { lingkaran: 'lingkaran', persegi: 'persegi', segitiga: 'segitiga', belah: 'belah ketupat', bintang: 'bintang', segi6: 'segi enam' };
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const X = {};

  /* ================= ANGKA ================= */
  const EKS = {
    sd: [
      () => { const a = ri(5, 40), b = ri(5, 40); return [`${a} + ${b}`, a + b]; },
      () => { const a = ri(20, 60), b = ri(2, 19); return [`${a} − ${b}`, a - b]; },
      () => { const a = ri(2, 10), b = ri(2, 10); return [`${a} × ${b}`, a * b]; }
    ],
    smp: [
      () => { const a = ri(6, 15), b = ri(6, 12); return [`${a} × ${b}`, a * b]; },
      () => { const a = ri(5, 30), b = ri(5, 30); return [`(−${a}) + ${b}`, b - a]; },
      () => { const a = ri(4, 15); return [`${a}<sup>2</sup>`, a * a]; }
    ],
    sma: [
      () => { const a = ri(11, 25); return [`${a}<sup>2</sup>`, a * a]; },
      () => { const e = ri(5, 11); return [`2<sup>${e}</sup>`, Math.pow(2, e)]; },
      () => { const a = ri(11, 19), b = ri(11, 19); return [`${a} × ${b}`, a * b]; }
    ]
  };
  X.bs = (j) => {
    const r = pick(EKS[j])(), t = ri(0, 1);
    return { q: `Benar atau salah?<br><b>${r[0]} = ${fmt(t ? r[1] : r[1] + pick([-10, -2, -1, 1, 2, 10]))}</b>`, choices: ['Benar', 'Salah'], a: t ? 0 : 1 };
  };
  X.banding = (j) => {
    const f = j === 'sd' ? () => pick(EKS.sd)()
      : j === 'smp' ? () => { const b = pick([2, 3, 4, 5, 6, 8, 10]), a = ri(1, b - 1); return [`<span class="pecahan"><i>${a}</i><i>${b}</i></span>`, a / b]; }
        : () => { const b = ri(2, 6), e = ri(2, b <= 3 ? 6 : 3); return [`${b}<sup>${e}</sup>`, Math.pow(b, e)]; };
    const p = f(), q = f();
    if (p[0] === q[0]) return X.banding(j);
    return { q: 'Mana yang nilainya <b>lebih besar</b>?', choices: [p[0], q[0], 'Sama besar'], a: Math.abs(p[1] - q[1]) < 1e-9 ? 2 : p[1] > q[1] ? 0 : 1 };
  };
  const kecil = (o) => fig(o).replace('class="fig"', 'class="fig kecil"');
  X.simbol = (j) => {
    const ss = sample(BENTUK, 3), cs = sample(WN, 3), f = ss.map((s, i) => kecil({ s: s, c: cs[i] }));
    const x = ri(2, 9), y = ri(2, 9), z = ri(1, 9); let rows, ans, tanya;
    if (j === 'sd') { rows = [`${f[0]} + ${f[0]} = ${2 * x}`, `${f[0]} + ${f[1]} = ${x + y}`]; ans = y; tanya = f[1]; }
    else if (j === 'smp') { rows = [`${f[0]} + ${f[0]} + ${f[0]} = ${3 * x}`, `${f[0]} + ${f[1]} = ${x + y}`, `${f[1]} + ${f[2]} + ${f[2]} = ${y + 2 * z}`]; ans = z; tanya = f[2]; }
    else { rows = [`${f[0]} × ${f[0]} = ${x * x}`, `${f[0]} × ${f[1]} = ${x * y}`, `${f[1]} + ${f[2]} × ${f[0]} = ${y + z * x}`]; ans = z; tanya = f[2]; }
    rows.push(`${tanya} = <b>?</b>`);
    return numQ('Setiap gambar mewakili satu bilangan positif. Berapa nilai gambar terakhir?', ans, { extra: { stim: `<div class="simbol">${rows.map((r) => `<div>${r}</div>`).join('')}</div>` } });
  };
  const kotak = (v) => `<span class="bx${v === '?' ? ' q' : ''}">${v}</span>`;
  const pir = (rows) => `<div class="piramida">${rows.map((r) => `<div>${r.map(kotak).join('')}</div>`).join('')}</div>`;
  X.piramida = (j) => {
    const q = 'Setiap kotak berisi jumlah dua kotak tepat di bawahnya. Berapa isi kotak bertanda <b>?</b>';
    const a = ri(1, 9), b = ri(1, 9), c = ri(1, 9), d = ri(1, 9);
    if (j === 'sd') return numQ(q, a + 2 * b + c, { extra: { stim: pir([['?'], [a + b, b + c], [a, b, c]]) } });
    if (j === 'smp') return numQ(q, b, { extra: { stim: pir([[a + 2 * b + c], ['', ''], [a, '?', c]]) } });
    return numQ(q, c, { extra: { stim: pir([[a + 3 * b + 3 * c + d], ['', ''], ['', '', ''], [a, b, '?', d]]) } });
  };
  const CERITA = {
    sd: [
      () => { const a = ri(2, 6), h = ri(4, 10) * 500, n = pick(NAMA); return numQ(`${n} membeli ${a} buku tulis. Harga satu buku ${rp(h)}. Berapa yang harus dibayar ${n}?`, a * h, { step: 500, fmt: rp }); },
      () => { const b = ri(2, 6), k = ri(2, 9); return numQ(`Ibu membagi rata ${b * k} kue kepada ${b} anak. Berapa kue yang didapat tiap anak?`, k); },
      () => { const a = ri(2, 9), b = ri(2, 6); return numQ(`Di kandang ada ${a} ayam dan ${b} kambing. Berapa jumlah kaki seluruhnya?`, 2 * a + 4 * b, { step: 2 }); },
      () => { const h = ri(5, 18) * 1000, n = pick(NAMA); return numQ(`${n} membeli jajan seharga ${rp(h)} dan membayar dengan uang ${rp(20000)}. Berapa kembaliannya?`, 20000 - h, { step: 1000, fmt: rp }); }
    ],
    smp: [
      () => { const v = ri(4, 9) * 10, t = ri(2, 5); return numQ(`Sebuah mobil melaju dengan kecepatan tetap ${v} km/jam selama ${t} jam. Berapa km jarak yang ditempuh?`, v * t, { step: 10 }); },
      () => { const h = ri(4, 20) * 10000, p = pick([10, 20, 25, 50]); return numQ(`Harga sebuah tas ${rp(h)}. Tas itu didiskon ${p}%. Berapa harga setelah diskon?`, h * (100 - p) / 100, { step: h / 20, fmt: rp }); },
      () => { const p = ri(6, 15), l = ri(2, p - 1); return numQ(`Sebuah persegi panjang berukuran panjang ${p} cm dan lebar ${l} cm. Berapa cm kelilingnya?`, 2 * (p + l), { step: 2 }); },
      () => { const k = ri(1, 5), x = ri(2, 9); return numQ(`Pada peta berskala 1 : ${(k * 100000).toLocaleString('id-ID')}, jarak dua kota ${x} cm. Berapa km jarak sebenarnya?`, k * x); },
      () => { const a = ri(3, 10) * 2, t = ri(3, 12); return numQ(`Sebuah segitiga memiliki alas ${a} cm dan tinggi ${t} cm. Berapa cm² luasnya?`, a * t / 2); }
    ],
    sma: [
      () => { const m = ri(1, 9) * 1000000, p = pick([4, 5, 6, 8, 10]), t = ri(2, 5); return numQ(`Tabungan awal ${rp(m)} mendapat bunga tunggal ${p}% per tahun. Berapa jumlah tabungan setelah ${t} tahun?`, m * (100 + p * t) / 100, { step: m / 100 * p, fmt: rp }); },
      () => { const s = ri(3, 11); return numQ(`Dua dadu dilempar bersamaan. Ada berapa kemungkinan pasangan mata dadu yang jumlahnya ${s}?`, 6 - Math.abs(s - 7)); },
      () => { const r = pick([[3, 6, 2], [4, 12, 3], [6, 12, 4], [10, 15, 6], [12, 24, 8], [20, 30, 12]]); return numQ(`Suatu pekerjaan dapat diselesaikan Andi sendirian dalam ${r[0]} hari dan Bayu sendirian dalam ${r[1]} hari. Jika bekerja bersama, berapa hari pekerjaan itu selesai?`, r[2]); },
      () => { const a = ri(2, 9), b = ri(2, 7), n = ri(8, 20); return numQ(`Barisan aritmetika memiliki suku pertama ${a} dan beda ${b}. Berapa suku ke-${n}?`, a + (n - 1) * b, { step: b }); },
      () => { const a = ri(1, 5), b = ri(2, 4), n = ri(5, 10); return numQ(`Deret aritmetika memiliki suku pertama ${a} dan beda ${b}. Berapa jumlah ${n} suku pertamanya?`, n * (2 * a + (n - 1) * b) / 2); }
    ]
  };
  X.cerita = (j) => pick(CERITA[j])();
  function jamSvg(h, m) {
    const am = m * 6, ah = (h % 12) * 30 + m * 0.5; let t = '';
    for (let i = 0; i < 12; i++) { const a = i * 30 * Math.PI / 180, s = Math.sin(a), c = Math.cos(a); t += `<line x1="${(50 + 37 * s).toFixed(1)}" y1="${(50 - 37 * c).toFixed(1)}" x2="${(50 + 43 * s).toFixed(1)}" y2="${(50 - 43 * c).toFixed(1)}" stroke-width="${i % 3 ? 1.5 : 3}"/>`; }
    return `<svg class="jam" viewBox="0 0 100 100" stroke="#1f2440" stroke-linecap="round" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="#fff" stroke-width="4"/>${t}<line x1="50" y1="50" x2="50" y2="27" stroke-width="5" transform="rotate(${ah} 50 50)"/><line x1="50" y1="50" x2="50" y2="14" stroke-width="3" stroke="#e5484d" transform="rotate(${am} 50 50)"/><circle cx="50" cy="50" r="4" fill="#1f2440"/></svg>`;
  }
  const pukul = (h, m) => String(((h - 1) % 12 + 12) % 12 + 1).padStart(2, '0') + '.' + String(m).padStart(2, '0');
  X.jam = (mode) => {
    const h = ri(1, 12);
    if (mode === 'baca' || mode === 'tambah') {
      const m = pick(mode === 'baca' ? [0, 30] : [0, 15, 30, 45]), d = mode === 'baca' ? 0 : pick([20, 30, 45, 50, 75, 90]);
      const tot = h * 60 + m + d, ans = pukul(Math.floor(tot / 60), tot % 60), w = [];
      for (const e of shuffle([60, -60, 30, -30, 90, 15, -15, 120])) { const t = tot + e + 720, s = pukul(Math.floor(t / 60), t % 60); if (s !== ans && !w.includes(s)) w.push(s); if (w.length === 3) break; }
      return mk(d ? `Perhatikan jam ini. Pukul berapa <b>${d} menit kemudian</b>?` : 'Jam ini menunjukkan pukul berapa?', ans, w, { stim: jamSvg(h, m) });
    }
    const m = pick(mode === 'sudut30' ? [0, 30] : [0, 10, 20, 30, 40, 50]); let s = Math.abs(30 * (h % 12) - 5.5 * m); if (s > 180) s = 360 - s;
    return numQ(`Berapa besar sudut terkecil antara jarum pendek dan jarum panjang pada pukul <b>${pukul(h, m)}</b>?`, s, { step: 5, fmt: (n) => n + '°', extra: { stim: jamSvg(h, m) } });
  };

  /* ================= KATA ================= */
  X.peribahasa = (j) => { const it = draw(T.peribahasa[j]); return mk(`Lengkapi peribahasa berikut:<br><b>${it[0]}</b>`, it[1], it.slice(2)); };
  X.arti = () => { const it = draw(T.arti); return mk(`Arti peribahasa<br><b>“${it[0]}”</b> adalah …`, it[1], sample(T.arti.filter((x) => x !== it), 3).map((x) => x[1])); };
  X.baku = (j) => { const it = draw(T.baku[j]), ch = shuffle(it); return { q: 'Mana penulisan kata yang <b>baku</b>?', choices: ch, a: ch.indexOf(it[0]) }; };
  X.kelas = (j) => {
    const kl = T.kelas[j], jenis = pick(Object.keys(kl)), lain = Object.keys(kl).filter((x) => x !== jenis);
    return mk(`Mana yang termasuk <b>kata ${jenis}</b>?`, pick(kl[jenis]), sample(kl[lain[0]].concat(kl[lain[1]]), 3));
  };
  X.majas = () => {
    const it = draw(T.majas), semua = T.majas.map((x) => x[1]).filter((x, i, a) => a.indexOf(x) === i);
    return mk(`Majas apa yang digunakan dalam kalimat ini?<br><b>“${it[0]}”</b>`, it[1], sample(semua.filter((x) => x !== it[1]), 3));
  };

  /* ================= AKAL ================= */
  const geser = (w, k) => w.split('').map((c) => String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65)).join('');
  X.sandi = (j) => {
    const w2 = sample(T.sandi, 2), k = j === 'sd' ? 1 : j === 'smp' ? pick([1, 2, -1]) : pick([2, 3, -2, -3]);
    const ans = geser(w2[1], k), w = [];
    for (const c of shuffle([geser(w2[1], k + 1), geser(w2[1], -k), geser(w2[1], k - 1 || 5), ans.slice(1) + ans[0], ans.split('').reverse().join('')])) {
      if (c !== ans && c !== w2[1] && !w.includes(c)) w.push(c); if (w.length === 3) break;
    }
    return mk(`Dalam sebuah sandi, <b>${w2[0]}</b> ditulis <b>${geser(w2[0], k)}</b>. Dengan sandi yang sama, <b>${w2[1]}</b> ditulis …`, ans, w);
  };
  const MA = ['utara', 'timur', 'selatan', 'barat'];
  X.arah = (j) => {
    const n = pick(NAMA);
    if (j === 'sd') {
      const s = ri(0, 3), t = pick([['berputar ke kanan satu kali (seperempat putaran)', 1], ['berputar ke kiri satu kali (seperempat putaran)', 3], ['berbalik arah', 2]]), ans = MA[(s + t[1]) % 4];
      return mk(`${n} menghadap ke ${MA[s]}, lalu ${t[0]}. Sekarang ${n} menghadap ke mana?`, cap(ans), MA.filter((x) => x !== ans).map(cap));
    }
    if (j === 'smp') {
      const a = ri(2, 9), b = ri(2, 9), c = ri(1, 12), v = pick([1, -1]), hz = pick([1, -1]), dy = v * (a - c);
      const ans = dy === 0 ? (hz > 0 ? 'timur' : 'barat') : dy > 0 ? (hz > 0 ? 'timur laut' : 'barat laut') : (hz > 0 ? 'tenggara' : 'barat daya');
      const semua = ['utara', 'timur laut', 'timur', 'tenggara', 'selatan', 'barat daya', 'barat', 'barat laut'];
      return mk(`${n} berjalan ${a} m ke ${v > 0 ? 'utara' : 'selatan'}, lalu ${b} m ke ${hz > 0 ? 'timur' : 'barat'}, kemudian ${c} m ke ${v > 0 ? 'selatan' : 'utara'}. Di arah mana posisi ${n} sekarang dari titik awal?`, cap(ans), sample(semua.filter((x) => x !== ans), 3).map(cap));
    }
    const tr = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]), e = ri(1, 6);
    return numQ(`${n} berjalan ${tr[0] + e} m ke utara, ${tr[1]} m ke timur, lalu ${e} m ke selatan. Berapa meter jarak lurus ${n} dari titik awal?`, tr[2], { fmt: (x) => x + ' m' });
  };
  X.keluarga = () => { const it = draw(T.keluarga); return mk(it[0], it[1], it.slice(2)); };

  /* ================= POLA ================= */
  function petakSvg(n, cells, c, kelas) {
    const s = 60 / n; let o = '';
    for (let i = 0; i < n * n; i++) o += `<rect x="${(2 + (i % n) * s).toFixed(1)}" y="${(2 + Math.floor(i / n) * s).toFixed(1)}" width="${s}" height="${s}" fill="${cells.has(i) ? WARNA[c] : '#fff'}"/>`;
    return `<svg class="${kelas || 'fig'}" viewBox="0 0 64 64" stroke="#1f2440" stroke-width="1.5" aria-hidden="true">${o}</svg>`;
  }
  const TR = {
    asli: (r, c) => [r, c], cermin: (r, c, n) => [r, n - 1 - c], balik: (r, c, n) => [n - 1 - r, c],
    p90: (r, c, n) => [c, n - 1 - r], p180: (r, c, n) => [n - 1 - r, n - 1 - c], p270: (r, c, n) => [n - 1 - c, r]
  };
  const ubah = (cells, n, t) => new Set(Array.from(cells).map((i) => { const p = TR[t](Math.floor(i / n), i % n, n); return p[0] * n + p[1]; }));
  const kset = (s) => Array.from(s).sort((a, b) => a - b).join();
  X.transform = (j, mode) => {
    const n = j === 'sd' ? 3 : j === 'smp' ? 4 : 5, k = j === 'sd' ? ri(3, 4) : j === 'smp' ? ri(5, 7) : ri(8, 11), c = pick(WN);
    for (let t = 0; t < 300; t++) {
      const cells = new Set(sample(Array.from(Array(n * n).keys()), k)), v = {};
      Object.keys(TR).forEach((key) => { v[key] = ubah(cells, n, key); });
      if (new Set(Object.keys(v).map((x) => kset(v[x]))).size < 6) continue;
      const benar = mode === 'cermin' ? 'cermin' : 'p90', salah = sample(Object.keys(TR).filter((x) => x !== benar), 3);
      return mk(mode === 'cermin' ? 'Jika gambar ini <b>dicerminkan</b> ke samping (kiri ↔ kanan), hasilnya …' : 'Jika gambar ini <b>diputar seperempat putaran searah jarum jam</b>, hasilnya …',
        petakSvg(n, v[benar], c), salah.map((x) => petakSvg(n, v[x], c)), { stim: `<div class="seq">${petakSvg(n, cells, c, 'fig besar')}</div>`, gambar: true });
    }
    return X.transform(j, mode);
  };
  X.hitung = (j) => {
    const m = j === 'sd' ? ri(6, 9) : j === 'smp' ? ri(10, 13) : ri(14, 18), ss = sample(BENTUK, 3), cs = sample(WN, j === 'sd' ? 1 : 3);
    const items = sample(Array.from(Array(24).keys()), m).map((i) => ({ x: 20 + (i % 8) * 37 + ri(-5, 5), y: 20 + Math.floor(i / 8) * 40 + ri(-5, 5), s: pick(ss), c: pick(cs), rot: ri(0, 11) * 30 }));
    const t = pick(items), w = j !== 'sd', cnt = items.filter((o) => o.s === t.s && (!w || o.c === t.c)).length;
    const svg = `<svg class="sebar" viewBox="0 0 300 120" stroke="#1f2440" stroke-width="2" stroke-linejoin="round" aria-hidden="true">${items.map((o) => `<g fill="${WARNA[o.c]}" transform="rotate(${o.rot} ${o.x} ${o.y})">${bentuk(o.s, o.x, o.y, 13)}</g>`).join('')}</svg>`;
    return numQ(`Ada berapa <b>${NB[t.s]}${w ? ' ' + t.c : ''}</b> pada gambar?`, cnt, { extra: { stim: svg } });
  };
  X.kubus = (j) => {
    const W = j === 'sd' ? 2 : 3, D = j === 'sma' ? 3 : 2, H = j === 'sd' ? 2 : 3, a = 18, c = WARNA[pick(WN)], h = []; let tot = 0, o = '';
    for (let x = 0; x < W; x++) {
      h.push([]);
      for (let y = 0; y < D; y++) { let v = x + y === 0 ? ri(Math.max(1, H - 1), H) : ri(0, H); if (x) v = Math.min(v, h[x - 1][y]); if (y) v = Math.min(v, h[x][y - 1]); h[x].push(v); tot += v; }
    }
    if (tot < 3) return X.kubus(j);
    const pt = (p) => p.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ');
    for (let x = 0; x < W; x++) for (let y = 0; y < D; y++) for (let z = 0; z < h[x][y]; z++) {
      const sx = 80 + (x - y) * a, sy = (H - 1) * a + 6 + (x + y) * a / 2 - z * a;
      o += `<polygon fill="${c}" points="${pt([[sx - a, sy + a / 2], [sx, sy + a], [sx, sy + 2 * a], [sx - a, sy + 1.5 * a]])}"/>`
        + `<polygon fill="${c}" fill-opacity=".7" points="${pt([[sx, sy + a], [sx + a, sy + a / 2], [sx + a, sy + 1.5 * a], [sx, sy + 2 * a]])}"/>`
        + `<polygon fill="${c}" fill-opacity=".35" points="${pt([[sx, sy], [sx + a, sy + a / 2], [sx, sy + a], [sx - a, sy + a / 2]])}"/>`;
    }
    const svg = `<svg class="kubus" viewBox="0 0 160 ${H * a + (W + D) * a / 2 + 16}" stroke="#1f2440" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">${o}</svg>`;
    return numQ('Berapa jumlah kubus pada tumpukan ini?<br><small>Kubus yang tertutup kubus lain tetap dihitung.</small>', tot, { extra: { stim: svg } });
  };

  /* ================= INGATAN ================= */
  X.petak = (n, k) => {
    const sel = sample(Array.from(Array(n * n).keys()), k);
    const html = `<div class="petak" style="--n:${n}">${Array.from(Array(n * n).keys()).map((i) => `<span class="${sel.includes(i) ? 'nyala' : ''}"></span>`).join('')}</div>`;
    return { tipe: 'grid', q: `Ketuk <b>${k} petak</b> yang tadi menyala!`, n: n, sel: sel, memo: { html: html, ms: 1400 + 330 * k, teks: 'Ingat petak yang menyala!' } };
  };
  X.warna = (k) => {
    const ss = sample(BENTUK, k), cs = sample(WN, k), i = ri(0, k - 1);
    const memo = { html: `<div class="seq">${ss.map((s, x) => fig({ s: s, c: cs[x] })).join('')}</div>`, ms: 1400 + 700 * k, teks: 'Ingat bentuk dan warnanya!' };
    if (ri(0, 1)) return mk(`Apa warna <b>${NB[ss[i]]}</b> tadi?`, cap(cs[i]), sample(WN.filter((c) => c !== cs[i]), 3).map(cap), { memo: memo });
    return mk(`Bentuk apa yang tadi berwarna <b>${cs[i]}</b>?`, cap(NB[ss[i]]), sample(BENTUK.filter((s) => s !== ss[i]), 3).map((s) => cap(NB[s])), { memo: memo });
  };
  X.daftar = (k) => {
    const w = sample(T.kataIngat, k + 1), tampil = w.slice(0, k);
    return mk('Kata mana yang <b>tidak</b> muncul tadi?', w[k], sample(tampil, 3), { memo: { html: `<div class="chips">${tampil.map((x) => `<span>${x}</span>`).join('')}</div>`, ms: 1500 + 800 * k, teks: 'Ingat kata-kata ini!' } });
  };

  /* ================= SUSUNAN LEVEL ================= */
  const g = S.SEMUA;
  g.angka = {
    sd: [
      [() => A.tambah(20), () => A.kurang(20), () => X.bs('sd'), () => X.banding('sd'), () => X.jam('baca')],
      [() => A.kali(10, 10), () => A.bagi(9, 10), () => X.simbol('sd'), () => X.cerita('sd'), () => X.bs('sd')],
      [() => A.deretArit(2, 9, true), () => A.isi(30), () => X.piramida('sd'), () => X.cerita('sd'), () => X.jam('tambah'), () => A.urutOp(5)]
    ],
    smp: [
      [A.negatif, () => A.urutOp(12), () => X.bs('smp'), () => X.banding('smp'), () => A.kali(15, 12)],
      [A.persen, () => A.linear(1, 12), A.kpk, A.fpb, () => X.simbol('smp'), () => X.cerita('smp')],
      [() => A.deretGeo(3), A.bertingkat, A.banding, A.kuadrat, () => X.piramida('smp'), () => X.jam('sudut30'), () => X.cerita('smp')]
    ],
    sma: [
      [A.pangkat, A.akar, () => A.linear(-9, 12), () => X.bs('sma'), () => X.banding('sma')],
      [A.fib, A.selang, A.kuadrat, () => X.simbol('sma'), () => X.cerita('sma'), A.persen2],
      [A.spl, A.log, A.kombinasi, A.rata, () => X.piramida('sma'), () => X.jam('sudut'), () => X.cerita('sma')]
    ]
  };
  const kata = (j) => [
    [() => K.sinonim(j), () => K.antonim(j), () => X.baku(j), j === 'sma' ? X.majas : () => X.kelas(j)],
    [() => K.kelompok(j), () => K.anagram(j), j === 'sma' ? X.arti : () => X.peribahasa(j), () => X.baku(j)],
    [() => K.analogi(j), () => K.anagram(j), j === 'sma' ? X.arti : () => X.peribahasa(j), j === 'sma' ? X.majas : () => X.kelas(j), () => K.antonim(j)]
  ];
  g.kata = { sd: kata('sd'), smp: kata('smp'), sma: kata('sma') };
  g.akal = {
    sd: [
      [() => L.urut(3), () => L.hari(2, 6), () => X.arah('sd')],
      [() => L.bank('sd'), () => X.sandi('sd'), () => X.arah('sd')],
      [() => L.bank('sd'), () => L.urut(4), () => L.hari(7, 14), X.keluarga, () => X.sandi('sd')]
    ],
    smp: [
      [() => L.urut(4), () => L.hari(10, 60), () => X.arah('smp'), X.keluarga],
      [() => L.bank('smp'), () => X.sandi('smp'), () => X.arah('smp')],
      [() => L.bank('smp'), () => L.urut(5, 'k'), L.umur, () => X.sandi('smp')]
    ],
    sma: [
      [() => L.urut(5, 'k'), L.umur, () => L.hari(50, 365), () => X.arah('sma')],
      [() => L.bank('sma'), () => X.sandi('sma'), () => X.arah('sma')],
      [() => L.bank('sma'), () => L.urut(6, 'k'), () => L.hari(100, 999), () => X.sandi('sma'), () => X.arah('sma')]
    ]
  };
  g.pola = {
    sd: [
      [() => P.beda('bentuk'), () => P.beda('warna'), () => X.hitung('sd')],
      [() => P.ulang(2), () => P.ulang(3), P.jumlah, () => X.kubus('sd'), () => X.hitung('sd')],
      [() => P.ulang(3), () => P.rotasi(90), () => P.beda('rot'), () => X.transform('sd', 'cermin'), () => X.kubus('sd')]
    ],
    smp: [
      [() => P.beda('rot'), () => P.beda('jumlah'), () => P.ulang(3), () => X.hitung('smp')],
      [() => P.rotasi(45), P.ganda2, () => X.transform('smp', 'cermin'), () => X.kubus('smp')],
      [() => P.matriks('sederhana'), P.ganda, () => X.transform('smp', 'putar'), () => X.kubus('smp'), () => X.transform('smp', 'cermin')]
    ],
    sma: [
      [P.ganda, P.ganda2, () => P.matriks('sederhana'), () => X.hitung('sma'), () => X.transform('sma', 'cermin')],
      [() => P.matriks('latin'), P.ganda, () => X.transform('sma', 'putar'), () => X.kubus('sma')],
      [() => P.matriks('tiga'), () => P.matriks('latin'), () => X.transform('sma', 'putar'), () => X.transform('sma', 'cermin'), () => X.kubus('sma')]
    ]
  };
  g.ingatan = {
    sd: [
      [() => ingat(4), () => X.petak(3, 3), () => X.warna(3)],
      [() => ingat(5), () => X.petak(3, 4), () => X.daftar(4), () => X.warna(3)],
      [() => ingat(6, false, true), () => X.petak(4, 5), () => X.daftar(5), () => X.warna(4)]
    ],
    smp: [
      [() => ingat(6), () => X.petak(4, 5), () => X.warna(4)],
      [() => ingat(7, false, true), () => X.petak(4, 6), () => X.daftar(6), () => X.warna(4)],
      [() => ingat(7, true, true), () => X.petak(5, 7), () => X.daftar(7), () => X.warna(5)]
    ],
    sma: [
      [() => ingat(8), () => X.petak(4, 6), () => X.warna(5)],
      [() => ingat(8, true, true), () => X.petak(5, 8), () => X.daftar(7), () => X.warna(5)],
      [() => ingat(9, true, true), () => X.petak(5, 9), () => X.daftar(8), () => X.warna(6)]
    ]
  };

  /* Tantangan Kilat: campuran semua kategori */
  S.buatKilat = (j, n) => {
    const ks = Object.keys(g), out = [];
    for (let i = 0; i < n; i++) { const k = ks[i % ks.length], s = pick(g[k][j][ri(0, 2)])(); s.k = k; out.push(s); }
    return shuffle(out);
  };
})(typeof window !== 'undefined' ? window : globalThis);
