import { Page, Locator } from '@playwright/test';

export class YouTubeHomePage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get logo(): Locator {
        return this.page.locator('#start a#logo');
    }

    public get guideButton(): Locator {
        return this.page.locator('button[aria-label="Guide"]');
    }

    public get sidebar(): Locator {
        return this.page.locator('ytd-guide-renderer');
    }

    public get trendingLink(): Locator {
        return this.page.locator('ytd-guide-entry-renderer a[title="Trending"]');
    }

    public get subscriptionsLink(): Locator {
        return this.page.locator('ytd-guide-entry-renderer a[title="Subscriptions"]');
    }

    public async clickLogo(): Promise<void> {
        await this.logo.waitFor();
        await this.logo.click();
    }

    public async openSideBar(): Promise<void> {
        if (!(await this.sidebar.isVisible())) {
            await this.guideButton.click();
            await this.sidebar.waitFor({ state: 'visible' });
        }
    }
}
