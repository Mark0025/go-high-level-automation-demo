const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  // Get the absolute file path
  const htmlPath = path.resolve(__dirname, 'ENHANCED_PRESENTATION.html');
  const pdfPath = path.resolve(__dirname, 'GHL_Automation_Demo.pdf');
  
  console.log('Starting Chrome headless browser...');
  
  // Launch a headless browser - use system Chrome on macOS
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to ensure everything is visible
  await page.setViewport({
    width: 1200,
    height: 1500,
    deviceScaleFactor: 2
  });
  
  console.log(`Loading HTML file: ${htmlPath}`);
  
  // Set content from file
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0',
  });
  
  // Wait for any JavaScript to execute (like Mermaid diagrams)
  console.log('Waiting for diagrams to render...');
  await page.waitForTimeout(3000);
  
  // Ensure links and buttons are properly rendered
  await page.evaluate(() => {
    // Create styled button alternatives that will show well in PDF
    const buttonContainer = document.querySelector('.text-center');
    if (buttonContainer) {
      // Get the original buttons
      const links = buttonContainer.querySelectorAll('a.cta-button');
      
      // Clear the original container
      buttonContainer.innerHTML = '';
      
      // Create new visible buttons
      const contactDiv = document.createElement('div');
      contactDiv.style.background = '#2a5885';
      contactDiv.style.color = 'white';
      contactDiv.style.padding = '12px 25px';
      contactDiv.style.borderRadius = '5px';
      contactDiv.style.fontWeight = 'bold';
      contactDiv.style.margin = '10px auto';
      contactDiv.style.width = '300px';
      contactDiv.style.textAlign = 'center';
      contactDiv.innerHTML = '<i class="fas fa-envelope" style="margin-right: 8px;"></i> Contact Me on Upwork';
      
      const contactUrl = document.createElement('div');
      contactUrl.style.fontSize = '0.8em';
      contactUrl.style.textAlign = 'center';
      contactUrl.style.marginBottom = '15px';
      contactUrl.textContent = 'https://www.upwork.com/freelancers/markcarpenter83';
      
      const portfolioDiv = document.createElement('div');
      portfolioDiv.style.background = '#4CAF50';
      portfolioDiv.style.color = 'white';
      portfolioDiv.style.padding = '12px 25px';
      portfolioDiv.style.borderRadius = '5px';
      portfolioDiv.style.fontWeight = 'bold';
      portfolioDiv.style.margin = '10px auto';
      portfolioDiv.style.width = '300px';
      portfolioDiv.style.textAlign = 'center';
      portfolioDiv.innerHTML = '<i class="fas fa-globe" style="margin-right: 8px;"></i> View Portfolio';
      
      const portfolioUrl = document.createElement('div');
      portfolioUrl.style.fontSize = '0.8em';
      portfolioUrl.style.textAlign = 'center';
      portfolioUrl.textContent = 'https://mark.aireinvesto.com';
      
      // Add them to the container
      buttonContainer.appendChild(contactDiv);
      buttonContainer.appendChild(contactUrl);
      buttonContainer.appendChild(portfolioDiv);
      buttonContainer.appendChild(portfolioUrl);
    }
  });
  
  console.log('Generating PDF...');
  
  // Generate PDF with better settings for complex content
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    },
    preferCSSPageSize: true,
    scale: 0.9 // Slight scale down to ensure content fits well
  });
  
  console.log(`PDF successfully created: ${pdfPath}`);
  
  await browser.close();
})().catch(error => {
  console.error('Error generating PDF:', error);
  process.exit(1);
}); 