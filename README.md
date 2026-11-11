# CAKAP — Cerdas Angka, Kata, Akal, dan Pola

Permainan asah otak berbahasa Indonesia untuk jenjang **SD, SMP, dan SMA/SMK**. Seluruh soal, gambar, dan kode dibuat sendiri (orisinal); tidak memakai aset pihak lain.

## Isi permainan

| Arena | Jenis soal |
|---|---|
| Angka | Hitung cepat, benar/salah, deret, tanda operasi yang hilang, operasi rahasia, kotak ajaib, teka-teki simbol, piramida bilangan, jam, soal cerita |
| Kata | Sinonim, antonim, analogi, penyusup (odd one out), susun huruf, deret huruf, kata–bilangan, peribahasa, kata baku, majas |
| Akal | Silogisme, urutan, sudoku mini 4×4, siapa yang jujur, sandi huruf, arah mata angin, hubungan keluarga |
| Pola | Matriks 3×3, deret gambar, jaring-jaring kubus, lipat kertas, rotasi mental, cermin, hitung segitiga, tumpukan kubus |
| Ingatan | Urutan menyala (ketuk berurutan), petak menyala, urutan angka/huruf, bentuk dan warna, daftar kata |

Bentuk jawaban: pilihan ganda, benar/salah, **pilihan ganda kompleks (lebih dari satu jawaban benar)**, dan ketuk petak.
Setiap arena punya latar pemandangan beranimasi sendiri (balon udara, layang-layang, antariksa, bawah laut, malam kunang-kunang).

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
- `js/soal.js`, `js/soal2.js`, `js/soal3.js` — pembangkit soal otomatis dan susunan level tiap jenjang
- `js/pentas.js` — latar pemandangan beranimasi tiap arena
- `js/app.js` — tampilan dan alur permainan
