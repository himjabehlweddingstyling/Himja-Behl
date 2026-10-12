const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, 'presentation-board-temp');

const ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/story', name: 'Story' },
  { path: '/journeys', name: 'Journeys' }
];

const VIEWPORTS = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 812 }
];

async function generateBoard() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

  console.log('🚀 Launching browser and capturing screenshots...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  const screenshots = [];

  // Capture all screenshots first
  for (const route of ROUTES) {
    const routeScreenshots = { routeName: route.name, images: [] };
    for (const viewport of VIEWPORTS) {
      const page = await browser.newPage();
      await page.emulateMediaType('screen');
      await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
      
      console.log(`📸 Snapping ${route.name} on ${viewport.name}...`);
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle0', timeout: 60000 });
      
      // Inject CSS to instantly disable transitions and force opacity so Framer Motion doesn't leave things blank
      await page.addStyleTag({
        content: `
          * {
            transition: none !important;
            animation: none !important;
          }
        `
      });

      // Scroll down in viewport-sized chunks to trigger all lazy loading & whileInView animations
      await page.evaluate(async (vh) => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const timer = setInterval(() => {
            window.scrollBy(0, vh);
            totalHeight += vh;
            if (totalHeight >= document.body.scrollHeight) {
              clearInterval(timer); resolve();
            }
          }, 800); // wait 800ms per screen for any remaining JS logic to fire
        });
      }, viewport.height);
      
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise(r => setTimeout(r, 1000));
      
      const filename = `${route.name}-${viewport.name}.png`;
      const filepath = path.join(OUT_DIR, filename);
      await page.screenshot({ path: filepath, fullPage: true });
      
      routeScreenshots.images.push({ device: viewport.name, path: filename });
      await page.close();
    }
    screenshots.push(routeScreenshots);
  }

  // Generate HTML Board mimicking a Figma canvas
  console.log('🎨 Assembling massive Figma-style canvas...');
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { 
        background: #F5F5F5; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
        padding: 200px; 
        margin: 0; 
        width: max-content; /* CRITICAL: Prevents horizontal cutoff in PDF */
        height: max-content;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 40px;
        margin-bottom: 150px;
      }
      h1 { font-size: 100px; color: #222; margin: 0; font-weight: 800; letter-spacing: -2px; }
      .badge { background: #000; color: #fff; font-size: 30px; padding: 15px 40px; border-radius: 100px; font-weight: bold; }
      
      .board { display: flex; flex-direction: row; gap: 300px; align-items: flex-start; }
      .column { display: flex; flex-direction: column; gap: 200px; align-items: center; }
      .column-title { font-size: 70px; color: #111; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; padding-bottom: 20px; border-bottom: 8px solid #000; margin-bottom: 50px; }
      
      .device-block { display: flex; flex-direction: column; align-items: center; gap: 30px; }
      .device-title { font-size: 40px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
      
      img { 
        border-radius: 20px; 
        box-shadow: 0 40px 100px rgba(0,0,0,0.15); 
        border: 4px solid #E0E0E0;
        background: #fff;
        display: block;
      }
      
      .desktop img { width: 1440px; }
      .tablet img { width: 768px; }
      .mobile img { width: 375px; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>User Flow & Responsive Specs</h1>
      <div class="badge">Generated Canvas</div>
    </div>
    <div class="board">
  `;

  for (const sc of screenshots) {
    html += `<div class="column"><div class="column-title">${sc.routeName}</div>`;
    for (const img of sc.images) {
      html += `
        <div class="device-block ${img.device.toLowerCase()}">
          <div class="device-title">${img.device} View</div>
          <img src="${img.path}" />
        </div>
      `;
    }
    html += `</div>`;
  }

  html += `
    </div>
  </body>
  </html>
  `;

  const htmlPath = path.join(OUT_DIR, 'board.html');
  fs.writeFileSync(htmlPath, html);

  // Convert HTML Board to massive PDF
  console.log('🖨️ Exporting the canvas as a single massive PDF...');
  const boardPage = await browser.newPage();
  await boardPage.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  const bodyHandle = await boardPage.$('body');
  const boundingBox = await bodyHandle.boundingBox();

  // Create a massive custom-sized PDF containing the whole canvas
  await boardPage.pdf({
    path: path.join(__dirname, 'Full-Wireframe-Board-Fixed.pdf'),
    printBackground: true,
    width: `${Math.ceil(boundingBox.width) + 400}px`,
    height: `${Math.ceil(boundingBox.height) + 400}px`,
    pageRanges: '1',
  });

  await browser.close();
  
  // Clean up the temp images
  fs.readdirSync(OUT_DIR).forEach(f => fs.unlinkSync(path.join(OUT_DIR, f)));
  fs.rmdirSync(OUT_DIR);

  console.log('🎉 Done! Look for "Full-Wireframe-Board-Fixed.pdf" in your main folder!');
}

generateBoard().catch(console.error);
