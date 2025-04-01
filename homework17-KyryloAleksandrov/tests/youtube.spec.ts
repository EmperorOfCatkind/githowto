import { expect } from 'expect-webdriverio';
import YouTubePage from './pageobjects/youtube.page';
import { browser } from '@wdio/globals';

describe('YouTube WDIO Test Suite', (): void => {
    it('Should check the YouTube logo navigates to homepage', async (): Promise<void> => {
        await YouTubePage.goToHome();
        await YouTubePage.expectLogoToBeDisplayed();
        await YouTubePage.clickLogo();
        const url = await browser.getUrl();
        expect(url).toBe('https://www.youtube.com/');
    });

    it('Should navigate to Trending and check video titles', async (): Promise<void> => {
        await YouTubePage.goToHome();
        await YouTubePage.goToTrending();
        await YouTubePage.expectFirstTrendingVideoHaveTitle();
    });

    it('Should navigate to the Subscriptions page via sidebar', async (): Promise<void> => {
        await YouTubePage.goToHome();
        await YouTubePage.goToSubscriptions();
        await YouTubePage.expectOnSubscriptionsPage();
    });

    it('Should retrieve the video page title', async (): Promise<void> => {
        await YouTubePage.openVideo('dQw4w9WgXcQ');
        const title: string = await YouTubePage.getPageTitle();
        expect(typeof title).toBe('string');
        expect(title.length).toBeGreaterThan(0);
    });
});
