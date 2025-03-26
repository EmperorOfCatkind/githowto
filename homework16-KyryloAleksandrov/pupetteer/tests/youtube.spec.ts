import { expect } from 'chai';
import puppeteer, { Browser, Page } from 'puppeteer';

describe('YouTube UI Tests', function () {
    this.timeout(30000);
    let browser: Browser;
    let page: Page;

    const acceptCookiesIfVisible = async (newPage: Page):Promise<void> => {
        try {
            await newPage.waitForSelector('ytd-button-renderer.style-scope.ytd-consent-bump-v2-lightbox button', { timeout: 5000 });
            const buttons = await newPage.$$('ytd-button-renderer.style-scope.ytd-consent-bump-v2-lightbox button');
            for (const btn of buttons) {
                const text = await btn.evaluate(el => el.textContent?.trim());
                if (text?.toLowerCase().includes('accept all')) {
                    await btn.click();
                    break;
                }
            }
            await new Promise(res => setTimeout(res, 3000));
        } catch {
            console.log('No cookie banner');
        }
    };

    beforeEach(async () => {
        browser = await puppeteer.launch({ headless: false, defaultViewport: null });
        page = await browser.newPage();
        return { browser, page };
    });

    afterEach(async () => {
        await browser.close();
    });

    it('should navigate to the Subscriptions page via sidebar', async () => {
        await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });
        await acceptCookiesIfVisible(page);

        await page.waitForSelector('button[aria-label="Guide"]');
        await page.click('button[aria-label="Guide"]');

        await page.waitForSelector('ytd-guide-entry-renderer');
        const entries = await page.$$('ytd-guide-entry-renderer');

        let clicked = false;
        for (const entry of entries) {
            const text = await entry.evaluate(el => el.textContent?.toLowerCase());
            if (text?.includes('subscriptions')) {
                await entry.click();
                clicked = true;
                break;
            }
        }

        expect(clicked).to.be.true;

        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        const url = page.url();
        expect(url).to.include('/feed/subscriptions');
    });

    it('should retrieve the video page title', async () => {
        await page.goto('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
            waitUntil: 'networkidle2'
        });

        await acceptCookiesIfVisible(page);

        const pageTitle = await page.title();
        expect(pageTitle).to.be.a('string').and.to.have.length.greaterThan(0);
    });
});
