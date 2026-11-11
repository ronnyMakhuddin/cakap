# CAKAP — Cerdas Angka, Kata, Akal, dan Pola

Permainan asah otak berbahasa Indonesia untuk jenjang **SD, SMP, dan SMA/SMK**. Seluruh soal, gambar, dan kode dibuat sendiri (orisinal); tidak memakai aset pihak lain.

## Isi permainan

| Kategori | Yang dilatih |
|---|---|
| Angka | Hitung cepat, deret, persen, persamaan, logaritma, peluang sederhana |
| Kata | Sinonim, antonim, analogi, kelompok kata, susun huruf |
| Akal | Silogisme, urutan, teka-teki logika |
| Pola | Pola gambar, putaran, matriks 3×3 |
| Ingatan | Menghafal urutan angka dan huruf |

- 3 jenjang × 5 kategori × 3 level (Mudah, Sedang, Sulit) = 45 ronde
- 8 soal per ronde, ada batas waktu; 5 benar = ★, 7 benar = ★★, 8 benar = ★★★
- Level berikutnya terbuka setelah meraih minimal 1 bintang
- Kemajuan tersimpan di peramban (localStorage); bisa dimainkan dengan keyboard (1–4 atau A–D)

## Menjalankan

Situs statis tanpa proses build. Buka `index.html`, atau aktifkan **GitHub Pages**:
Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Menambah soal

- `js/bank.js` — bank soal Kata dan Akal per jenjang
- `js/soal.js` — pembangkit soal otomatis (Angka, Pola, Ingatan) dan susunan level
- `js/app.js` — tampilan dan alur permainan
