import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });

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

    await page.waitForSelector('button[aria-label="Guide"]');
    await page.click('button[aria-label="Guide"]');

    await page.waitForSelector('ytd-guide-entry-renderer');
    const entries = await page.$$('ytd-guide-entry-renderer');

    for (const entry of entries) {
        const text = await entry.evaluate((el) => el.textContent?.toLowerCase());
        if (text?.includes('subscriptions')) {
            await entry.click();
            console.log('Clicked Subscriptions');
            break;
        }
    }

    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    const url = page.url();
    console.log('Current URL:', url);
    console.log('Success');
    console.log('--------------------');
    if (!url.includes('/feed/subscriptions')) {
        console.error('Not on Subscriptions page');
        process.exit(1);
    }

    await browser.close();
})();
