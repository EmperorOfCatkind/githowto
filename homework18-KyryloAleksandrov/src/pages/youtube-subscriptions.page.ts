import { Page, Locator } from '@playwright/test';

export class YouTubeSubscriptionsPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get signInButton(): Locator {
        return this.page.locator('ytd-guide-signin-promo-renderer a[href*="signin"]');
    }
}
