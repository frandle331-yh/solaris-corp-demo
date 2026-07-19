/* portfolio screenshots generator (runs in GitHub Actions) */
const { chromium } = require('playwright');
const path = require('path');
const root = path.resolve(__dirname, '..');
const f = p => 'file://' + path.join(root, p);

(async () => {
  const browser = await chromium.launch();

  async function fullshot(page, url, out) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90));
      }
      window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 500));
    });
    await page.screenshot({ path: out, fullPage: true });
    console.log('saved', out);
  }

  // cover 1000x782
  const cover = await browser.newPage({ viewport: { width: 1000, height: 782 } });
  await cover.goto(f('portfolio/cover.html'), { waitUntil: 'networkidle' });
  await cover.waitForTimeout(4000);
  await cover.screenshot({ path: path.join(root, 'portfolio/cover.png') });
  console.log('saved cover');

  const pc = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await fullshot(pc, f('index.html'), path.join(root, 'portfolio/site-desktop.png'));
  await fullshot(pc, f('news.html'), path.join(root, 'portfolio/site-news.png'));

  const sp = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await fullshot(sp, f('index.html'), path.join(root, 'portfolio/site-mobile.png'));

  await browser.close();
})();
