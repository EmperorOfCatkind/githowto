import { expect, test } from '@playwright/test';
import YouTubePage from 'src/pages/youtube.page';

test.describe('YouTube Playwright Test Suite', () => {
    test('Should check the YouTube logo navigates to homepage', async ({ page }) => {
        const yt = new YouTubePage(page);
        await yt.goToHome();
        await yt.clickLogo();
        await expect(page).toHaveURL('https://www.youtube.com/');
    });

    test('Should navigate to Trending and check video titles', async ({ page }) => {
        const yt = new YouTubePage(page);
        await yt.goToHome();
        await yt.goToTrending();
        await yt.verifyFirstTrendingVideoTitle();
    });

    test('Should navigate to the Subscriptions page via sidebar', async ({ page }) => {
        const yt = new YouTubePage(page);
        await yt.goToHome();
        await yt.goToSubscriptions();
    });

    test('Should retrieve the video page title', async ({ page }) => {
        const yt = new YouTubePage(page);
        await yt.openVideo('dQw4w9WgXcQ');
        await yt.expectTitleToBePresent();
    });
});
