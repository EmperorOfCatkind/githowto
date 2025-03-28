import { $, $$, browser } from '@wdio/globals';
import { expect } from 'expect-webdriverio';
import Page from './page';
import type { ChainablePromiseElement, ChainablePromiseArray } from 'webdriverio';

class YouTubePage extends Page {
    public get logo(): ChainablePromiseElement {
        return $('a#logo');
    }
    public get guideButton(): ChainablePromiseElement {
        return $('button[aria-label="Guide"]');
    }
    public get guideEntries(): ChainablePromiseArray {
        return $$('ytd-guide-entry-renderer');
    }
    public get videoResults(): ChainablePromiseArray {
        return $$('ytd-video-renderer');
    }
    public get videoPlayer(): ChainablePromiseElement {
        return $('.html5-video-player');
    }
    public get firstVideoTitle(): ChainablePromiseElement {
        return $('ytd-video-renderer:first-child #video-title');
    }

    public async expectLogoToBeDisplayed(): Promise<void> {
        const logo = await this.logo;
        await expect(logo).toBeDisplayed();
    }

    public async goToHome(): Promise<void> {
        await this.open('/');
        await this.acceptCookiesIfVisible();
    }

    public async clickLogo(): Promise<void> {
        const logo = await this.logo;
        await logo.waitForDisplayed();

        const backdrop = await $('tp-yt-iron-overlay-backdrop');

        if (await backdrop.isExisting()) {
            await browser.waitUntil(
                async () => {
                    try {
                        return !(await backdrop.isDisplayed());
                    } catch {
                        return true; // backdrop removed
                    }
                },
                {
                    timeout: 15000,
                    timeoutMsg: 'Overlay backdrop still visible after 15s'
                }
            );
        }

        await logo.click();
    }

    public async goToTrending(): Promise<void> {
        try {
            await this.guideButton.click();
            const trending = await $('a[title="Trending"]');
            await trending.waitForDisplayed({ timeout: 5000 });
            await trending.click();
        } catch {
            await browser.url('/feed/trending');
        }

        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes('/feed/trending');
        }, { timeout: 5000, timeoutMsg: 'Trending page did not load' });
    }

    public async expectFirstTrendingVideoHaveTitle(): Promise<void> {
        await $('ytd-section-list-renderer').waitForDisplayed();
        await $('ytd-video-renderer').waitForDisplayed();

        const videos = await this.videoResults;
        if (!videos || await videos.length === 0) {
            throw new Error('No videos found on Trending page');
        }

        const video = videos[0];
        await video.scrollIntoView();
        await video.waitForDisplayed();

        const title = await this.firstVideoTitle;
        await expect(title).toHaveAttribute('title');
        await expect(title).toHaveAttribute('title', expect.stringMatching(/\S+/));
    }

    public async goToSubscriptions(): Promise<void> {
        try {
            await this.guideButton.click();
            const subscriptionsEntry = await $(
                'a[title="Subscriptions"]'
            );
            await subscriptionsEntry.waitForDisplayed({ timeout: 5000 });
            await subscriptionsEntry.click();
        } catch {
            await browser.url('/feed/subscriptions');
        }

        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes('/feed/subscriptions');
        }, {
            timeout: 10000,
            timeoutMsg: 'Expected to be on subscriptions page'
        });
    }

    public async expectOnSubscriptionsPage(): Promise<void> {
        const url = await browser.getUrl();
        expect(url).toContain('/feed/subscriptions');
    }

    public async openVideo(videoId: string): Promise<void> {
        await browser.url(`/watch?v=${videoId}`);
        await this.acceptCookiesIfVisible();
    }

    public async getPageTitle(): Promise<string> {
        return browser.getTitle();
    }
}

export default new YouTubePage();
