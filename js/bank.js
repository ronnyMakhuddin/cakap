/* CAKAP — bank soal orisinal (Kata & Akal) per jenjang.
   Format sinonim/antonim/analogi: [soal, jawaban benar, pengecoh1, pengecoh2, pengecoh3]
   Format kelompok: [yang tidak sekelompok, a, b, c]
   Format akal: [soal, jawaban benar, pengecoh1, pengecoh2, pengecoh3] */
(function (root) {
  root.CAKAP_BANK = {
    sd: {
      sinonim: [
        ['pandai', 'pintar', 'malas', 'lambat', 'takut'],
        ['gembira', 'senang', 'sedih', 'marah', 'lelah'],
        ['indah', 'elok', 'buruk', 'kotor', 'gelap'],
        ['cepat', 'laju', 'pelan', 'diam', 'berat'],
        ['luas', 'lapang', 'sempit', 'pendek', 'tipis'],
        ['memulai', 'mengawali', 'mengakhiri', 'menunda', 'melupakan'],
        ['rajin', 'tekun', 'malas', 'lalai', 'bosan'],
        ['bohong', 'dusta', 'jujur', 'benar', 'setia'],
        ['hadiah', 'kado', 'hukuman', 'tugas', 'denda'],
        ['melihat', 'memandang', 'mendengar', 'mencium', 'meraba'],
        ['kawan', 'teman', 'lawan', 'musuh', 'tamu'],
        ['harum', 'wangi', 'busuk', 'anyir', 'tawar']
      ],
      antonim: [
        ['tinggi', 'rendah', 'besar', 'panjang', 'lebar'],
        ['siang', 'malam', 'pagi', 'sore', 'subuh'],
        ['panas', 'dingin', 'hangat', 'terik', 'kering'],
        ['rajin', 'malas', 'tekun', 'pandai', 'giat'],
        ['gelap', 'terang', 'redup', 'suram', 'hitam'],
        ['naik', 'turun', 'maju', 'lari', 'lompat'],
        ['kaya', 'miskin', 'hemat', 'mewah', 'mahal'],
        ['basah', 'kering', 'lembap', 'dingin', 'licin'],
        ['tebal', 'tipis', 'kecil', 'ringan', 'pendek'],
        ['jauh', 'dekat', 'luas', 'lama', 'panjang'],
        ['berani', 'takut', 'kuat', 'nekat', 'gagah'],
        ['bersih', 'kotor', 'rapi', 'wangi', 'putih']
      ],
      kelompok: [
        ['wortel', 'apel', 'jeruk', 'mangga'],
        ['kucing', 'elang', 'merpati', 'nuri'],
        ['meja', 'merah', 'biru', 'hijau'],
        ['sepeda', 'kapal', 'perahu', 'rakit'],
        ['gitar', 'palu', 'gergaji', 'obeng'],
        ['paus', 'ayam', 'bebek', 'angsa'],
        ['nasi', 'teh', 'susu', 'kopi'],
        ['Senin', 'Januari', 'Maret', 'Mei'],
        ['mata', 'sepatu', 'topi', 'baju'],
        ['guru', 'sekolah', 'pasar', 'rumah sakit']
      ],
      analogi: [
        ['Burung : terbang = ikan : …', 'berenang', 'berjalan', 'melompat', 'merayap'],
        ['Guru : sekolah = dokter : …', 'rumah sakit', 'pasar', 'sawah', 'kantor pos'],
        ['Siang : matahari = malam : …', 'bulan', 'awan', 'hujan', 'pelangi'],
        ['Kaki : sepatu = kepala : …', 'topi', 'sarung tangan', 'kaus kaki', 'ikat pinggang'],
        ['Ayam : telur = lebah : …', 'madu', 'susu', 'wol', 'sutra'],
        ['Pensil : menulis = gunting : …', 'memotong', 'menggambar', 'menghapus', 'mengukur'],
        ['Panas : api = dingin : …', 'es', 'asap', 'batu', 'angin'],
        ['Petani : sawah = nelayan : …', 'laut', 'hutan', 'kebun', 'kantor'],
        ['Buku : membaca = radio : …', 'mendengarkan', 'menonton', 'menulis', 'melukis'],
        ['Minggu : hari = Januari : …', 'bulan', 'tahun', 'tanggal', 'musim']
      ],
      anagram: ['BUKU', 'MEJA', 'SAPI', 'BOLA', 'RUMAH', 'PINTU', 'KUCING', 'SEKOLAH', 'PENSIL', 'BUNGA', 'GURU', 'IKAN', 'KURSI', 'SEPATU'],
      akal: [
        ['Semua ikan hidup di air. Lele adalah ikan. Jadi …', 'Lele hidup di air', 'Lele bisa terbang', 'Semua yang hidup di air adalah lele', 'Lele tidak butuh air'],
        ['Hari ini hari Rabu. Hari apa 3 hari lagi?', 'Sabtu', 'Jumat', 'Minggu', 'Kamis'],
        ['Ani punya 2 kakak dan 1 adik. Berapa jumlah anak di keluarga Ani?', '4 anak', '3 anak', '5 anak', '2 anak'],
        ['Jika kemarin hari Senin, besok hari apa?', 'Rabu', 'Selasa', 'Kamis', 'Minggu'],
        ['Ayah Budi punya 3 anak. Dua di antaranya bernama Senin dan Selasa. Siapa nama anak ketiga?', 'Budi', 'Rabu', 'Kamis', 'Minggu'],
        ['Dalam lomba lari, Dodi menyalip pelari yang berada di posisi 2. Sekarang Dodi di posisi berapa?', 'Posisi 2', 'Posisi 1', 'Posisi 3', 'Posisi 4'],
        ['Semua burung punya sayap. Merpati adalah burung. Jadi …', 'Merpati punya sayap', 'Merpati tidak bisa terbang', 'Semua yang bersayap adalah merpati', 'Merpati bukan hewan'],
        ['Mana yang paling berat: 1 kg kapas, 1 kg besi, atau 1 kg batu?', 'Sama berat', 'Besi', 'Batu', 'Kapas'],
        ['Di dalam kotak ada 3 bola merah dan 2 bola biru. Jika 1 bola merah diambil, berapa bola yang tersisa?', '4 bola', '5 bola', '3 bola', '2 bola'],
        ['Sekarang pukul 9 pagi. Dua jam lagi pukul berapa?', 'Pukul 11', 'Pukul 10', 'Pukul 12', 'Pukul 7']
      ]
    },

    smp: {
      sinonim: [
        ['evaluasi', 'penilaian', 'perencanaan', 'pelaksanaan', 'pengumuman'],
        ['dampak', 'akibat', 'sebab', 'tujuan', 'syarat'],
        ['cermat', 'teliti', 'ceroboh', 'cepat', 'lambat'],
        ['mufakat', 'sepakat', 'selisih', 'debat', 'ragu'],
        ['relasi', 'hubungan', 'perbedaan', 'jarak', 'urutan'],
        ['tangkas', 'cekatan', 'lamban', 'kaku', 'lesu'],
        ['nyata', 'konkret', 'abstrak', 'semu', 'maya'],
        ['gagasan', 'ide', 'fakta', 'data', 'hasil'],
        ['partisipasi', 'keikutsertaan', 'penolakan', 'pengawasan', 'persaingan'],
        ['mandiri', 'berdikari', 'bergantung', 'bersama', 'berpindah'],
        ['lazim', 'umum', 'langka', 'aneh', 'baru'],
        ['dermawan', 'murah hati', 'kikir', 'sombong', 'pemalu'],
        ['efektif', 'tepat guna', 'boros', 'lambat', 'rumit']
      ],
      antonim: [
        ['optimis', 'pesimis', 'realistis', 'kritis', 'praktis'],
        ['abadi', 'fana', 'kekal', 'lama', 'tetap'],
        ['langka', 'melimpah', 'jarang', 'mahal', 'unik'],
        ['sementara', 'tetap', 'singkat', 'sebentar', 'lekas'],
        ['menolak', 'menerima', 'menunda', 'membantah', 'menghindar'],
        ['hulu', 'hilir', 'tepi', 'dasar', 'arus'],
        ['tunggal', 'jamak', 'satu', 'esa', 'ganjil'],
        ['aktif', 'pasif', 'giat', 'lincah', 'sibuk'],
        ['konsumen', 'produsen', 'pembeli', 'pelanggan', 'pemakai'],
        ['ekspor', 'impor', 'niaga', 'pasar', 'barter'],
        ['sombong', 'rendah hati', 'angkuh', 'congkak', 'pongah'],
        ['kasar', 'halus', 'keras', 'tajam', 'kesat'],
        ['individu', 'kelompok', 'pribadi', 'perorangan', 'diri'],
        ['longgar', 'ketat', 'lebar', 'lapang', 'besar']
      ],
      kelompok: [
        ['paus', 'hiu', 'pari', 'lele'],
        ['Bulan', 'Mars', 'Venus', 'Bumi'],
        ['kelelawar', 'elang', 'merpati', 'pipit'],
        ['liter', 'meter', 'kilometer', 'sentimeter'],
        ['biola', 'suling', 'terompet', 'saksofon'],
        ['Jakarta', 'Jawa', 'Sumatra', 'Sulawesi'],
        ['puisi', 'cerpen', 'novel', 'dongeng'],
        ['segitiga', 'kubus', 'balok', 'tabung'],
        ['besi', 'kayu', 'karet', 'plastik'],
        ['laba-laba', 'semut', 'lebah', 'kupu-kupu']
      ],
      analogi: [
        ['Penulis : buku = pelukis : …', 'lukisan', 'kuas', 'galeri', 'kanvas'],
        ['Haus : minum = lelah : …', 'istirahat', 'bekerja', 'berlari', 'makan'],
        ['Kilogram : berat = liter : …', 'volume', 'panjang', 'suhu', 'waktu'],
        ['Termometer : suhu = penggaris : …', 'panjang', 'berat', 'waktu', 'kecepatan'],
        ['Jepang : Tokyo = Thailand : …', 'Bangkok', 'Hanoi', 'Manila', 'Seoul'],
        ['Ulat : kupu-kupu = berudu : …', 'katak', 'ikan', 'kadal', 'belut'],
        ['Paru-paru : bernapas = jantung : …', 'memompa darah', 'mencerna makanan', 'menyaring darah', 'menggerakkan tubuh'],
        ['Kertas : pohon = kain : …', 'kapas', 'jarum', 'baju', 'gunting'],
        ['Sopir : mobil = pilot : …', 'pesawat', 'bandara', 'kapal', 'kereta'],
        ['Ombak : laut = bukit pasir : …', 'gurun', 'hutan', 'sungai', 'danau'],
        ['Kata : kalimat = kalimat : …', 'paragraf', 'huruf', 'suku kata', 'judul']
      ],
      anagram: ['PLANET', 'BAHASA', 'SEJARAH', 'GEMPA', 'ENERGI', 'BUDAYA', 'MUSEUM', 'KOMPUTER', 'LEMBAGA', 'PANTAI', 'JEMBATAN', 'KOPERASI'],
      akal: [
        ['Semua siswa kelas 8A mengikuti pramuka. Rina adalah siswa kelas 8A. Kesimpulannya …', 'Rina mengikuti pramuka', 'Rina ketua pramuka', 'Semua anggota pramuka adalah siswa 8A', 'Rina tidak suka pramuka'],
        ['Jika hujan, lapangan basah. Ternyata lapangan tidak basah. Jadi …', 'Tidak hujan', 'Hujan', 'Hujan sebentar', 'Tidak dapat disimpulkan'],
        ['Jika hujan, lapangan basah. Ternyata lapangan basah. Jadi …', 'Belum tentu hujan', 'Pasti hujan', 'Pasti tidak hujan', 'Lapangan akan kering'],
        ['Lima orang saling berjabat tangan tepat satu kali. Berapa banyak jabat tangan yang terjadi?', '10', '5', '20', '25'],
        ['Seekor siput memanjat tiang setinggi 10 m. Setiap siang ia naik 3 m, setiap malam turun 2 m. Pada hari ke berapa ia sampai di puncak?', 'Hari ke-8', 'Hari ke-10', 'Hari ke-7', 'Hari ke-9'],
        ['Hari ini hari Jumat. Hari apakah 100 hari lagi?', 'Minggu', 'Sabtu', 'Senin', 'Jumat'],
        ['Sebagian siswa suka basket. Semua yang suka basket suka olahraga. Jadi …', 'Sebagian siswa suka olahraga', 'Semua siswa suka olahraga', 'Tidak ada siswa yang suka olahraga', 'Semua yang suka olahraga suka basket'],
        ['Di laci yang gelap ada 6 kaus kaki hitam dan 6 kaus kaki putih. Paling sedikit berapa kaus kaki harus diambil agar pasti mendapat sepasang yang sewarna?', '3', '2', '7', '6'],
        ['Umur Ayah 3 kali umur Dika. Jumlah umur mereka 48 tahun. Berapa umur Dika?', '12 tahun', '16 tahun', '9 tahun', '36 tahun'],
        ['Dalam sebuah sandi, KUCING ditulis LVDJOH. Dengan sandi yang sama, BUKU ditulis …', 'CVLV', 'ATJT', 'CULV', 'BVLV']
      ]
    },

    sma: {
      sinonim: [
        ['ambigu', 'bermakna ganda', 'jelas', 'tegas', 'pasti'],
        ['komprehensif', 'menyeluruh', 'sebagian', 'ringkas', 'dangkal'],
        ['signifikan', 'berarti', 'sepele', 'samar', 'wajar'],
        ['kontradiksi', 'pertentangan', 'persamaan', 'kesepakatan', 'penjelasan'],
        ['esensial', 'hakiki', 'tambahan', 'sementara', 'lahiriah'],
        ['implisit', 'tersirat', 'tersurat', 'terbuka', 'terperinci'],
        ['akselerasi', 'percepatan', 'perlambatan', 'perpindahan', 'perubahan'],
        ['kredibel', 'dapat dipercaya', 'diragukan', 'populer', 'sederhana'],
        ['paradigma', 'kerangka berpikir', 'hasil penelitian', 'aturan baku', 'pendapat umum'],
        ['inovasi', 'pembaruan', 'peniruan', 'pelestarian', 'pengulangan'],
        ['konsensus', 'mufakat', 'sengketa', 'pemungutan suara', 'keraguan'],
        ['pragmatis', 'praktis', 'teoretis', 'idealis', 'dogmatis'],
        ['anomali', 'penyimpangan', 'keteraturan', 'kebiasaan', 'kesamaan']
      ],
      antonim: [
        ['abstrak', 'konkret', 'maya', 'semu', 'samar'],
        ['heterogen', 'homogen', 'majemuk', 'beragam', 'campuran'],
        ['deduktif', 'induktif', 'logis', 'analitis', 'sistematis'],
        ['statis', 'dinamis', 'tetap', 'diam', 'pasif'],
        ['prolog', 'epilog', 'dialog', 'monolog', 'katalog'],
        ['defisit', 'surplus', 'rugi', 'minus', 'utang'],
        ['makro', 'mikro', 'mega', 'global', 'luas'],
        ['subjektif', 'objektif', 'pribadi', 'emosional', 'sepihak'],
        ['ekspansi', 'penyusutan', 'perluasan', 'pemekaran', 'penyebaran'],
        ['mayoritas', 'minoritas', 'kebanyakan', 'umum', 'dominan'],
        ['konvergen', 'divergen', 'sejajar', 'memusat', 'searah'],
        ['permanen', 'temporer', 'abadi', 'kekal', 'baku'],
        ['eksplisit', 'implisit', 'gamblang', 'lugas', 'tegas'],
        ['apatis', 'peduli', 'acuh', 'masa bodoh', 'cuek']
      ],
      kelompok: [
        ['natrium', 'oksigen', 'nitrogen', 'helium'],
        ['pantun', 'cerpen', 'novel', 'roman'],
        ['inflasi', 'fotosintesis', 'respirasi', 'transpirasi'],
        ['Pluto', 'Mars', 'Jupiter', 'Saturnus'],
        ['kecepatan', 'massa', 'waktu', 'suhu'],
        ['trapesium', 'kubus', 'prisma', 'limas'],
        ['Borobudur', 'Bromo', 'Merapi', 'Semeru'],
        ['protein', 'glukosa', 'fruktosa', 'sukrosa'],
        ['DPR', 'Presiden', 'Wakil Presiden', 'Menteri'],
        ['mitokondria', 'jantung', 'hati', 'ginjal']
      ],
      analogi: [
        ['Hipotesis : penelitian = diagnosis : …', 'pengobatan', 'penyakit', 'dokter', 'gejala'],
        ['Arsitek : cetak biru = komponis : …', 'partitur', 'orkestra', 'konser', 'piano'],
        ['Inflasi : harga naik = resesi : …', 'ekonomi melemah', 'upah naik', 'ekspor naik', 'pajak turun'],
        ['Sel : jaringan = jaringan : …', 'organ', 'organisme', 'organel', 'molekul'],
        ['Kemarau : kekeringan = hujan lebat : …', 'banjir', 'pelangi', 'mendung', 'embun'],
        ['Dirigen : orkestra = sutradara : …', 'film', 'naskah', 'kamera', 'penonton'],
        ['Legislatif : membuat undang-undang = yudikatif : …', 'mengadili pelanggaran hukum', 'menjalankan pemerintahan', 'memungut pajak', 'mengangkat menteri'],
        ['Bait : puisi = paragraf : …', 'esai', 'kalimat', 'kata', 'judul'],
        ['Katalis : reaksi kimia = pelumas : …', 'mesin', 'bensin', 'karat', 'panas'],
        ['Epidemi : wilayah = pandemi : …', 'dunia', 'kota', 'desa', 'rumah sakit'],
        ['Teleskop : bintang = mikroskop : …', 'sel', 'planet', 'gunung', 'awan']
      ],
      anagram: ['DEMOKRASI', 'HIPOTESIS', 'EKOSISTEM', 'LITERASI', 'ARGUMEN', 'MOLEKUL', 'PARAGRAF', 'STATISTIK', 'KONSTITUSI', 'ANALISIS', 'REVOLUSI', 'GLOBALISASI'],
      akal: [
        ['Semua A adalah B. Sebagian B adalah C. Kesimpulan yang tepat adalah …', 'Belum tentu ada A yang C', 'Semua A adalah C', 'Sebagian A pasti C', 'Tidak ada A yang C'],
        ['Kontraposisi dari "Jika belajar tekun, maka lulus" adalah …', 'Jika tidak lulus, maka tidak belajar tekun', 'Jika lulus, maka belajar tekun', 'Jika tidak belajar tekun, maka tidak lulus', 'Belajar tekun dan tidak lulus'],
        ['Ingkaran dari "Semua siswa hadir" adalah …', 'Ada siswa yang tidak hadir', 'Semua siswa tidak hadir', 'Tidak ada siswa yang hadir', 'Ada siswa yang hadir'],
        ['Ada tiga kotak, satu berisi hadiah. Kotak A bertuliskan "Hadiah di sini". Kotak B: "Hadiah bukan di sini". Kotak C: "Hadiah bukan di kotak A". Tepat satu tulisan yang benar. Di mana hadiahnya?', 'Kotak B', 'Kotak A', 'Kotak C', 'Tidak dapat ditentukan'],
        ['Sebuah jam berdentang 6 kali dalam 5 detik dengan selang yang sama. Berapa detik yang diperlukan untuk 12 dentang?', '11 detik', '10 detik', '12 detik', '6 detik'],
        ['Dari 30 siswa, 18 suka matematika, 15 suka fisika, dan 5 tidak suka keduanya. Berapa siswa yang suka keduanya?', '8', '3', '10', '13'],
        ['Diketahui P benar dan Q salah. Pernyataan yang bernilai benar adalah …', 'P ∨ Q', 'P ∧ Q', 'P → Q', '¬P'],
        ['Bakteri dalam wadah berlipat dua setiap menit. Wadah penuh pada menit ke-60. Pada menit ke berapa wadah terisi setengah?', 'Menit ke-59', 'Menit ke-30', 'Menit ke-45', 'Menit ke-58'],
        ['Lima orang mengantre. D paling depan. A di depan B. E tepat di belakang A. C paling belakang. Siapa yang berada di tengah?', 'E', 'A', 'B', 'C'],
        ['Rata-rata nilai 4 siswa adalah 80. Setelah satu siswa bergabung, rata-ratanya menjadi 82. Berapa nilai siswa kelima?', '90', '82', '88', '92'],
        ['Jika 3 mesin membuat 3 barang dalam 3 menit, berapa lama 100 mesin membuat 100 barang?', '3 menit', '100 menit', '33 menit', '1 menit']
      ]
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
