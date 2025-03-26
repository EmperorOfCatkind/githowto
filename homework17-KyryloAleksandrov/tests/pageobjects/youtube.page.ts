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

    public async goToHome(): Promise<void> {
        await this.open('/');
        await this.acceptCookiesIfVisible();
    }

    public async clickLogo(): Promise<void> {
        const logo = await this.logo;
        await logo.waitForDisplayed();

        const backdrop = await $('tp-yt-iron-overlay-backdrop');

        const exists = await backdrop.isExisting();
        if (exists) {
            await browser.waitUntil(
                async () => {
                    const isDisplayed = await backdrop.isDisplayed();
                    return !isDisplayed;
                },
                {
                    timeout: 15000,
                    timeoutMsg: 'Overlay backdrop still visible after 15s'
                }
            );
        }

        await logo.click();
        const url: string = await browser.getUrl();
        expect(url).toBe('https://www.youtube.com/');
    }

    public async goToTrending(): Promise<void> {
        try {
            const guide = await this.guideButton;
            await guide.click();
            const entries = await this.guideEntries;
            let entryToClick;
            for (const e of entries) {
                const text = await e.getText();
                if (/Trending|Na czasie|Explore|Eksploruj/i.test(text)) {
                    entryToClick = e;
                    break;
                }
            }
            if (!entryToClick) throw new Error('Trending/Explore entry not found in sidebar');
            await entryToClick.click();
        } catch {
            await browser.url('/feed/trending');
        }

        await browser.waitUntil(async () => {
            const url = await browser.getUrl();
            return url.includes('/feed/trending');
        }, { timeout: 5000, timeoutMsg: 'Trending page did not load' });
    }

    public async verifyFirstTrendingVideoTitle(): Promise<void> {
        await browser.pause(2000);

        const videos = await this.videoResults;
        if (!videos || await videos.length === 0) {
            throw new Error('No videos found on Trending page');
        }

        const video = videos[0];
        await video.scrollIntoView();
        await video.waitForDisplayed();

        const title = await this.firstVideoTitle;
        await expect(title).toHaveAttribute('title');
        const value = await title.getAttribute('title');
        if (!value) throw new Error('Video title is empty');
    }

    public async goToSubscriptions(): Promise<void> {
        const guide = await this.guideButton;
        await guide.click();
        const entries = await this.guideEntries;
        for (const entry of entries) {
            const text = await entry.getText();
            if (text.toLowerCase().includes('subscriptions')) {
                await entry.click();
                await browser.waitUntil(
                    async (): Promise<boolean> => (await browser.getUrl()).includes('/feed/subscriptions'),
                    { timeout: 10000, timeoutMsg: 'Expected to be on subscriptions page' }
                );
                return;
            }
        }
        throw new Error('Subscriptions link not found');
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
