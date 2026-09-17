import { jsPDF } from 'jspdf';
import { GeneratedPromptResult, SavedPromptItem } from '../types';

export function downloadPromptAsPDF(
  item: GeneratedPromptResult | SavedPromptItem,
  customNotes?: string
) {
  const meta = 'metadata' in item ? item.metadata : item;
  const isLandscape = meta.orientation === 'Landscape';

  const doc = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner: Emerald Green theme
  doc.setFillColor(4, 120, 87); // #047857 Emerald 700
  doc.rect(0, 0, pageWidth, 24, 'F');

  // App Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('KREASIKERTAS.STUDIO', margin, 11);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(209, 250, 229); // emerald-100
  doc.text('Platform Generator Prompt Edukasi Bahasa Indonesia Guru Profesional', margin, 17);

  // Date in header right
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(dateStr, pageWidth - margin, 14, { align: 'right' });

  // Metadata Card Box
  let y = 30;
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'FD');

  // Metadata Details
  const school = meta.schoolName || 'SD Muhammadiyah 16 Surabaya';
  const teacher = meta.teacherName || 'Eko Wahyudi';
  const grade = meta.grade || 'SD Kelas 5';
  const subject = meta.subject || 'Bahasa Inggris';
  const theme = meta.theme || 'Animals & Fruits';
  const qCount = meta.questionCount || 10;
  const size = meta.paperSize || 'A4';
  const orient = meta.orientation || 'Portrait';
  const lang = meta.language || 'Indonesia';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42); // slate-900

  // Column 1
  doc.text(`Sekolah : ${school}`, margin + 4, y + 7);
  doc.text(`Guru     : ${teacher}`, margin + 4, y + 14);
  doc.text(`Kelas    : ${grade}`, margin + 4, y + 21);
  doc.text(`Mapel    : ${subject}`, margin + 4, y + 28);

  // Column 2
  const col2X = margin + contentWidth * 0.52;
  doc.text(`Tema         : ${theme}`, col2X, y + 7);
  doc.text(`Jumlah Soal : ${qCount} Butir`, col2X, y + 14);
  doc.text(`Spesifikasi  : ${size} (${orient})`, col2X, y + 21);
  doc.text(`Bahasa       : ${lang}`, col2X, y + 28);

  y += 40;

  // Title of the Prompt
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(5, 150, 105); // emerald-600
  doc.text(item.title, margin, y);
  y += 6;

  // Divider Line
  doc.setDrawColor(16, 185, 129); // emerald-500
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Prompt Content Box
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59); // slate-800

  const lines = doc.splitTextToSize(item.promptText, contentWidth);
  const lineHeight = 4.3;

  for (let i = 0; i < lines.length; i++) {
    if (y + lineHeight > pageHeight - 16) {
      // Add new page
      doc.addPage();
      
      // Secondary header
      doc.setFillColor(4, 120, 87);
      doc.rect(0, 0, pageWidth, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(`KREASIKERTAS.STUDIO — ${item.title} (Lanjutan)`, margin, 7);
      
      y = 16;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
    }

    doc.text(lines[i], margin, y);
    y += lineHeight;
  }

  // Footer on current page
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(
    'KREASIKERTAS.STUDIO • Seluruh hak cipta modul dilindungi • Siap disalin ke ChatGPT / Claude / Gemini / Midjourney',
    pageWidth / 2,
    pageHeight - 6,
    { align: 'center' }
  );

  const safeFileName = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .substring(0, 45);

  doc.save(`kreasikertas_${safeFileName}.pdf`);
}
