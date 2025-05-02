const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  // Get the absolute file path
  const htmlPath = path.resolve(__dirname, 'ENHANCED_PRESENTATION.html');
  const pdfPath = path.resolve(__dirname, 'GHL_Automation_Demo.pdf');
  
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log(`Loading HTML file: ${htmlPath}`);
  
  // Set content from file
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
  });
  
  // Wait for any JavaScript to execute (like Mermaid diagrams)
  await page.waitForTimeout(2000);
  
  console.log('Generating PDF...');
  
  // Generate PDF
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    }
  });
  
  console.log(`PDF successfully created: ${pdfPath}`);
  
  await browser.close();
})().catch(error => {
  console.error('Error generating PDF:', error);
  process.exit(1);
}); 