/* CAKAP — antarmuka permainan */
(function () {
  const S = window.CAKAP_SOAL, app = document.getElementById('app');
  const JML_SOAL = 8;
  const JENJANG = {
    sd: { nama: 'SD', ket: 'Sekolah Dasar', waktu: 30 },
    smp: { nama: 'SMP', ket: 'Sekolah Menengah Pertama', waktu: 25 },
    sma: { nama: 'SMA', ket: 'SMA / SMK / MA', waktu: 22 }
  };
  const KAT = {
    angka: { nama: 'Angka', ik: '7', w: 'var(--angka)', ket: 'Hitung cepat, deret, dan soal bilangan', plus: 0 },
    kata: { nama: 'Kata', ik: 'Aa', w: 'var(--kata)', ket: 'Sinonim, antonim, analogi, dan susun huruf', plus: 0 },
    akal: { nama: 'Akal', ik: '?', w: 'var(--akal)', ket: 'Penalaran, urutan, dan teka-teki logika', plus: 20 },
    pola: { nama: 'Pola', ik: '◆', w: 'var(--pola)', ket: 'Pola gambar, putaran, dan matriks', plus: 10 },
    ingatan: { nama: 'Ingatan', ik: '∞', w: 'var(--ingatan)', ket: 'Hafalkan urutan, lalu jawab', plus: 0 }
  };
  const NAMA_LV = ['Mudah', 'Sedang', 'Sulit'];

  /* --- simpanan kemajuan (per peramban) --- */
  let data = { b: {}, s: {}, suara: true };
  try { const d = JSON.parse(localStorage.getItem('cakap-v1')); if (d && d.b) data = Object.assign(data, d); } catch (e) { /* abaikan */ }
  const simpan = () => { try { localStorage.setItem('cakap-v1', JSON.stringify(data)); } catch (e) { /* abaikan */ } };
  const kunci = (j, k, l) => j + '-' + k + '-' + l;
  const bintang = (j, k, l) => data.b[kunci(j, k, l)] || 0;
  const terbuka = (j, k, l) => l === 0 || bintang(j, k, l - 1) > 0;
  const totalBintang = (j) => Object.keys(KAT).reduce((t, k) => t + bintang(j, k, 0) + bintang(j, k, 1) + bintang(j, k, 2), 0);
  const gbBintang = (n) => '★'.repeat(n) + '<i>' + '★'.repeat(3 - n) + '</i>';

  /* --- suara sederhana --- */
  let ac = null;
  function nada(f, d, t) {
    if (!data.suara) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(), g = ac.createGain(), w = ac.currentTime + (t || 0);
      o.type = 'triangle'; o.frequency.value = f; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.12, w); g.gain.exponentialRampToValueAtTime(0.001, w + d);
      o.start(w); o.stop(w + d);
    } catch (e) { /* abaikan */ }
  }
  const bunyiBenar = () => { nada(660, 0.12); nada(880, 0.18, 0.1); };
  const bunyiSalah = () => { nada(200, 0.25); };

  /* --- keadaan permainan --- */
  let st = null, timer = null, tunda = null;
  function bersih() { clearInterval(timer); clearTimeout(tunda); timer = tunda = null; }
  const tbSuara = () => `<button class="tb kecil" data-aksi="suara" aria-label="Suara">${data.suara ? '🔊' : '🔇'}</button>`;

  function beranda() {
    bersih(); st = null;
    app.innerHTML = `
      <div class="atas"><span class="spasi"></span>${tbSuara()}</div>
      <header class="logo">
        <h1 class="huruf" aria-label="CAKAP"><span>C</span><span>A</span><span>K</span><span>A</span><span>P</span></h1>
        <p>Cerdas Angka, Kata, Akal, dan Pola</p>
        <small>Permainan asah otak — 8 soal tiap ronde, kumpulkan semua bintang!</small>
      </header>
      <h2 class="judul-bagian">Pilih jenjang</h2>
      <div class="jenjang">
        ${Object.keys(JENJANG).map((j) => `<button class="tb" data-aksi="jenjang" data-j="${j}">
          <b>${JENJANG[j].nama}</b><span>${JENJANG[j].ket}</span><em>★ ${totalBintang(j)} / 45</em></button>`).join('')}
      </div>
      <p class="kaki">Kemajuan tersimpan di perangkat ini.</p>`;
  }

  function menu(j) {
    bersih(); st = null;
    app.innerHTML = `
      <div class="atas"><button class="tb kecil" data-aksi="beranda">← Jenjang</button><span class="spasi"></span>
        <b>${JENJANG[j].nama} · ★ ${totalBintang(j)} / 45</b>${tbSuara()}</div>
      <div class="kat">
        ${Object.keys(KAT).map((k) => `<section class="kartu" style="--w:${KAT[k].w}">
          <div class="ik" aria-hidden="true">${KAT[k].ik}</div>
          <div><h3>${KAT[k].nama}</h3><p>${KAT[k].ket}</p></div>
          <div class="lvs">${[0, 1, 2].map((l) => `<button class="lv" data-aksi="main" data-j="${j}" data-k="${k}" data-l="${l}" ${terbuka(j, k, l) ? '' : 'disabled title="Raih minimal 1 bintang di level sebelumnya"'}>
            ${terbuka(j, k, l) ? '' : '🔒 '}${NAMA_LV[l]}<span class="bt">${gbBintang(bintang(j, k, l))}</span></button>`).join('')}</div>
        </section>`).join('')}
      </div>`;
    app.dataset.j = j;
  }

  function mulai(j, k, l) {
    bersih();
    st = { j: j, k: k, l: l, soal: S.buatRonde(j, k, l, JML_SOAL), i: 0, benar: 0, skor: 0, kunci: true, total: JENJANG[j].waktu + KAT[k].plus };
    tampilSoal();
  }

  function hud() {
    const c = KAT[st.k];
    return `<div class="hud" style="--w:${c.w}"><button class="tb kecil" data-aksi="keluar" aria-label="Keluar ronde">✕</button>
      <span class="lencana">${c.nama} · ${NAMA_LV[st.l]}</span><span class="spasi"></span>
      <span>Soal ${st.i + 1}/${JML_SOAL}</span><span>Skor ${st.skor}</span></div>
      <div class="waktu" style="--w:${c.w}"><i id="bar"></i></div>`;
  }

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
    if (s.memo) {
      st.kunci = true;
      app.innerHTML = hud() + `<div class="soal"><div class="teks">Hafalkan urutan ini!</div>${s.memo.html}</div><p class="info">Bersiap…</p>`;
      jalanBar(s.memo.ms, tampilPilihan, false);
    } else tampilPilihan();
  }

  function tampilPilihan() {
    const s = st.soal[st.i];
    const panjang = !s.gambar && s.choices.some((c) => c.replace(/<[^>]+>/g, '').length > 16);
    app.innerHTML = hud() + `<div class="soal"><div class="teks">${s.q}</div>${s.stim || ''}</div>
      <div class="pils ${s.gambar ? 'gambar' : ''} ${panjang ? 'teks-panjang' : ''}">
        ${s.choices.map((c, i) => `<button class="pil" data-aksi="jawab" data-i="${i}" data-h="${'ABCD'[i]}">${c}</button>`).join('')}
      </div><p class="info" id="info"></p>`;
    st.kunci = false;
    jalanBar(st.total * 1000, () => jawab(-1), true);
  }

  function jawab(i) {
    if (!st || st.kunci) return;
    st.kunci = true; clearInterval(timer);
    const s = st.soal[st.i], tb = app.querySelectorAll('.pil'), info = document.getElementById('info'), ok = i === s.a;
    tb.forEach((b) => { b.disabled = true; });
    tb[s.a].classList.add('benar');
    if (ok) {
      const poin = 100 + Math.round(50 * (st.sisa || 0));
      st.benar++; st.skor += poin; bunyiBenar();
      info.className = 'info ok'; info.textContent = `Benar! +${poin}`;
    } else {
      if (i >= 0) tb[i].classList.add('salah');
      bunyiSalah();
      info.className = 'info no'; info.textContent = i < 0 ? 'Waktu habis!' : 'Belum tepat.';
    }
    tunda = setTimeout(() => { st.i++; if (st.i < JML_SOAL) tampilSoal(); else hasil(); }, ok ? 900 : 1700);
  }

  function hasil() {
    bersih();
    const b = st.benar === JML_SOAL ? 3 : st.benar >= 7 ? 2 : st.benar >= 5 ? 1 : 0, k = kunci(st.j, st.k, st.l);
    const rekor = st.skor > (data.s[k] || 0);
    if (b > (data.b[k] || 0)) data.b[k] = b;
    if (rekor) data.s[k] = st.skor;
    simpan();
    if (b) { nada(523, 0.15); nada(659, 0.15, 0.14); nada(784, 0.3, 0.28); }
    const pesan = b === 3 ? 'Sempurna!' : b === 2 ? 'Hebat!' : b === 1 ? 'Bagus!' : 'Ayo coba lagi!';
    const lanjut = b > 0 && st.l < 2;
    app.innerHTML = `<div class="hasil">
      <div class="bintang" aria-label="${b} dari 3 bintang">${gbBintang(b)}</div>
      <h2>${pesan}</h2>
      <p class="ket">${JENJANG[st.j].nama} · ${KAT[st.k].nama} · ${NAMA_LV[st.l]}${b ? '' : ' — perlu minimal 5 jawaban benar untuk 1 bintang'}</p>
      <div class="angka-hasil">
        <div><b>${st.benar}/${JML_SOAL}</b><span>Benar</span></div>
        <div><b>${st.skor}</b><span>Skor${rekor ? ' · rekor!' : ''}</span></div>
        <div><b>${data.s[k] || 0}</b><span>Terbaik</span></div>
      </div>
      <div class="aksi">
        <button class="tb" data-aksi="jenjang" data-j="${st.j}">Menu</button>
        <button class="tb ${lanjut ? '' : 'utama'}" data-aksi="main" data-j="${st.j}" data-k="${st.k}" data-l="${st.l}">Ulangi</button>
        ${lanjut ? `<button class="tb utama" data-aksi="main" data-j="${st.j}" data-k="${st.k}" data-l="${st.l + 1}">Level berikutnya →</button>` : ''}
      </div></div>`;
    st.selesai = true;
  }

  app.addEventListener('click', (e) => {
    const t = e.target.closest('[data-aksi]'); if (!t || t.disabled) return;
    const d = t.dataset;
    switch (d.aksi) {
      case 'beranda': beranda(); break;
      case 'jenjang': menu(d.j); break;
      case 'main': mulai(d.j, d.k, +d.l); break;
      case 'jawab': jawab(+d.i); break;
      case 'keluar': menu(st.j); break;
      case 'suara': data.suara = !data.suara; simpan(); t.textContent = data.suara ? '🔊' : '🔇'; break;
    }
  });
  document.addEventListener('keydown', (e) => {
    if (!st || st.kunci || st.selesai) return;
    const i = '1234'.indexOf(e.key) >= 0 ? '1234'.indexOf(e.key) : 'abcd'.indexOf(e.key.toLowerCase());
    if (i >= 0 && e.key.length === 1) jawab(i);
  });

  beranda();
})();
