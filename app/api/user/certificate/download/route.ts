import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { readFileSync } from "fs";
import { join } from "path";

// Convert title case helper
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Gold color matching #F59E0B
const GOLD = rgb(0.96, 0.62, 0.04);
// Light gold for inner border matching #FCD34D
const LIGHT_GOLD = rgb(0.99, 0.83, 0.30);
// Dark text matching #1F2937
const DARK_TEXT = rgb(0.12, 0.16, 0.22);
// Gray text matching #6B7280
const GRAY_TEXT = rgb(0.42, 0.45, 0.50);
// Light gray text matching #9CA3AF
const LIGHT_GRAY = rgb(0.61, 0.64, 0.69);
// Warm background tint
const WARM_BG = rgb(1.0, 0.98, 0.95);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        progress: {
          include: {
            module: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check eligibility (all 10 modules passed at 70%+)
    const allModules = await prisma.module.findMany({
      where: {
        moduleNumber: {
          gte: 1,
          lte: 10
        }
      },
      orderBy: {
        moduleNumber: 'asc'
      }
    });

    if (allModules.length !== 10) {
      return NextResponse.json({
        error: "Course structure incomplete",
        eligible: false
      }, { status: 500 });
    }

    // Check if all modules are completed with 70%+
    const allPassed = allModules.every((module: any) => {
      const progress = user.progress.find((p: any) => p.moduleId === module.id);
      return progress?.quizPassed && (progress?.quizScore || 0) >= 70;
    });

    if (!allPassed) {
      return NextResponse.json({
        error: "Not eligible for certificate. All 10 modules must be passed with 70% or higher.",
        eligible: false
      }, { status: 403 });
    }

    // Get completion date
    let completionDate: Date;

    if (user.courseCompletedAt) {
      completionDate = user.courseCompletedAt;
    } else {
      const completedProgresses = user.progress
        .filter((p: any) => p.quizPassed && p.completedAt)
        .sort((a: any, b: any) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));

      completionDate = completedProgresses[0]?.completedAt || new Date();

      await prisma.user.update({
        where: { id: user.id },
        data: { courseCompletedAt: completionDate }
      });
    }

    const formattedDate = `${completionDate.getMonth() + 1}/${completionDate.getDate()}/${completionDate.getFullYear()}`;
    const studentName = toTitleCase(user.name || user.email.split('@')[0]);

    // Generate PDF with pdf-lib
    const pdfDoc = await PDFDocument.create();

    // Landscape Letter: 792 x 612 points (11in x 8.5in at 72 dpi)
    const page = pdfDoc.addPage([792, 612]);
    const { width, height } = page.getSize();

    // Embed fonts
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // --- Background ---
    page.drawRectangle({
      x: 0, y: 0, width, height,
      color: WARM_BG,
    });

    // --- Outer gold border (3pt) ---
    const outerMargin = 36; // 0.5in
    page.drawRectangle({
      x: outerMargin,
      y: outerMargin,
      width: width - 2 * outerMargin,
      height: height - 2 * outerMargin,
      borderColor: GOLD,
      borderWidth: 3,
    });

    // --- Inner gold border (1pt) ---
    const innerMargin = 39.6; // 0.55in
    page.drawRectangle({
      x: innerMargin,
      y: innerMargin,
      width: width - 2 * innerMargin,
      height: height - 2 * innerMargin,
      borderColor: LIGHT_GOLD,
      borderWidth: 1,
    });

    // --- Embed logo ---
    try {
      const logoPath = join(process.cwd(), 'public', 'stratagem-logo-full.png');
      const logoBytes = readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(1);
      // Scale logo to ~0.8in height (57.6pt), maintain aspect ratio
      const logoHeight = 57.6;
      const logoWidth = (logoDims.width / logoDims.height) * logoHeight;
      page.drawImage(logoImage, {
        x: (width - logoWidth) / 2,
        y: height - 54 - logoHeight, // 0.75in from top
        width: logoWidth,
        height: logoHeight,
      });
    } catch (logoError) {
      console.error("Could not embed logo:", logoError);
    }

    // --- "CERTIFICATE" title ---
    const titleText = "CERTIFICATE";
    const titleFontSize = 48;
    const titleWidth = timesRomanBold.widthOfTextAtSize(titleText, titleFontSize);
    page.drawText(titleText, {
      x: (width - titleWidth) / 2,
      y: height - 150,
      size: titleFontSize,
      font: timesRomanBold,
      color: DARK_TEXT,
    });

    // --- "of Completion" subtitle ---
    const subtitleText = "of Completion";
    const subtitleFontSize = 16;
    const subtitleWidth = timesRomanItalic.widthOfTextAtSize(subtitleText, subtitleFontSize);
    page.drawText(subtitleText, {
      x: (width - subtitleWidth) / 2,
      y: height - 172,
      size: subtitleFontSize,
      font: timesRomanItalic,
      color: GRAY_TEXT,
    });

    // --- "THIS CERTIFICATE IS PROUDLY PRESENTED TO" ---
    const presentedText = "THIS CERTIFICATE IS PROUDLY PRESENTED TO";
    const presentedFontSize = 11;
    const presentedWidth = helvetica.widthOfTextAtSize(presentedText, presentedFontSize);
    page.drawText(presentedText, {
      x: (width - presentedWidth) / 2,
      y: height - 225,
      size: presentedFontSize,
      font: helvetica,
      color: GRAY_TEXT,
    });

    // --- Student name ---
    // Dynamically size the font to fit within 6 inches (432pt)
    let nameFontSize = 42;
    const maxNameWidth = 432;
    let nameWidth = timesRomanBold.widthOfTextAtSize(studentName, nameFontSize);
    while (nameWidth > maxNameWidth && nameFontSize > 20) {
      nameFontSize -= 2;
      nameWidth = timesRomanBold.widthOfTextAtSize(studentName, nameFontSize);
    }

    const nameY = height - 275;
    page.drawText(studentName, {
      x: (width - nameWidth) / 2,
      y: nameY,
      size: nameFontSize,
      font: timesRomanBold,
      color: GOLD,
    });

    // --- Gold line under name ---
    const lineWidth = Math.max(nameWidth + 40, 360); // At least 5in
    page.drawLine({
      start: { x: (width - lineWidth) / 2, y: nameY - 12 },
      end: { x: (width + lineWidth) / 2, y: nameY - 12 },
      thickness: 2,
      color: LIGHT_GOLD,
    });

    // --- Congratulations text ---
    const congrats1 = "Congratulations on successfully completing the comprehensive";
    const congrats1FontSize = 13;
    const congrats1Width = timesRoman.widthOfTextAtSize(congrats1, congrats1FontSize);
    page.drawText(congrats1, {
      x: (width - congrats1Width) / 2,
      y: height - 320,
      size: congrats1FontSize,
      font: timesRoman,
      color: DARK_TEXT,
    });

    // --- Course name ---
    const courseText = '"How To Build A Home"';
    const courseFontSize = 18;
    const courseWidth = timesRomanBold.widthOfTextAtSize(courseText, courseFontSize);
    page.drawText(courseText, {
      x: (width - courseWidth) / 2,
      y: height - 345,
      size: courseFontSize,
      font: timesRomanBold,
      color: DARK_TEXT,
    });

    // --- Achievement text line 1 ---
    const achieve1 = "training program. Your dedication to mastering the essential skills and knowledge";
    const achieveFontSize = 12;
    const achieve1Width = timesRoman.widthOfTextAtSize(achieve1, achieveFontSize);
    page.drawText(achieve1, {
      x: (width - achieve1Width) / 2,
      y: height - 372,
      size: achieveFontSize,
      font: timesRoman,
      color: GRAY_TEXT,
    });

    // --- Achievement text line 2 ---
    const achieve2 = "of residential construction demonstrates exceptional commitment to professional excellence.";
    const achieve2Width = timesRoman.widthOfTextAtSize(achieve2, achieveFontSize);
    page.drawText(achieve2, {
      x: (width - achieve2Width) / 2,
      y: height - 390,
      size: achieveFontSize,
      font: timesRoman,
      color: GRAY_TEXT,
    });

    // --- Footer section ---
    const footerY = 80;
    const footerLabelSize = 11;
    const footerValueSize = 14;

    // --- Date of Completion (left side) ---
    const dateLabel = "DATE OF COMPLETION";
    page.drawText(dateLabel, {
      x: 90,
      y: footerY + 25,
      size: footerLabelSize,
      font: helvetica,
      color: LIGHT_GRAY,
    });

    // Gold line above date value
    page.drawLine({
      start: { x: 80, y: footerY + 18 },
      end: { x: 280, y: footerY + 18 },
      thickness: 2,
      color: GOLD,
    });

    page.drawText(formattedDate, {
      x: 90,
      y: footerY,
      size: footerValueSize,
      font: timesRomanBold,
      color: DARK_TEXT,
    });

    // --- Certified By (right side) ---
    const certLabel = "CERTIFIED BY";
    const certLabelWidth = helvetica.widthOfTextAtSize(certLabel, footerLabelSize);
    page.drawText(certLabel, {
      x: width - 90 - certLabelWidth,
      y: footerY + 25,
      size: footerLabelSize,
      font: helvetica,
      color: LIGHT_GRAY,
    });

    // Gold line above certified value
    page.drawLine({
      start: { x: width - 280, y: footerY + 18 },
      end: { x: width - 80, y: footerY + 18 },
      thickness: 2,
      color: GOLD,
    });

    const certValue = "Strategem.Pro";
    const certValueWidth = timesRomanBold.widthOfTextAtSize(certValue, footerValueSize);
    page.drawText(certValue, {
      x: width - 90 - certValueWidth,
      y: footerY,
      size: footerValueSize,
      font: timesRomanBold,
      color: DARK_TEXT,
    });

    // --- Generate PDF bytes ---
    const pdfBytes = await pdfDoc.save();
    const fileName = `certificate-${user.id}.pdf`;

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error("Error generating certificate:", error);
    return NextResponse.json({
      error: "Failed to generate certificate",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
