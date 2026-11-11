# CAKAP — Cerdas Angka, Kata, Akal, dan Pola

Permainan asah otak berbahasa Indonesia untuk jenjang **SD, SMP, dan SMA/SMK**. Seluruh soal, gambar, dan kode dibuat sendiri (orisinal); tidak memakai aset pihak lain.

## Isi permainan

| Arena | Jenis soal |
|---|---|
| Angka | Hitung cepat, benar/salah, mana lebih besar, deret, jam, teka-teki simbol, piramida bilangan, soal cerita |
| Kata | Sinonim, antonim, analogi, kelompok kata, susun huruf, peribahasa, kata baku, kelas kata, majas |
| Akal | Silogisme, urutan, hitung hari, sandi huruf, arah mata angin, hubungan keluarga, teka-teki logika |
| Pola | Beda sendiri, pola berulang, putaran, matriks 3×3, cermin, hitung bentuk, tumpukan kubus |
| Ingatan | Urutan angka/huruf, petak menyala, bentuk dan warna, daftar kata |

- 3 jenjang × 5 arena × 3 level (Mudah, Sedang, Sulit) = 45 ronde, plus **Tantangan Kilat** (10 soal campuran)
- 8 soal per ronde dengan batas waktu; 5 benar = ★, 7 benar = ★★, 8 benar = ★★★
- Bonus poin untuk jawaban cepat dan jawaban benar beruntun
- Level berikutnya terbuka setelah meraih minimal 1 bintang; gelar naik dari Pemula sampai Mahaguru
- Kemajuan tersimpan di peramban (localStorage); bisa dimainkan dengan keyboard (1–4 atau A–D)

## Menjalankan

Situs statis tanpa proses build. Buka `index.html`, atau aktifkan **GitHub Pages**:
Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Menambah soal

- `js/bank.js`, `js/bank2.js` — bank soal (kata, akal, peribahasa, kata baku, majas, dll.)
- `js/soal.js`, `js/soal2.js` — pembangkit soal otomatis dan susunan level tiap jenjang
- `js/app.js` — tampilan dan alur permainan
