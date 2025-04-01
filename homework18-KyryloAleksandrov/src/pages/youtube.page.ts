import { expect } from '@playwright/test';
import BasePage from './page';

export default class YouTubePage extends BasePage {
    public async goToHome(): Promise<void> {
        await this.goto('/');
        await this.acceptCookiesIfVisible();
    }

    public async clickLogo(): Promise<void> {
        const logo = this.page.locator('a#logo').nth(0);
        await expect(logo).toBeVisible();
        await this.page.waitForSelector('tp-yt-iron-overlay-backdrop', { state: 'hidden', timeout: 15000 }).catch(() => undefined);
        await logo.scrollIntoViewIfNeeded().catch(() => undefined);
        await logo.click({ force: true }).catch(() => this.goto('/'));
    }

    public async goToTrending(): Promise<void> {
        await this.page.waitForSelector('tp-yt-iron-overlay-backdrop', { state: 'hidden', timeout: 15000 }).catch(() => undefined);
        const guideButton = this.page.locator('button[aria-label="Guide"]');
        await guideButton.waitFor({ state: 'visible', timeout: 10000 });
        await guideButton.click({ force: true }).catch(() => undefined);

        const entry = this.page.locator(
            'a[title="Trending"]'
        );
        const firstEntry = entry.nth(0);
        await firstEntry.scrollIntoViewIfNeeded().catch(() => undefined);
        try {
            await expect(firstEntry).toBeVisible({ timeout: 10000 });
            await Promise.all([
                this.page.waitForURL(/\/feed\/trending/, { timeout: 10000 }),
                firstEntry.click({ force: true })
            ]);
        } catch {
            await this.goto('/feed/trending');
            await this.page.waitForURL(/\/feed\/trending/, { timeout: 10000 });
        }
    }

    public async verifyFirstTrendingVideoTitle(): Promise<void> {
        const video = this.page.locator('ytd-video-renderer').first();
        await expect(video).toBeVisible();
        const title = video.locator('#video-title');
        await expect(title).toHaveAttribute('title', /\S+/);
    }

    public async goToSubscriptions(): Promise<void> {
        await this.page.waitForSelector('tp-yt-iron-overlay-backdrop', { state: 'hidden', timeout: 15000 }).catch(() => undefined);
        const guideButton = this.page.locator('button[aria-label="Guide"]');
        await guideButton.waitFor({ state: 'visible', timeout: 10000 });
        await guideButton.click({ force: true }).catch(() => undefined);

        const entry = this.page.locator(
            'a[title="Subscriptions"]'
        );
        const firstSubEntry = entry.nth(0);
        await firstSubEntry.scrollIntoViewIfNeeded().catch(() => undefined);
        try {
            await expect(firstSubEntry).toBeVisible({ timeout: 10000 });
            await Promise.all([
                this.page.waitForURL(/\/feed\/subscriptions/, { timeout: 10000 }),
                firstSubEntry.click({ force: true })
            ]);
        } catch {
            await this.goto('/feed/subscriptions');
            await this.page.waitForURL(/\/feed\/subscriptions/, { timeout: 10000 });
        }
    }

    public async openVideo(videoId: string): Promise<void> {
        await this.page.goto(`https://www.youtube.com/watch?v=${videoId}`);
        await this.acceptCookiesIfVisible();
    }

    public async expectTitleToBePresent(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        const title = await this.page.title();
        expect(title).not.toBeNull();
        expect(title.length).toBeGreaterThan(0);
    }
}
