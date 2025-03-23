import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
        waitUntil: 'networkidle2'
    });

    try {
        await page.waitForSelector('ytd-button-renderer.style-scope.ytd-consent-bump-v2-lightbox button', { timeout: 5000 });
        const buttons = await page.$$('ytd-button-renderer.style-scope.ytd-consent-bump-v2-lightbox button');
        for (const btn of buttons) {
            const text = await btn.evaluate((el) => el.textContent?.trim());
            if (text?.toLowerCase().includes('accept all')) {
                await btn.click();
                console.log('Accepted cookie banner');
                break;
            }
        }
        await new Promise((r) => setTimeout(r, 3000));
    } catch {
        console.log('No cookie banner');
    }

    console.log('Final URL:', page.url());

    const pageTitle = await page.title();

    if (!pageTitle || pageTitle.trim() === '') {
        console.error('Failed to retrieve document title');
        await browser.close();
        process.exit(1);
    }

    console.log('Page title:', pageTitle);

    await browser.close();
})();
