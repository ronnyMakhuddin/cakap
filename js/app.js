/* CAKAP — antarmuka permainan */
(function () {
  const S = window.CAKAP_SOAL, app = document.getElementById('app'), body = document.body;
  const TENANG = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const JML_SOAL = 8, JML_KILAT = 10;
  const JENJANG = {
    sd: { nama: 'SD', ket: 'Sekolah Dasar', waktu: 30 },
    smp: { nama: 'SMP', ket: 'Sekolah Menengah Pertama', waktu: 25 },
    sma: { nama: 'SMA', ket: 'SMA / SMK / MA', waktu: 22 }
  };
  const KAT = {
    angka: { nama: 'Angka', ik: '7', w: 'var(--angka)', ket: 'Deret, kotak ajaib, operasi rahasia, simbol', plus: 10 },
    kata: { nama: 'Kata', ik: 'Aa', w: 'var(--kata)', ket: 'Analogi, penyusup, deret huruf, susun huruf', plus: 0 },
    akal: { nama: 'Akal', ik: '?', w: 'var(--akal)', ket: 'Penalaran, sandi, sudoku mini, siapa jujur', plus: 25 },
    pola: { nama: 'Pola', ik: '◆', w: 'var(--pola)', ket: 'Matriks, jaring kubus, lipat kertas, putaran', plus: 15 },
    ingatan: { nama: 'Ingatan', ik: '∞', w: 'var(--ingatan)', ket: 'Urutan menyala, petak, warna, daftar kata', plus: 0 }
  };
  const NAMA_LV = ['Mudah', 'Sedang', 'Sulit'];
  const GELAR = [[0, 'Pemula'], [6, 'Penjelajah'], [15, 'Pemikir'], [25, 'Cendekia'], [36, 'Ahli'], [45, 'Mahaguru']];

  /* ---------- simpanan kemajuan (per peramban) ---------- */
  let data = { b: {}, s: {}, kilat: {}, suara: true, j: 'sd' };
  try { const d = JSON.parse(localStorage.getItem('cakap-v1')); if (d && d.b) data = Object.assign(data, d); } catch (e) { /* abaikan */ }
  if (!JENJANG[data.j]) data.j = 'sd';
  const simpan = () => { try { localStorage.setItem('cakap-v1', JSON.stringify(data)); } catch (e) { /* abaikan */ } };
  const kunci = (j, k, l) => j + '-' + k + '-' + l;
  const bintang = (j, k, l) => data.b[kunci(j, k, l)] || 0;
  const terbuka = (j, k, l) => l === 0 || bintang(j, k, l - 1) > 0;
  const bintangKat = (j, k) => bintang(j, k, 0) + bintang(j, k, 1) + bintang(j, k, 2);
  const totalBintang = (j) => Object.keys(KAT).reduce((t, k) => t + bintangKat(j, k), 0);
  const gelar = (j) => { const t = totalBintang(j); let g = GELAR[0][1]; GELAR.forEach((x) => { if (t >= x[0]) g = x[1]; }); return g; };
  const gbBintang = (n) => '★'.repeat(n) + '<i>' + '★'.repeat(3 - n) + '</i>';

  /* ---------- suara ---------- */
  let ac = null;
  function nada(f, d, t, tipe) {
    if (!data.suara) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain(), w = ac.currentTime + (t || 0);
      o.type = tipe || 'triangle'; o.frequency.value = f; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.12, w); g.gain.exponentialRampToValueAtTime(0.001, w + d);
      o.start(w); o.stop(w + d);
    } catch (e) { /* abaikan */ }
  }
  const bunyiBenar = (n) => { const b = 620 + Math.min(n, 6) * 40; nada(b, 0.12); nada(b * 1.33, 0.2, 0.09); };
  const bunyiSalah = () => { nada(190, 0.28, 0, 'sawtooth'); };
  const bunyiKetuk = () => nada(520, 0.06);

  /* ---------- latar beranimasi + konfeti ---------- */
  const cv = document.getElementById('latar'), cx = cv.getContext('2d');
  const WARNA_LATAR = ['#ffffff', '#ffc93c', '#7dd3fc', '#f9a8d4', '#86efac', '#c4b5fd'];
  let LW = 0, LH = 0, benda = [], konf = [];
  function ukur() {
    const r = Math.min(window.devicePixelRatio || 1, 2);
    LW = window.innerWidth; LH = window.innerHeight; cv.width = LW * r; cv.height = LH * r; cx.setTransform(r, 0, 0, r, 0, 0);
    const n = Math.round(Math.min(34, Math.max(14, LW * LH / 38000)));
    benda = Array.from({ length: n }, () => ({
      x: Math.random() * LW, y: Math.random() * LH, r: 10 + Math.random() * 30, t: Math.floor(Math.random() * 6),
      vx: (Math.random() - 0.5) * 0.25, vy: -0.12 - Math.random() * 0.35, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.008,
      c: WARNA_LATAR[Math.floor(Math.random() * WARNA_LATAR.length)], a: 0.07 + Math.random() * 0.13, isi: Math.random() < 0.55
    }));
  }
  function jalur(t, r) {
    cx.beginPath();
    if (t === 0) cx.arc(0, 0, r, 0, 6.2832);
    else if (t === 1) cx.rect(-r * 0.85, -r * 0.85, r * 1.7, r * 1.7);
    else if (t === 5) { cx.moveTo(-r, -r * 0.3); cx.lineTo(-r * 0.3, -r * 0.3); cx.lineTo(-r * 0.3, -r); cx.lineTo(r * 0.3, -r); cx.lineTo(r * 0.3, -r * 0.3); cx.lineTo(r, -r * 0.3); cx.lineTo(r, r * 0.3); cx.lineTo(r * 0.3, r * 0.3); cx.lineTo(r * 0.3, r); cx.lineTo(-r * 0.3, r); cx.lineTo(-r * 0.3, r * 0.3); cx.lineTo(-r, r * 0.3); cx.closePath(); }
    else {
      const n = t === 2 ? 3 : t === 3 ? 6 : 10;
      for (let i = 0; i < n; i++) { const a = i * 6.2832 / n - 1.5708, rr = t === 4 && i % 2 ? r * 0.45 : r; cx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * rr, Math.sin(a) * rr); }
      cx.closePath();
    }
  }
  function gambarLatar() {
    cx.clearRect(0, 0, LW, LH);
    for (const b of benda) {
      b.x += b.vx; b.y += b.vy; b.rot += b.vr;
      if (b.y < -60) { b.y = LH + 60; b.x = Math.random() * LW; }
      if (b.x < -60) b.x = LW + 60; else if (b.x > LW + 60) b.x = -60;
      cx.save(); cx.translate(b.x, b.y); cx.rotate(b.rot); cx.globalAlpha = b.a; jalur(b.t, b.r);
      if (b.isi) { cx.fillStyle = b.c; cx.fill(); } else { cx.strokeStyle = b.c; cx.lineWidth = 3; cx.stroke(); }
      cx.restore();
    }
    for (let i = konf.length - 1; i >= 0; i--) {
      const p = konf[i]; p.vy += 0.16; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.h--;
      if (p.h <= 0 || p.y > LH + 30) { konf.splice(i, 1); continue; }
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot); cx.globalAlpha = Math.min(1, p.h / 40); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore();
    }
  }
  function putar() { gambarLatar(); requestAnimationFrame(putar); }
  function konfeti(n) {
    if (TENANG) return;
    const w = ['#ffc93c', '#f97316', '#3b82f6', '#8b5cf6', '#1fa971', '#e5484d', '#ffffff'];
    for (let i = 0; i < n; i++) konf.push({ x: LW / 2 + (Math.random() - 0.5) * 120, y: LH * 0.3, vx: (Math.random() - 0.5) * 13, vy: -4 - Math.random() * 10, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, s: 7 + Math.random() * 8, c: w[i % w.length], h: 130 + Math.random() * 60 });
  }
  ukur(); window.addEventListener('resize', ukur);
  if (TENANG) gambarLatar(); else putar();

  /* ---------- maskot orisinal: Kiko si percik ide ---------- */
  function maskot(rasa) {
    const mulut = rasa === 'sedih' ? '<path d="M48 80 Q60 71 72 80" fill="none"/>' : rasa === 'girang' ? '<path d="M44 72 Q60 96 76 72 Z" fill="#7a1f3d"/>' : '<path d="M46 74 Q60 88 74 74" fill="none"/>';
    return `<svg class="maskot" viewBox="0 0 120 120" stroke="#1f2440" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Kiko, maskot CAKAP">
      <g class="antena"><path d="M60 26 Q58 14 66 9" fill="none"/><path d="M66 1 l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" fill="#ffc93c"/></g>
      <path d="M22 66 Q10 60 12 48" fill="none"/><path d="M98 66 Q110 60 108 48" fill="none"/>
      <path d="M60 24 C92 24 100 50 98 70 C96 96 80 108 60 108 C40 108 24 96 22 70 C20 50 28 24 60 24 Z" fill="#5eead4"/>
      <ellipse cx="60" cy="92" rx="20" ry="9" fill="#ffffff" fill-opacity=".45" stroke="none"/>
      <g class="mata"><ellipse cx="45" cy="56" rx="9" ry="11" fill="#fff"/><ellipse cx="75" cy="56" rx="9" ry="11" fill="#fff"/>
      <circle cx="47" cy="58" r="4.5" fill="#1f2440" stroke="none"/><circle cx="77" cy="58" r="4.5" fill="#1f2440" stroke="none"/></g>
      <circle cx="33" cy="72" r="5" fill="#fb7185" fill-opacity=".7" stroke="none"/><circle cx="87" cy="72" r="5" fill="#fb7185" fill-opacity=".7" stroke="none"/>
      ${mulut}</svg>`;
  }

  /* ---------- keadaan ---------- */
  let st = null, timer = null, tunda = null;
  function bersih() { clearInterval(timer); clearTimeout(tunda); timer = tunda = null; }
  function tema(k, pentas) { if (k) body.style.setProperty('--tema', KAT[k] ? KAT[k].w : 'var(--kilat)'); else body.style.removeProperty('--tema'); window.CAKAP_PENTAS(pentas || k || null); }
  function layar(html) { app.innerHTML = `<div class="layar">${html}</div>`; window.scrollTo(0, 0); }
  const tbSuara = () => `<button class="tb kecil" data-aksi="suara" aria-label="Suara hidup/mati">${data.suara ? '🔊' : '🔇'}</button>`;

  function beranda() {
    bersih(); st = null; tema(null);
    const j = data.j;
    layar(`
      <div class="atas"><span class="spasi"></span>${tbSuara()}</div>
      <header class="hero">
        ${maskot('girang')}
        <div><h1 class="logo" aria-label="CAKAP"><span>C</span><span>A</span><span>K</span><span>A</span><span>P</span></h1></div>
        <p class="slogan">Cerdas Angka, Kata, Akal, dan Pola</p>
        <p class="sub">Asah otakmu bersama Kiko — seru, cepat, dan bikin penasaran!</p>
        <div><div class="seg" role="group" aria-label="Pilih jenjang">
          ${Object.keys(JENJANG).map((x) => `<button data-aksi="pilihJenjang" data-j="${x}" aria-pressed="${x === j}">${JENJANG[x].nama}</button>`).join('')}
        </div></div>
        <p class="seg-ket">${JENJANG[j].ket}</p>
        <div class="cta">
          <button class="tb utama besar" data-aksi="jenjang" data-j="${j}">▶ Mulai Main</button>
          <button class="tb besar" data-aksi="kilat" data-j="${j}">⚡ Tantangan Kilat</button>
        </div>
        <div class="statistik">
          <div><b>★ ${totalBintang(j)}/45</b><span>Bintang</span></div>
          <div><b>${gelar(j)}</b><span>Gelar</span></div>
          <div><b>${data.kilat[j] || 0}</b><span>Rekor kilat</span></div>
        </div>
      </header>
      <h2 class="judul-bagian">Lima arena latihan</h2>
      <div class="arena">
        ${Object.keys(KAT).map((k) => `<button data-aksi="jenjang" data-j="${j}" style="--w:${KAT[k].w}"><span class="ik" aria-hidden="true">${KAT[k].ik}</span>${KAT[k].nama}</button>`).join('')}
      </div>
      <h2 class="judul-bagian">Cara bermain</h2>
      <div class="cara">
        <div><b>1 · Pilih arena</b>Tiap arena punya level Mudah, Sedang, dan Sulit dengan jenis soal yang berganti-ganti.</div>
        <div><b>2 · Jawab cepat</b>Makin cepat makin besar poinnya. Sebagian soal punya lebih dari satu jawaban benar — pilih semuanya!</div>
        <div><b>3 · Raih bintang</b>5 benar = ★, 7 benar = ★★, 8 benar = ★★★. Kumpulkan 45 bintang untuk gelar Mahaguru!</div>
      </div>
      <p class="kaki">Kemajuan tersimpan di perangkat ini · CAKAP</p>`);
  }

  function menu(j) {
    bersih(); st = null; tema(null); data.j = j; simpan();
    layar(`
      <div class="atas"><button class="tb kecil" data-aksi="beranda">← Beranda</button><span class="spasi"></span>
        <span>${JENJANG[j].nama} · ${gelar(j)} · ★ ${totalBintang(j)}/45</span>${tbSuara()}</div>
      <div class="kat">
        <section class="kartu kilat" style="--w:var(--kilat)">
          <div class="ik" aria-hidden="true">⚡</div>
          <div><h3>Tantangan Kilat</h3><p>10 soal campuran dari semua arena · rekor ${data.kilat[j] || 0}</p></div>
          <button class="tb gelap" data-aksi="kilat" data-j="${j}">Main</button>
        </section>
        ${Object.keys(KAT).map((k) => `<section class="kartu" style="--w:${KAT[k].w}">
          <div class="ik" aria-hidden="true">${KAT[k].ik}</div>
          <div><h3>${KAT[k].nama}</h3><p>${KAT[k].ket}</p></div>
          <div class="maju"><i style="width:${bintangKat(j, k) / 9 * 100}%"></i></div>
          <div class="lvs">${[0, 1, 2].map((l) => `<button class="lv" data-aksi="main" data-j="${j}" data-k="${k}" data-l="${l}" ${terbuka(j, k, l) ? '' : 'disabled title="Raih minimal 1 bintang di level sebelumnya"'}>
            ${terbuka(j, k, l) ? '' : '🔒 '}${NAMA_LV[l]}<span class="bt">${gbBintang(bintang(j, k, l))}</span></button>`).join('')}</div>
        </section>`).join('')}
      </div>`);
  }

  function mulai(j, k, l) {
    bersih();
    const kilat = k === 'kilat';
    st = {
      j: j, k: k, l: l, kilat: kilat, soal: kilat ? S.buatKilat(j, JML_KILAT) : S.buatRonde(j, k, l, JML_SOAL),
      i: 0, benar: 0, skor: 0, runtun: 0, runtunMaks: 0, riwayat: [], kunci: true
    };
    st.n = st.soal.length;
    tema(kilat ? 'kilat' : k);
    let c = 3;
    const tik = () => {
      if (c === 0) return tampilSoal();
      layar(`<div class="mundur"><div><b>${c}</b><p>${kilat ? 'Tantangan Kilat' : KAT[k].nama + ' · ' + NAMA_LV[l]} — bersiap!</p></div></div>`);
      nada(c === 1 ? 660 : 440, 0.12); c--; tunda = setTimeout(tik, TENANG ? 350 : 650);
    };
    tik();
  }

  const katSoal = () => (st.kilat ? st.soal[st.i].k : st.k);
  function hud() {
    const k = katSoal(), c = KAT[k];
    return `<div class="hud" style="--w:${c.w}"><button class="tb kecil" data-aksi="keluar" aria-label="Keluar ronde">✕</button>
      <span class="lencana">${st.kilat ? '⚡ ' + c.nama : c.nama + ' · ' + NAMA_LV[st.l]}</span>
      ${st.runtun >= 2 ? `<span class="api">🔥 ${st.runtun}</span>` : ''}<span class="spasi"></span>
      <span class="skor">${st.skor}</span></div>
      <div class="titik" aria-label="Soal ${st.i + 1} dari ${st.n}">${st.soal.map((x, i) => `<i class="${i < st.i ? (st.riwayat[i] ? 'ok' : 'no') : i === st.i ? 'kini' : ''}"></i>`).join('')}</div>
      <div class="waktu" style="--w:${c.w}"><i id="bar"></i></div>`;
  }
  function isi(html) { app.innerHTML = html; }

  function jalanBar(ms, selesai, genting) {
    const bar = document.getElementById('bar'), t0 = performance.now();
    clearInterval(timer);
    timer = setInterval(() => {
      const sisa = Math.max(0, 1 - (performance.now() - t0) / ms);
      st.sisa = sisa;
      if (bar) { bar.style.transform = `scaleX(${sisa})`; if (genting) bar.parentNode.classList.toggle('genting', sisa < 0.25); }
      if (sisa <= 0) { clearInterval(timer); selesai(); }
    }, 50);
  }

  function tampilSoal() {
    const s = st.soal[st.i];
    if (st.kilat) tema(s.k, 'kilat');
    if (s.urut) {
      st.kunci = true;
      isi(hud() + `<div class="soal ayun"><div class="teks">Perhatikan urutan petak yang menyala!</div>
        <div class="petak" style="--n:${s.n}">${Array.from(Array(s.n * s.n).keys()).map(() => '<span></span>').join('')}</div></div><p class="info">Perhatikan baik-baik…</p>`);
      const sel = app.querySelectorAll('.petak span'); let i = 0;
      const langkah = () => {
        sel.forEach((c) => c.classList.remove('nyala'));
        if (i >= s.sel.length) { tunda = setTimeout(tampilPilihan, 350); return; }
        tunda = setTimeout(() => { sel[s.sel[i]].classList.add('nyala'); nada(380 + s.sel[i] * 28, 0.16); i++; tunda = setTimeout(langkah, 560); }, 190);
      };
      tunda = setTimeout(langkah, 500);
    } else if (s.memo) {
      st.kunci = true;
      isi(hud() + `<div class="soal ayun"><div class="teks">${s.memo.teks || 'Hafalkan urutan ini!'}</div>${s.memo.html}</div><p class="info">Perhatikan baik-baik…</p>`);
      jalanBar(s.memo.ms, tampilPilihan, false);
    } else tampilPilihan();
  }

  function tampilPilihan() {
    const s = st.soal[st.i], total = (st.kilat ? 16 : JENJANG[st.j].waktu) + KAT[katSoal()].plus;
    if (s.tipe === 'grid') {
      isi(hud() + `<div class="soal ayun"><div class="teks">${s.q}</div>
        <div class="petak" style="--n:${s.n}">${Array.from(Array(s.n * s.n).keys()).map((i) => `<button data-aksi="petak" data-i="${i}" aria-label="Petak ${i + 1}"></button>`).join('')}</div></div>
        <p class="info" id="info"></p>`);
      st.pilih = [];
    } else if (s.tipe === 'multi') {
      const panjang = !s.gambar && s.choices.some((c) => c.length > 16);
      isi(hud() + `<div class="soal ayun"><div class="teks">${s.q}</div>${s.stim || ''}</div>
        <div class="pils multi ${s.gambar ? 'gambar' : ''} ${panjang ? 'teks-panjang' : ''}">
          ${s.choices.map((c, i) => `<button class="pil" data-aksi="centang" data-i="${i}" data-h="${'ABCDEF'[i]}" aria-pressed="false">${c}</button>`).join('')}
        </div><div class="aksi" style="margin-top:16px"><button class="tb utama" data-aksi="periksa">Periksa jawaban ✓</button></div><p class="info" id="info"></p>`);
      st.pilih = [];
    } else {
      const n = s.choices.length, panjang = !s.gambar && s.choices.some((c) => c.replace(/<[^>]+>/g, '').length > 16);
      isi(hud() + `<div class="soal ayun"><div class="teks">${s.q}</div>${s.stim || ''}</div>
        <div class="pils ${s.gambar ? 'gambar' : ''} ${n === 2 ? 'dua' : n === 3 ? 'tiga' : ''} ${panjang ? 'teks-panjang' : ''}">
          ${s.choices.map((c, i) => `<button class="pil" data-aksi="jawab" data-i="${i}" data-h="${'ABCD'[i]}">${c}</button>`).join('')}
        </div><p class="info" id="info"></p>`);
    }
    st.kunci = false;
    jalanBar(total * 1000, () => (s.tipe === 'grid' ? nilaiPetak(true) : s.tipe === 'multi' ? periksa(true) : jawab(-1)), true);
  }

  function catat(ok, pesanSalah) {
    const info = document.getElementById('info');
    st.riwayat[st.i] = ok;
    if (ok) {
      st.runtun++; st.runtunMaks = Math.max(st.runtunMaks, st.runtun);
      const bonus = Math.min(50, 10 * (st.runtun - 1)), poin = 100 + Math.round(50 * (st.sisa || 0)) + bonus;
      st.benar++; st.skor += poin; bunyiBenar(st.runtun);
      info.className = 'info ok'; info.textContent = `Benar! +${poin}` + (st.runtun >= 2 ? ` · 🔥 ${st.runtun} beruntun` : '');
      if (st.runtun >= 3) konfeti(14);
    } else {
      st.runtun = 0; bunyiSalah();
      info.className = 'info no'; info.textContent = pesanSalah;
    }
    const sk = app.querySelector('.skor'); if (sk) sk.textContent = st.skor;
    const ps = app.querySelector('.pils'); if (ps) ps.classList.add('selesai');
    tunda = setTimeout(() => { st.i++; if (st.i < st.n) tampilSoal(); else hasil(); }, ok ? 950 : 1800);
  }

  function jawab(i) {
    if (!st || st.kunci) return;
    const s = st.soal[st.i];
    if (s.tipe === 'multi') { const t = app.querySelectorAll('.pil')[i]; if (t) centang(t); return; }
    if (s.tipe === 'grid' || i >= s.choices.length) return;
    st.kunci = true; clearInterval(timer);
    const tb = app.querySelectorAll('.pil'), ok = i === s.a;
    tb.forEach((b) => { b.disabled = true; });
    tb[s.a].classList.add('benar');
    if (!ok && i >= 0) tb[i].classList.add('salah');
    catat(ok, i < 0 ? 'Waktu habis!' : 'Belum tepat.');
  }

  function centang(t) {
    if (!st || st.kunci) return;
    const i = +t.dataset.i, p = st.pilih.indexOf(i);
    if (p >= 0) st.pilih.splice(p, 1); else st.pilih.push(i);
    t.classList.toggle('pilih', p < 0); t.setAttribute('aria-pressed', p < 0); bunyiKetuk();
  }
  function periksa(habis) {
    if (!st || st.kunci) return;
    const s = st.soal[st.i], tb = app.querySelectorAll('.pil'), info = document.getElementById('info');
    if (!habis && !st.pilih.length) { info.className = 'info'; info.textContent = 'Pilih minimal satu jawaban dulu.'; return; }
    st.kunci = true; clearInterval(timer);
    let ok = !habis;
    tb.forEach((b, i) => {
      b.disabled = true; b.classList.remove('pilih');
      const dipilih = st.pilih.includes(i), benar = s.benar.includes(i);
      if (dipilih && benar) b.classList.add('benar'); else if (dipilih) { b.classList.add('salah'); ok = false; } else if (benar) { b.classList.add('lupa'); ok = false; }
    });
    const pb = app.querySelector('[data-aksi=periksa]'); if (pb) pb.disabled = true;
    catat(ok, habis ? 'Waktu habis!' : 'Belum tepat — perhatikan yang bergaris putus-putus.');
  }

  function ketukPetak(t) {
    if (!st || st.kunci) return;
    const s = st.soal[st.i], i = +t.dataset.i;
    if (s.urut) {
      const ke = st.pilih.length; st.pilih.push(i); bunyiKetuk();
      t.classList.add('pilih'); setTimeout(() => t.classList.remove('pilih'), 220);
      if (i !== s.sel[ke] || st.pilih.length === s.sel.length) {
        const ok = i === s.sel[ke]; st.kunci = true; clearInterval(timer);
        const sel = app.querySelectorAll('.petak button'); sel.forEach((b) => { b.disabled = true; });
        if (ok) s.sel.forEach((x) => sel[x].classList.add('ok')); else { t.classList.add('no'); sel[s.sel[ke]].classList.add('lupa'); }
        catat(ok, 'Urutannya belum tepat.');
      }
      return;
    }
    const p = st.pilih.indexOf(i);
    if (p >= 0) { st.pilih.splice(p, 1); t.classList.remove('pilih'); } else { st.pilih.push(i); t.classList.add('pilih'); }
    bunyiKetuk();
    if (st.pilih.length === s.sel.length) { st.kunci = true; clearInterval(timer); tunda = setTimeout(() => { st.kunci = false; nilaiPetak(false); }, 280); }
  }
  function nilaiPetak(habis) {
    if (!st || st.kunci) return;
    st.kunci = true; clearInterval(timer);
    const s = st.soal[st.i], sel = app.querySelectorAll('.petak button');
    if (s.urut) { sel.forEach((b) => { b.disabled = true; }); catat(false, 'Waktu habis!'); return; }
    let ok = st.pilih.length === s.sel.length;
    sel.forEach((b, i) => {
      b.disabled = true; b.classList.remove('pilih');
      const dipilih = st.pilih.includes(i), benar = s.sel.includes(i);
      if (dipilih && benar) b.classList.add('ok'); else if (dipilih) { b.classList.add('no'); ok = false; } else if (benar) { b.classList.add('lupa'); ok = false; }
    });
    catat(ok, habis ? 'Waktu habis!' : 'Belum tepat.');
  }

  function hasil() {
    bersih(); tema(st.kilat ? 'kilat' : st.k);
    let b = 0, rekor = false, terbaik = 0;
    if (st.kilat) {
      rekor = st.skor > (data.kilat[st.j] || 0); if (rekor) data.kilat[st.j] = st.skor; terbaik = data.kilat[st.j] || 0;
      b = st.benar >= 9 ? 3 : st.benar >= 7 ? 2 : st.benar >= 5 ? 1 : 0;
    } else {
      const k = kunci(st.j, st.k, st.l);
      b = st.benar === st.n ? 3 : st.benar >= 7 ? 2 : st.benar >= 5 ? 1 : 0;
      rekor = st.skor > (data.s[k] || 0);
      if (b > (data.b[k] || 0)) data.b[k] = b;
      if (rekor) data.s[k] = st.skor; terbaik = data.s[k] || 0;
    }
    simpan();
    if (b) { nada(523, 0.15); nada(659, 0.15, 0.14); nada(784, 0.15, 0.28); nada(1047, 0.35, 0.42); konfeti(b * 45); }
    const pesan = b === 3 ? 'Sempurna!' : b === 2 ? 'Hebat sekali!' : b === 1 ? 'Bagus!' : 'Ayo coba lagi!';
    const lanjut = !st.kilat && b > 0 && st.l < 2;
    layar(`<div class="hasil">
      ${maskot(b >= 2 ? 'girang' : b === 1 ? 'senang' : 'sedih')}
      <div class="bintang" aria-label="${b} dari 3 bintang">${[1, 2, 3].map((x) => `<span class="${x <= b ? 'dapat' : ''}">★</span>`).join('')}</div>
      <h2>${pesan}</h2>
      <p class="ket">${JENJANG[st.j].nama} · ${st.kilat ? 'Tantangan Kilat' : KAT[st.k].nama + ' · ' + NAMA_LV[st.l]}${b || st.kilat ? '' : ' — perlu minimal 5 benar untuk 1 bintang'}</p>
      <div class="angka-hasil">
        <div><b>${st.benar}/${st.n}</b><span>Benar</span></div>
        <div><b id="naik">0</b><span>${rekor ? 'Skor · rekor baru!' : 'Skor'}</span></div>
        <div><b>🔥 ${st.runtunMaks}</b><span>Beruntun</span></div>
      </div>
      <p class="ket" style="margin-bottom:18px">Skor terbaik: ${terbaik}</p>
      <div class="aksi">
        <button class="tb" data-aksi="jenjang" data-j="${st.j}">Menu</button>
        <button class="tb ${lanjut ? '' : 'utama'}" data-aksi="${st.kilat ? 'kilat' : 'main'}" data-j="${st.j}" data-k="${st.k}" data-l="${st.l}">↻ Ulangi</button>
        ${lanjut ? `<button class="tb utama" data-aksi="main" data-j="${st.j}" data-k="${st.k}" data-l="${st.l + 1}">Level berikutnya →</button>` : ''}
      </div></div>`);
    const el = document.getElementById('naik'), akhir = st.skor, t0 = performance.now();
    st.selesai = true;
    if (TENANG) { el.textContent = akhir; return; }
    timer = setInterval(() => { const p = Math.min(1, (performance.now() - t0) / 900); el.textContent = Math.round(akhir * (1 - Math.pow(1 - p, 3))); if (p >= 1) clearInterval(timer); }, 30);
  }

  app.addEventListener('click', (e) => {
    const t = e.target.closest('[data-aksi]'); if (!t || t.disabled) return;
    const d = t.dataset;
    switch (d.aksi) {
      case 'beranda': beranda(); break;
      case 'pilihJenjang': data.j = d.j; simpan(); beranda(); break;
      case 'jenjang': menu(d.j); break;
      case 'main': mulai(d.j, d.k, +d.l); break;
      case 'kilat': mulai(d.j, 'kilat', 0); break;
      case 'jawab': jawab(+d.i); break;
      case 'petak': ketukPetak(t); break;
      case 'centang': centang(t); break;
      case 'periksa': periksa(false); break;
      case 'keluar': menu(st.j); break;
      case 'suara': data.suara = !data.suara; simpan(); t.textContent = data.suara ? '🔊' : '🔇'; break;
    }
  });
  document.addEventListener('keydown', (e) => {
    if (!st || st.kunci || st.selesai) return;
    if (e.key === 'Enter' && st.soal[st.i].tipe === 'multi') { e.preventDefault(); periksa(false); return; }
    if (e.key.length !== 1) return;
    const i = '123456'.indexOf(e.key) >= 0 ? '123456'.indexOf(e.key) : 'abcdef'.indexOf(e.key.toLowerCase());
    if (i >= 0) jawab(i);
  });

  beranda();
})();
