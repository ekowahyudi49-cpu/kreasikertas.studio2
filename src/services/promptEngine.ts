import { GuruInput, PromptCategory, GeneratedPromptResult } from '../types';

export function generateEducationalPrompt(
  category: PromptCategory,
  input: GuruInput
): GeneratedPromptResult {
  const {
    schoolName,
    teacherName,
    grade,
    subject,
    theme,
    questionCount,
    paperSize,
    orientation,
    language,
    targetAI = 'ChatGPT / Claude / Gemini / Midjourney',
    notes = '',
  } = input;

  const timestamp = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let title = '';
  let categoryName = '';
  let promptText = '';
  let summary = '';
  let visualKeywords: string[] = [];
  let recommendedModel = targetAI;

  switch (category) {
    case 'worksheet_essay': {
      categoryName = 'Worksheet Essay';
      title = `Worksheet Essay ${questionCount} Soal: ${theme} - ${grade}`;
      summary = `Prompt pembuatan lembar kerja ${questionCount} soal uraian bertingkat (LOTS ke HOTS) lengkap dengan stimulus naratif, rubrik penilaian, dan kunci jawaban.`;
      visualKeywords = ['lembar kerja uraian', 'soal HOTS', 'rubrik penilaian', 'stimulus bacaan', 'garis berjarak'];
      
      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah seorang Spesialis Kurikulum Pendidikan Dasar dan Desainer Lembar Kerja Siswa (Worksheet) Profesional.
Tugas Anda: Buatlah naskah lengkap Lembar Kerja Siswa (Worksheet) Soal Essay / Uraian siap cetak dengan spesifikasi berikut:

=== IDENTITAS DOKUMEN ===
- Instansi Sekolah   : ${schoolName}
- Guru / Kreator     : ${teacherName}
- Tingkat Kelas      : ${grade}
- Mata Pelajaran     : ${subject}
- Tema Pembelajaran  : ${theme}
- Jumlah Soal Essay  : ${questionCount} Butir Soal (Berjenjang: 30% Tingkat Pemahaman LOTS, 40% Penerapan MOTS, 30% Analisis/Penalaran HOTS)
- Ukuran Kertas      : ${paperSize} (${orientation})
- Bahasa Pengantar   : Bahasa ${language}
${notes ? `- Catatan Khusus   : ${notes}` : ''}

=== STRUKTUR ISI LEMBAR KERJA (WAJIB LENGKAP) ===
1. KOP LEMBAR KERJA RESMI:
   - Header memuat: Nama Sekolah, Nama Siswa (titik-titik), Nomor Absen, Hari/Tanggal, Mata Pelajaran, dan Tema.
   - Kotak nilai guru dan paraf orang tua di pojok kanan atas.

2. PETUNJUK PENGERJAAN:
   - 3-4 butir instruksi singkat, ramah anak, dan memotivasi kejujuran belajar.

3. TEKS STIMULUS / ILUSTRASI NARASI:
   - Sajikan cerita pendek kontekstual / studi kasus faktual yang relevan dengan tema "${theme}" sebanyak 2-3 paragraf sebagai pemantik literasi sebelum soal.

4. DAFTAR SOAL ESSAY (${questionCount} NOMOR):
   - Tuliskan tepat ${questionCount} soal essay bernomor 1 sampai ${questionCount}.
   - Setiap soal harus jelas, melatih kemampuan berpikir kritis anak usia ${grade}, dan tidak multitafsir.
   - Sediakan area jawaban berupa garis berjarak (guided writing lines) yang cukup untuk siswa menuliskan argumentasinya.

5. PEDOMAN PENILAIAN & KUNCI JAWABAN (UNTUK GURU):
   - Kunci jawaban lengkap per nomor soal.
   - Rubrik kriteria skor (0-100) berdasarkan pemahaman konsep, kelengkapan uraian, dan tata bahasa.

Tuliskan seluruh hasil dalam format teks rapi berpaginasi, siap disalin ke Microsoft Word / Google Docs atau diringkas ke template Canva.`;
      break;
    }

    case 'gunting_tempel': {
      categoryName = 'Gunting Tempel';
      title = `Pola Aktivitas Gunting & Tempel: ${theme} - ${grade}`;
      summary = `Prompt desain lembar aktivitas craft gunting tempel (Cut and Paste) dengan garis potong putus-putus, tab perekat lem, dan papan tempel target.`;
      visualKeywords = ['cut and paste', 'garis putus-putus', 'icon gunting', 'area lem berpola', 'motorik halus'];
      recommendedModel = 'Midjourney / DALL-E 3 / Canva AI';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Desainer Grafis Edukasi Anak Usia Dini & Sekolah Dasar ahli dalam Kerajinan Kertas (Paper Cut and Paste Activity).
Tugas Anda: Buatlah deskripsi visual dan prompt instruksi detail untuk menghasilkan lembar aktivitas gunting tempel bertema "${theme}".

=== SPESIFIKASI AKTIVITAS ===
- Instansi Sekolah   : ${schoolName}
- Guru Pengampu      : ${teacherName}
- Target Siswa       : ${grade}
- Mata Pelajaran     : ${subject}
- Tema Proyek        : ${theme}
- Format Kertas      : ${paperSize} (${orientation})
- Bahasa Pengantar   : Bahasa ${language}
${notes ? `- Instruksi Tambahan: ${notes}` : ''}

=== DESKRIPSI ELEMEN HALAMAN KERTAS ===
Halaman 1: PAPAN TEMPEL UTAMA (Background Target Canvas)
- Latar belakang pemandangan ilustratif hitam-putih / garis kontur tebal yang mewakili tema "${theme}".
- Berisi area kosong bergaris batas abu-abu samar (silhouette guide) bertuliskan "TEMPELKAN DI SINI" atau icon tetesan lem kecil di setiap slot penempelan.

Halaman 2: LEMBAR KEPINGAN UNTUK DIGUNTING (Cutout Parts)
- Berisi kepingan-kepingan objek (karakter, elemen visual, puzzle bagian objek) dengan garis batas putus-putus tebal (dashed cut-lines).
- Dilengkapi simbol ikon gunting mini di tepi garis potong untuk melatih koordinasi motorik halus siswa.
- Setiap kepingan memiliki tab/area pinggir berlabel "LEBARKAN LEM".

=== PROMPT GENERATOR GAMBAR (BISA DIGUNAKAN DI MIDJOURNEY / DALL-E 3 / CANVA MAGIC MEDIA) ===
"A high-resolution printable educational cut-and-paste worksheet for children, theme: ${theme}, black and white thick clean outline illustration, clear dashed scissor cut lines around each component, paste-here dotted indicator zones, minimalist child-friendly vector art style, flat layout on white background, paper size ${paperSize} ${orientation}, no complex shading, coloring-book lineart style, 300 DPI, ultra-crisp vector line quality."

=== PETUNJUK LANGKAH DEMI LANGKAH GURU UNTUK SISWA ===
1. Warnai seluruh gambar kepingan terlebih dahulu dengan krayon atau pensil warna.
2. Gunting kepingan secara hati-hati mengikuti garis putus-putus.
3. Oleskan lem tipis-tipis pada bagian belakang kepingan.
4. Susun dan rekatkan kepingan pada lembar target hingga membentuk diorama/gambar utuh "${theme}".`;
      break;
    }

    case 'papercraft': {
      categoryName = 'Papercraft';
      title = `Pola Rakit Papercraft 3D: ${theme} - ${grade}`;
      summary = `Prompt rancangan jaring-jaring lipat papercraft 3D (rumah adat, hewan unik, atau kendaraan) dengan garis lipatan gunung/lembah dan lidah lem presisi.`;
      visualKeywords = ['papercraft net', 'garis lipat', 'folding tabs', '3D low-poly paper model', 'miniatur kertas'];
      recommendedModel = 'Midjourney / Stable Diffusion / Vector AI';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Insinyur Kertas (Paper Engineer) & Desainer Model Origami 3D untuk Pembelajaran Kreatif Anak.
Tugas Anda: Buatlah blueprint dan deskripsi pola rakitan Papercraft 3D yang dapat dicetak, digunting, dilipat, dan dilem oleh siswa.

=== SPESIFIKASI PROYEK PAPERCRAFT ===
- Sekolah            : ${schoolName}
- Nama Guru          : ${teacherName}
- Tingkat Siswa      : ${grade}
- Objek Papercraft   : Bangun 3D Tematik "${theme}" (misal: miniatur rumah, kendaraan edukasi, hewan lucu, atau bangunan bersejarah)
- Mata Pelajaran     : ${subject}
- Ukuran Kertas      : ${paperSize} (${orientation})
- Tingkat Kesulitan  : Disesuaikan untuk anak ${grade} (lipatan sederhana, tab lem ekstra lebar agar mudah direkatkan)
- Bahasa             : Bahasa ${language}

=== STRUKTUR POLA JARING-JARING (PAPER NET LAYOUT) ===
1. JARING-JARING UTAMA:
   - Pola bidang geometris terbentang (unfolded net) dari objek "${theme}".
   - Garis luar tebal solid (solid black stroke) untuk batas potong gunting.
   - Garis putus-putus tipis (dashed line) untuk lipatan gunung (mountain fold).
   - Garis titik-garis (dash-dot line) untuk lipatan lembah (valley fold).
2. LIDAH REKAT (GLUE TABS):
   - Tab trapesium bersudut 45 derajat selebar minimal 8mm di setiap sisi temu.
   - Diberi pola arsiran halus atau tulisan "LEM / GLUE" untuk memandu jari siswa.
3. NOMOR URUT PERAKITAN:
   - Angka kecil berpasangan (misal: Tab [1] bertemu Sisi [1]) agar siswa merakit dengan urutan yang logis.

=== PROMPT GENERATOR ASSET VISUAL AI ===
"Printable 3D papercraft net template sheet for kids, flat unfolded diagram of ${theme}, clean isometric geometric parts with gluing tabs, thick black cutting outlines, dashed folding fold-lines, numbered assembly tabs, minimalist child-friendly educational craft style, white background, high contrast vector sheet, vector graphic, A4 papercraft template layout, 300 DPI, precision engineering paper craft."

=== TAHAPAN PRAKTIK DI KELAS ===
1. Tahap Memotong: Mengikuti garis tepi hitam pekat.
2. Tahap Scoring: Menekan garis putus-putus dengan ujung penggaris agar lipatan rapi dan tajam.
3. Tahap Menekuk: Menekuk seluruh tab ke arah dalam.
4. Tahap Perekatan: Memberikan lem cair/stick mulai dari tab nomor 1 hingga terbentuk miniatur utuh 3D.`;
      break;
    }

    case 'mewarnai': {
      categoryName = 'Coloring Worksheet';
      title = `Lembar Mewarnai Edukatif: ${theme} - ${grade}`;
      summary = `Prompt halaman mewarnai (Coloring Page) dengan garis luar tebal, ramah anak, bebas gradasi abu-abu, dan menyisipkan fakta edukasi tematik.`;
      visualKeywords = ['coloring page', 'outline tebal', 'hitam putih', 'tanpa shading', 'fakta edukasi'];
      recommendedModel = 'Midjourney / DALL-E 3 / Canva Text-to-Image';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Ilustrator Buku Gambar & Lembar Mewarnai Edukatif Anak Internasional.
Tugas Anda: Buatlah prompt gambar dan konsep lembar mewarnai tematik bertema "${theme}" untuk siswa ${grade}.

=== SPESIFIKASI LEMBAR MEWARNAI ===
- Lembaga Pendidikan : ${schoolName}
- Guru Pengajar      : ${teacherName}
- Tingkat Kelas      : ${grade}
- Tema Gambar        : ${theme}
- Mata Pelajaran     : ${subject}
- Ukuran & Format    : Kertas ${paperSize} (${orientation})
- Gaya Ilustrasi     : Kartun ceria, garis kontur tebal (bold clean lineart), area mewarnai lapang ramah pensil warna & krayon
${notes ? `- Detail Gambar    : ${notes}` : ''}

=== PROMPT TEKS GENERASI GAMBAR AI (COPY-READY FOR MIDJOURNEY / DALL-E 3) ===
"A delightful black and white coloring page for ${grade} elementary school students, educational illustration featuring ${theme}, clean ultra-bold black outlines, thick strokes, no shading, no gradients, pure white background, charming cute smiling friendly characters, wide open coloring areas perfect for crayons, high contrast vector line art, professional children book illustration, paper size ${paperSize} ${orientation}, 8k vector finish."

=== FITUR EDUKASI PENDAMPING PADA HALAMAN ===
1. Banner Judul Mewarnai bertema "${theme}" dengan huruf berongga (bubble font) yang bisa ikut diwarnai.
2. Pojok Fakta Seru ("Tahukah Kamu?"): 1-2 kalimat fakta unik seputar ${theme} yang menambah wawasan kognitif siswa saat mewarnai.
3. Kotak Tanda Tangan Kreator Cilik: "Karya Hebat dari: ________ | Tanggal: ________ | Nilai Bintang: ⭐⭐⭐⭐⭐".`;
      break;
    }

    case 'lkpd': {
      categoryName = 'LKPD';
      title = `LKPD Terpadu Kurikulum Merdeka: ${theme} - ${grade}`;
      summary = `Prompt penyusunan Lembar Kerja Peserta Didik (LKPD) lengkap: Capaian Pembelajaran, stimulus kasus, kegiatan observasi mandiri/kelompok, dan rubrik asesmen.`;
      visualKeywords = ['LKPD lengkap', 'Capaian Pembelajaran', 'aktivitas inkuiri', 'tabel observasi', 'asesmen otentik'];
      recommendedModel = 'ChatGPT Plus / Claude 3.5 Sonnet / Gemini Pro';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Pengembang Modul Ajar dan Ahli Lembar Kerja Peserta Didik (LKPD) Inovatif Berbasis Kurikulum Merdeka.
Tugas Anda: Susunlah dokumen LKPD (Lembar Kerja Peserta Didik) lengkap, kontekstual, dan menarik untuk topik "${theme}".

=== IDENTITAS LKPD ===
- Sekolah            : ${schoolName}
- Guru Penyusun      : ${teacherName}
- Sasaran Siswa      : ${grade}
- Mata Pelajaran     : ${subject}
- Topik / Tema       : ${theme}
- Format Cetak       : Kertas ${paperSize} (${orientation})
- Bahasa Pengantar   : Bahasa ${language}
- Jumlah Aktivitas   : ${questionCount} butir tugas / eksplorasi mendalam

=== SISTEMATIKA DOKUMEN LKPD RESMI ===
1. IDENTITAS KELOMPOK / SISWA:
   - Nama Kelompok / Anggota: 1. ... 2. ... 3. ... 4. ...
   - Kelas & Tanggal Pelaksanaan.

2. CAPAIAN & TUJUAN PEMBELAJARAN (CP & TP):
   - Rumuskan Capaian Pembelajaran dan 2-3 Indikator Keberhasilan yang terukur dan aplikatif.

3. STIMULUS LITERASI & PROBLEM-BASED LEARNING:
   - Sajikan skenario masalah kontekstual nyata sehari-hari di sekitar anak terkait "${theme}".

4. ALAT DAN BAHAN:
   - Daftar perlengkapan sederhana yang mudah dijangkau (kertas, pensil warna, penggaris, gunting, bahan alam sekitar).

5. LANGKAH KERJA & LEMBAR INVESTIGASI:
   - ${questionCount} pertanyaan penuntun (guiding questions) mulai dari pengamatan fakta, pengumpulan data, analisis perbandingan, hingga kesimpulan.
   - Sediakan tabel pengamatan berkolom rapi (No, Aspek yang Diamati, Hasil Temuan, Keterangan).

6. REFLEKSI & KESIMPULAN:
   - Kotak refleksi diri peserta didik (3 pertanyaan reflektif: Apa yang kupahami? Apa yang membuatku penasaran? Bagaimana perasaanku hari ini?).

7. RUBRIK ASESMEN FORMATIF GURU:
   - Kriteria: Sangat Mahir (4), Mahir (3), Cukup (2), Perlu Bimbingan (1).`;
      break;
    }

    case 'flashcard': {
      categoryName = 'Flashcard';
      title = `Set Flashcard Edukatif Tematik: ${theme} - ${grade}`;
      summary = `Prompt set kartu pintar (Flashcard) bolak-balik: sisi ilustrasi bergambar & sisi teks kosakata, petunjuk pengucapan (phonetics), dan kartu kuis mini.`;
      visualKeywords = ['flashcard set', 'kartu kosakata', 'kartu dua sisi', 'icon ilustratif', 'garis potong kartu'];
      recommendedModel = 'Midjourney / Canva AI / ChatGPT';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Desainer Media Edukasi Kartu Pintar (Flashcard Kit) untuk Pembelajaran Aktif.
Tugas Anda: Rancang set lengkap kartu flashcard bertema "${theme}" sebanyak ${questionCount} pasang kartu edukatif.

=== PROFIL FLASHCARD ===
- Instansi           : ${schoolName}
- Kreator            : ${teacherName}
- Jenjang            : ${grade}
- Mata Pelajaran     : ${subject}
- Tema Kosakata      : ${theme}
- Jumlah Kartu       : ${questionCount} Pasang Kartu (Total ${questionCount * 2} Sisi)
- Format Cetak       : Kertas ${paperSize} (${orientation}) berisi tata letak grid kartu (4-8 kartu per lembar)
- Bahasa Kartu       : Dwi-bahasa (${language} dan padanannya)

=== SPESIFIKASI DUA SISI KARTU (FRONT & BACK) ===
SISI A (VISUAL DEPAN - KARTU GAMBAR):
- Ilustrasi objek fokus di bagian tengah, latar belakang warna pastel bersih.
- Border bingkai sudut melengkung (rounded corners) dengan ikon tema mini di pojok.
- Garis potong panduan pemotong kertas (trim marks).

SISI B (TEKS BELAKANG - KARTU INFORMASI):
- Kosakata Utama dengan huruf tebal besar (Bold Sans-Serif).
- Cara Pelafalan / Ejaan (Phonetic spelling sederhana).
- 1 Kalimat contoh kontekstual yang mudah dipahami anak usia ${grade}.
- Fakta unik / petunjuk tanya jawab mini untuk dimainkan guru/orang tua bersama anak.

=== DAFTAR ${questionCount} VOCABULARY / MATERI FLASHCARD BERTEMA "${theme}": ===
Sajikan tabel breakdown ${questionCount} objek/kata kunci yang disusun dari tingkat pengenalan paling mudah ke variasi unik, lengkap dengan deskripsi visual prompt untuk setiap kartu.`;
      break;
    }

    case 'maze': {
      categoryName = 'Maze & Puzzle';
      title = `Maze & Labirin Petualangan Edukasi: ${theme} - ${grade}`;
      summary = `Prompt labirin bertingkat (Maze Puzzle) tematik dengan rute tantangan, jebakan buntu cerdas, pos rintangan logika, dan kunci jawaban rute.`;
      visualKeywords = ['maze labirin', 'puzzle rute', 'rintangan tematik', 'titik start & finish', 'logika spasial'];
      recommendedModel = 'Midjourney / DALL-E 3 / Vector Pattern AI';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Game Designer Puzzle & Lembar Aktivitas Logika Anak Berbakat.
Tugas Anda: Buatlah rancangan lembar labirin (Maze Puzzle) edukatif dengan tema petualangan "${theme}".

=== SPESIFIKASI LABIRIN ===
- Sekolah            : ${schoolName}
- Guru Pengembang    : ${teacherName}
- Target Siswa       : ${grade}
- Mata Pelajaran     : ${subject}
- Tema Cerita        : ${theme}
- Tingkat Kesulitan  : Disesuaikan dengan ketelitian motorik & daya analisa anak ${grade}
- Ukuran Kertas      : Kertas ${paperSize} (${orientation})
- Bahasa             : Bahasa ${language}

=== SKENARIO CERITA LABIRIN ===
- Titik Mulai (START): Karakter anak petualang yang ingin mencapai tujuan terkait tema "${theme}".
- Titik Akhir (FINISH): Objek tujuan berhadiah bintang / harta karun pengetahuan.
- Jalur Rintangan: Labirin memiliki 3 jalur buntu yang masing-masing dijaga ikon halangan tematik, dan 1 jalur sukses yang melewati pos pertanyaan kecil seputar materi ${subject}.

=== PROMPT AI IMAGE GENERATOR (MIDJOURNEY / DALL-E) ===
"A high-contrast printable educational maze puzzle worksheet for children, theme: ${theme}, clear distinct maze pathways with wide corridors easy to trace with a pencil, bold black walls, white background, adorable cartoon illustration at the entrance (START) and at the exit (FINISH), engaging thematic obstacles, child-friendly vector style, no grayscale artifacts, 300 DPI, full-page layout on ${paperSize} ${orientation} paper."

=== INSTRUKSI AKTIVITAS UNTUK GURU ===
1. Ajak siswa mencari rute tercepat menggunakan jari telunjuk terlebih dahulu.
2. Gunakan pensil warna favorit untuk menandai jalur yang benar hingga ke garis finish.
3. Kunci jawaban rute disajikan dalam format skema koordinat/arah panah.`;
      break;
    }

    case 'matching': {
      categoryName = 'Matching';
      title = `Lembar Kerja Mencocokkan (Matching Worksheet): ${theme} - ${grade}`;
      summary = `Prompt lembar kerja mencocokkan dua kolom (gambar ke kata, bayangan siluet, sebab-akibat, atau konsep lawan kata) dengan titik hubung garis.`;
      visualKeywords = ['matching worksheet', 'tarik garis', 'kolom kiri kanan', 'dot connector', 'asosiasi konsep'];
      recommendedModel = 'ChatGPT / Canva Worksheet Maker / Illustrator';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Desainer Asesmen Belajar Interaktif untuk Kognisi Anak Sekolah Dasar.
Tugas Anda: Buatlah naskah lembar kerja mencocokkan (Matching / Connect the Pairs) dengan tepat ${questionCount} pasang objek bertema "${theme}".

=== SPESIFIKASI WORKSHEET ===
- Sekolah            : ${schoolName}
- Nama Guru          : ${teacherName}
- Kelas Siswa        : ${grade}
- Mata Pelajaran     : ${subject}
- Tema Materi        : ${theme}
- Jumlah Pasangan    : ${questionCount} Pasangan Soal
- Format Media       : Kertas ${paperSize} (${orientation})
- Bahasa Pengantar   : Bahasa ${language}

=== TATA LETAK KOLOM WORKSHEET ===
KOLOM KIRI (KOLOM SOAL / STIMULUS):
- Berisi ${questionCount} elemen (bisa berupa ikon gambar, pernyataan kasus, atau istilah konsep) dengan nomor urut 1 sampai ${questionCount}.
- Di sebelah kanan setiap elemen terdapat lingkaran titik kecil (Dot Connector) tempat siswa memulai menarik garis pensil.

KOLOM KANAN (KOLOM JAWABAN / PASANGAN - DIACAK):
- Berisi ${questionCount} pasangan jawaban yang posisinya diacak secara acak (huruf A, B, C, dst.) sehingga siswa harus berpikir kritis mengaitkan makna.
- Di sebelah kiri setiap elemen terdapat lingkaran titik kecil pasangannya.

=== DAFTAR PASANGAN RESMI (${questionCount} ITEMS): ===
Sajikan tabel lengkap berpasangan antara Kolom A dan Kunci Kolom B, disertai petunjuk visualisasi ikon pendukung untuk masing-masing butir agar mudah dipindahkan ke aplikasi pengolah grafis.`;
      break;
    }

    case 'tracing': {
      categoryName = 'Tracing';
      title = `Lembar Latihan Menelusuri Garis & Huruf (Tracing Sheet): ${theme} - ${grade}`;
      summary = `Prompt lembar latihan tracing pra-menulis, abjad huruf putus-putus, angka urut, dan kata tematik berpola titik penuntun arah goresan tangan.`;
      visualKeywords = ['tracing worksheet', 'huruf putus-putus', 'dot-to-dot', 'arah goresan stroke', 'pra-menulis motorik'];
      recommendedModel = 'Canva AI / DALL-E 3 / Vector Worksheet Gen';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Ahli Terapi Okupasi Motorik Halus Anak & Pengembang Lembar Latihan Menulis Awal.
Tugas Anda: Rancang lembar latihan tracing (garis dan huruf putus-putus) tematik seputar "${theme}" untuk siswa ${grade}.

=== SPESIFIKASI LEMBAR TRACING ===
- Instansi Sekolah   : ${schoolName}
- Guru Pengajar      : ${teacherName}
- Jenjang Usia       : ${grade}
- Mata Pelajaran     : ${subject}
- Tema Pelajaran     : ${theme}
- Jumlah Baris/Kata  : ${questionCount} baris latihan berjenjang
- Format Kertas      : Kertas ${paperSize} (${orientation})
- Bahasa Pengantar   : Bahasa ${language}

=== TAHAPAN TRACING PADA LEMBAR INI ===
1. BAGIAN A: LATIHAN POLA GARIS MOTORIK (Warm-up Stroke Lines):
   - Garis horizontal bergelombang, zig-zag, spiral, dan loop putus-putus dengan ilustrasi karakter "${theme}" di awal dan akhir garis.
2. BAGIAN B: TRACING HURUF & ANGKA UTAMA:
   - Font dotted outline besar dengan panah nomor penuntun arah tarikan garis pensil (stroke order directional arrows 1-2-3).
3. BAGIAN C: TRACING KATA TEMATIK "${theme}":
   - ${questionCount} kata kunci tematik dengan garis tiga panduan berjarak (baseline, midline, headline).
   - Di samping setiap kata terdapat siluet gambar hitam-putih yang dapat diwarnai setelah selesai menelusuri garis.

=== PROMPT ASSET TRACING GENERATOR AI ===
"Printable children tracing worksheet for ${grade}, theme: ${theme}, dotted dashed outline tracing lines, guiding directional stroke arrows, large clean typography, lined penmanship guide, accompanying simple outline icons ready for coloring, ultra-clean black and white on pure white background, format ${paperSize} ${orientation}, high resolution 300 DPI vector lines."`;
      break;
    }

    case 'bonus':
    default: {
      categoryName = 'Bonus Prompt Premium';
      title = `Koleksi Prompt Eksklusif Guru Kreatif: ${theme} - ${grade}`;
      summary = `Prompt komprehensif serbaguna menggabungkan proyek lintas mata pelajaran (PBL), media ajar gamifikasi, dan karya pajangan kelas.`;
      visualKeywords = ['prompt premium', 'project based learning', 'gamifikasi kelas', 'pajangan mading', 'kurikulum kreatif'];
      recommendedModel = 'Semua Model AI (ChatGPT, Claude, Gemini, Midjourney)';

      promptText = `[PROMPT EDUKASI BAHASA INDONESIA - KREASIKERTAS.STUDIO]
Peran: Anda adalah Master Trainer Edukasi Kreatif & Konsultan Inovasi Media Belajar Kertas Sekolah.
Tugas Anda: Ciptakan Master Prompt Proyek Edukasi Kertas Terintegrasi untuk topik "${theme}".

=== DATA PROYEK GURU ===
- Sekolah            : ${schoolName}
- Guru Pengampu      : ${teacherName}
- Kelas              : ${grade}
- Mata Pelajaran     : ${subject}
- Tema               : ${theme}
- Ukuran Kertas      : ${paperSize} (${orientation})
- Bahasa             : Bahasa ${language}

=== STRUKTUR MASTER PROMPT PREMIUM ===
1. RINGKASAN PROYEK BELAJAR:
   - Menghasilkan 1 karya kertas interaktif (kombinasi worksheet, papercraft mini, dan lembar refleksi mandiri).
2. STIMULUS LITERASI & NUMERASI TERPADU:
   - Teks cerita pendek dengan tabel data sederhana yang memancing daya nalar siswa ${grade}.
3. TANTANGAN AKTIVITAS (${questionCount} BUTIR):
   - Soal analisis, teka-teki logika, dan petunjuk perakitan display karya kelas.
4. INSTRUKSI BAHASA INDONESIA YANG SIAP DI-COPY PASTE:
   - Sangat terstruktur, bebas halusinasi kata, dan ramah dicetak langsung ke printer sekolah.`;
      break;
    }
  }

  return {
    id: 'gen_' + Date.now(),
    title,
    category,
    categoryName,
    promptText,
    summary,
    visualKeywords,
    recommendedModel,
    metadata: input,
    createdAt: timestamp,
  };
}
