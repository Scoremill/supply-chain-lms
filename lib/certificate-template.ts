
/**
 * Certificate HTML Template Generator
 * Creates a beautiful, modern construction-themed certificate
 * Company: Strategem.Pro
 * Version: 2.0 - Corrected company spelling
 */

export function generateCertificateHTML(studentName: string, completionDate: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate of Completion</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: 11in;
      height: 8.5in;
      margin: 0;
      padding: 0;
      font-family: 'Georgia', 'Times New Roman', serif;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .certificate-container {
      width: 100%;
      height: 100%;
      padding: 0.75in;
      background: linear-gradient(135deg, #FFF5E6 0%, #FFFFFF 50%, #FFF9F0 100%);
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    /* Decorative border */
    .certificate-container::before {
      content: '';
      position: absolute;
      top: 0.5in;
      left: 0.5in;
      right: 0.5in;
      bottom: 0.5in;
      border: 3px solid #F59E0B;
      pointer-events: none;
    }
    
    .certificate-container::after {
      content: '';
      position: absolute;
      top: 0.55in;
      left: 0.55in;
      right: 0.55in;
      bottom: 0.55in;
      border: 1px solid #FCD34D;
      pointer-events: none;
    }
    
    /* Header with logo */
    .header {
      text-align: center;
      margin-bottom: 0.3in;
      position: relative;
      z-index: 1;
    }
    
    .logo {
      height: 0.8in;
      margin-bottom: 0.15in;
    }
    
    /* Main title */
    .title {
      font-size: 48pt;
      font-weight: 700;
      color: #1F2937;
      margin-bottom: 0.1in;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    
    .subtitle {
      font-size: 16pt;
      color: #6B7280;
      font-style: italic;
      margin-bottom: 0.3in;
    }
    
    /* Body content */
    .body {
      text-align: center;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      z-index: 1;
      margin-top: -0.2in;
    }
    
    .presented-to {
      font-size: 14pt;
      color: #6B7280;
      margin-bottom: 0.15in;
      font-weight: 500;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    
    .student-name {
      font-size: 42pt;
      font-weight: 700;
      color: #F59E0B;
      margin-bottom: 0.25in;
      font-family: 'Georgia', serif;
      border-bottom: 2px solid #FCD34D;
      padding-bottom: 0.1in;
      display: inline-block;
      min-width: 5in;
    }
    
    .congratulations {
      font-size: 13pt;
      color: #374151;
      line-height: 1.6;
      max-width: 7in;
      margin: 0 auto 0.25in;
      font-weight: 400;
    }
    
    .course-name {
      font-size: 18pt;
      font-weight: 700;
      color: #1F2937;
      margin-bottom: 0.15in;
      letter-spacing: 1px;
    }
    
    .achievement-text {
      font-size: 12pt;
      color: #6B7280;
      line-height: 1.5;
      max-width: 7in;
      margin: 0 auto;
    }
    
    /* Footer */
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 0.3in;
      position: relative;
      z-index: 1;
    }
    
    .date-section,
    .signature-section {
      text-align: center;
      flex: 1;
    }
    
    .date-section {
      text-align: left;
    }
    
    .signature-section {
      text-align: right;
    }
    
    .label {
      font-size: 11pt;
      color: #9CA3AF;
      margin-bottom: 0.05in;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
    
    .value {
      font-size: 14pt;
      color: #1F2937;
      font-weight: 600;
      border-top: 2px solid #F59E0B;
      padding-top: 0.05in;
      min-width: 2.5in;
      display: inline-block;
    }
    
    /* Construction theme accent */
    .construction-icon {
      position: absolute;
      opacity: 0.03;
      font-size: 200pt;
      color: #F59E0B;
      z-index: 0;
    }
    
    .construction-icon.top-left {
      top: 1in;
      left: 1in;
    }
    
    .construction-icon.bottom-right {
      bottom: 1in;
      right: 1in;
    }
  </style>
</head>
<body>
  <div class="certificate-container">
    <!-- Construction theme watermarks -->
    <div class="construction-icon top-left">🏗️</div>
    <div class="construction-icon bottom-right">🏠</div>
    
    <!-- Header -->
    <div class="header">
      <img src="data:image/png;base64,LOGO_BASE64_PLACEHOLDER" alt="Strategem Logo" class="logo">
      <div class="title">Certificate</div>
      <div class="subtitle">of Completion</div>
    </div>
    
    <!-- Body -->
    <div class="body">
      <div class="presented-to">This Certificate is Proudly Presented to</div>
      <div class="student-name">${studentName}</div>
      
      <p class="congratulations">
        Congratulations on successfully completing the comprehensive
      </p>
      <div class="course-name">"Residential Construction Supply Chain Overview"</div>
      <p class="achievement-text">
        training program. Your dedication to mastering the essential skills and knowledge<br>
        of construction supply chain management demonstrates exceptional commitment to professional excellence.
      </p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="date-section">
        <div class="label">Date of Completion</div>
        <div class="value">${completionDate}</div>
      </div>
      
      <div class="signature-section">
        <div class="label">Certified By</div>
        <div class="value">Strategem.Pro</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
