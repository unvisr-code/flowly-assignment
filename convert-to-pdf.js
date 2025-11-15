const path = require('path');
const puppeteer = require('puppeteer');

async function main() {
  const userDataDir = path.resolve(__dirname, '.puppeteer-data');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-crash-reporter', '--no-crash-upload'],
    userDataDir,
  });
  try {
    const page = await browser.newPage();
    const fileUrl = `file://${path.resolve(__dirname, 'landing.html')}`;
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: path.resolve(__dirname, 'landing.pdf'),
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
    });
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Failed to export landing.html to PDF:', error);
  process.exitCode = 1;
});
