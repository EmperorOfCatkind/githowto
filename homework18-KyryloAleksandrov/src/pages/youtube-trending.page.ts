import { Page, Locator } from '@playwright/test';

export class YouTubeTrendingPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get videoContainer(): Locator {
        return this.page.locator('ytd-section-list-renderer');
    }

    public get videoItems(): Locator {
        return this.page.locator('ytd-video-renderer');
    }

    public get videoTitles(): Locator {
        return this.page.locator('ytd-video-renderer a#video-title');
    }
}
