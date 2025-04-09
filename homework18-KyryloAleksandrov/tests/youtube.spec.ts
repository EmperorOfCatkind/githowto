import test, { expect } from 'playwright/test';
import { GeneralHelper } from 'src/helpers/general-helper';
import { YouTubeHomePage } from 'src/pages/youtube-home.page';
import { YouTubeSubscriptionsPage } from 'src/pages/youtube-subscriptions.page';
import { YouTubeTrendingPage } from 'src/pages/youtube-trending.page';
import { YouTubeVideoPage } from 'src/pages/youtube-video.page';


test.describe('YouTube Playwright Test Suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.youtube.com/');
        const cookieHelper = new GeneralHelper(page);
        await cookieHelper.acceptIfVisible();
    });

    test('Should check the YouTube logo navigates to homepage', async ({ page }) => {
        const home = new YouTubeHomePage(page);
        await home.clickLogo();
        await expect(page).toHaveURL('https://www.youtube.com/');
    });

    test('Should navigate to Trending and check video titles', async ({ page }) => {
        const home = new YouTubeHomePage(page);
        await home.openSideBar();
        await home.trendingLink.click();

        const trendingPage = new YouTubeTrendingPage(page);

        await expect(page).toHaveURL(/\/feed\/trending/);
        await expect(trendingPage.videoContainer, 'Video container').toBeVisible({ timeout: 10000 });
        await expect(trendingPage.videoItems.first(), 'At least one video item').toBeVisible({ timeout: 10000 });
        await expect(trendingPage.videoTitles.first(), 'First video title').toBeVisible({ timeout: 10000 });
    });

    test('Should navigate to the Subscriptions page via sidebar', async ({ page }) => {
        const home = new YouTubeHomePage(page);
        await home.openSideBar();
        await home.subscriptionsLink.click();

        const subscriptionsPage = new YouTubeSubscriptionsPage(page);

        await expect(page).toHaveURL(/\/feed\/subscriptions/);
        await expect(subscriptionsPage.signInButton, 'Sign-in button should be visible').toBeVisible({ timeout: 10000 });
    });

    test('Should retrieve the video page title', async ({ page }) => {

        const videoPage = new YouTubeVideoPage(page);
        videoPage.openVideo('dQw4w9WgXcQ');

        await expect(videoPage.videoTitle, 'Video title').toBeVisible(({ timeout: 10000 }));
        await expect(videoPage.videoPlayer, 'Video player').toBeVisible(({ timeout: 10000 }));
    });
});
