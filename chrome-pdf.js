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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
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
    timeout: 30000 // Increase timeout to 30 seconds
  });
  
  // Wait for any JavaScript to execute (like Mermaid diagrams)
  console.log('Waiting for diagrams to render...');
  await page.waitForTimeout(5000); // Increase wait time to 5 seconds
  
  // Ensure all Font Awesome icons are loaded
  await page.addStyleTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
  });
  
  // Add custom CSS to ensure buttons have white text
  await page.addStyleTag({
    content: `
      .cta-button, 
      a[style*="background-color: #2a5885"], 
      a[style*="background: #2a5885"],
      a[style*="background-color: #4CAF50"], 
      a[style*="background: #4CAF50"] {
        color: white !important;
        text-decoration: none !important;
        font-weight: bold !important;
      }
      
      .play-button-container {
        position: relative;
        display: inline-block;
        margin: 0 auto;
      }
      
      .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
      }
      
      .play-triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 15px 0 15px 30px;
        border-color: transparent transparent transparent white;
        margin-left: 8px;
      }
    `
  });
  
  // Wait for styles to apply
  await page.waitForTimeout(2000);
  
  // Replace entire video section with simplified HTML
  await page.evaluate(() => {
    const videoSection = document.querySelector('.section:nth-child(3)');
    if (videoSection) {
      const videoUrl = 'https://www.loom.com/share/941d14d5d2434e708e2b7dbef9461007?sid=1ad2c0f6-da22-4c05-9e7d-bf323f16ae49';
      
      // Replace with simplified HTML structure
      videoSection.innerHTML = `
        <h2>Video Demonstration</h2>
        <h3>Here is a video outlining what we could do for you</h3>
        
        <div style="text-align: center; margin: 20px 0;">
          <div class="play-button-container">
            <a href="${videoUrl}" target="_blank">
              <img src="https://cdn.loom.com/sessions/thumbnails/941d14d5d2434e708e2b7dbef9461007-with-play.gif" 
                  alt="Video Demo" 
                  style="max-width: 600px; width: 100%; border: 1px solid #ddd; border-radius: 4px; display: block;">
              <div class="play-button">
                <div class="play-triangle"></div>
              </div>
            </a>
          </div>
        </div>
        
        <p style="text-align: center; font-size: 1.2em; margin-top: 15px; color: #2a5885;">
          <strong>Click the image to watch the video demonstration</strong>
        </p>
        
        <div style="text-align: center; margin: 20px 0; padding: 15px; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 5px;">
          <strong>Video Link:</strong> <a href="${videoUrl}" style="color: #2a5885; word-break: break-all;">${videoUrl}</a>
        </div>
      `;
    }
    
    // Update portfolio section buttons with simplified HTML
    const aboutSection = document.querySelector('.section:nth-child(8)');
    if (aboutSection) {
      const buttonContainer = aboutSection.querySelector('.text-center');
      if (buttonContainer) {
        buttonContainer.innerHTML = `
          <a href="https://www.upwork.com/freelancers/markcarpenter83" 
             target="_blank"
             style="display: inline-block; margin: 10px; padding: 8px 16px; background: #2a4d7a; color: white !important; border-radius: 4px; text-decoration: none !important; font-weight: bold;">
            ✉️ Contact Me
          </a>
          
          <a href="https://mark.aireinvestor.com" 
             target="_blank"
             style="display: inline-block; margin: 10px; padding: 8px 16px; background: #4CAF50; color: white !important; border-radius: 4px; text-decoration: none !important; font-weight: bold;">
            🌐 View Portfolio
          </a>
        `;
      }
      
      // Fix any other instances of the incorrect URL
      aboutSection.querySelectorAll('a[href*="aireinvesto"]').forEach(link => {
        link.href = link.href.replace('aireinvesto', 'aireinvestor');
        link.textContent = link.textContent.replace('aireinvesto', 'aireinvestor');
      });
    }
    
    // Also fix URLs in the footer section
    document.querySelectorAll('footer a[href*="aireinvesto"]').forEach(link => {
      link.href = link.href.replace('aireinvesto', 'aireinvestor');
      link.textContent = link.textContent.replace('aireinvesto', 'aireinvestor');
    });
    
    // Find any other instances of the blue button and ensure text is white
    document.querySelectorAll('a.cta-button, a[style*="background-color: #2a5885"], a[style*="background: #2a5885"]').forEach(btn => {
      btn.style.color = 'white';
      btn.style.textDecoration = 'none';
      btn.style.fontWeight = 'bold';
    });
  });
  
  // Wait for any additional rendering
  await page.waitForTimeout(2000);
  
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