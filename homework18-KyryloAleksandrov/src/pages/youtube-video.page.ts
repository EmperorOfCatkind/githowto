import { Page, Locator } from '@playwright/test';

export class YouTubeVideoPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get videoPlayer(): Locator {
        return this.page.locator('ytd-player#ytd-player');
    }

    public get videoTitle(): Locator {
        return this.page.locator('yt-formatted-string.style-scope.ytd-watch-metadata[title]');
    }

    public async openVideo(videoId: string): Promise<void> {
        await this.page.goto(`https://www.youtube.com/watch?v=${videoId}`);
    }
}
