const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Make sure your Next.js server is running on localhost:3000 before running this!
const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, 'website-pdfs');

// The pages you want to capture
const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/story', name: 'story' },
  { path: '/journeys', name: 'journeys' },
  { path: '/journeys/tushar-behl', name: 'journey-tushar' },
  { path: '/journeys/vishakha-sharma', name: 'journey-vishakha' },
  { path: '/journeys/vrinda-mittal', name: 'journey-vrinda' }
];

// The devices to simulate
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 }
};

async function generatePDFs() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR);
  }

  console.log('🚀 Launching headless browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  for (const route of ROUTES) {
    for (const [deviceName, viewport] of Object.entries(VIEWPORTS)) {
      const page = await browser.newPage();
      
      // Force it to use normal CSS rather than print CSS
      await page.emulateMediaType('screen');
      await page.setViewport(viewport);
      
      const url = `${BASE_URL}${route.path}`;
      console.log(`\n📸 Processing: ${route.name} (${deviceName})`);
      
      try {
        // Wait until there are no active network requests (so fonts/images load)
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        
        // --- LAZY LOAD & ANIMATION FIX ---
        // Scroll down the entire page slowly to trigger Framer Motion animations 
        // and Next.js lazy-loaded images, then scroll back to top.
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;
              if (totalHeight >= scrollHeight) {
                clearInterval(timer);
                resolve();
              }
            }, 50); // 50ms per scroll tick
          });
        });
        
        // Scroll back to the top
        await page.evaluate(() => window.scrollTo(0, 0));
        
        // Wait 2 seconds for any final animations to settle
        await new Promise(r => setTimeout(r, 2000));

        // Get the full height of the rendered page
        const bodyHandle = await page.$('body');
        const boundingBox = await bodyHandle.boundingBox();
        const fullHeight = Math.ceil(boundingBox.height);
        
        const filename = `${route.name}-${deviceName}.pdf`;
        const outputPath = path.join(OUT_DIR, filename);
        
        // Save as a continuous single-page PDF (like a super tall image)
        await page.pdf({
          path: outputPath,
          printBackground: true,
          width: `${viewport.width}px`,
          height: `${fullHeight}px`, 
          pageRanges: '1', // Ensure it doesn't break into multiple pages
        });
        
        console.log(`✅ Saved: ${filename}`);
      } catch (err) {
        console.error(`❌ Failed on ${route.name} (${deviceName}):`, err.message);
      }
      
      await page.close();
    }
  }

  await browser.close();
  console.log(`\n🎉 All done! Your PDFs are in the /website-pdfs folder.`);
}

generatePDFs().catch(console.error);
