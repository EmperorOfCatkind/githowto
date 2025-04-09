import { Page, Locator } from '@playwright/test';

export const YOUTUBE_URL = 'https://www.youtube.com/';

export class GeneralHelper {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    private get popup(): Locator {
        return this.page.locator('ytd-consent-bump-v2-lightbox');
    }

    private get acceptAllButton(): Locator {
        return this.page.locator('ytd-button-renderer:has-text("Accept all") button');
    }

    public async acceptIfVisible(): Promise<void> {
        const visible = await this.acceptAllButton.isVisible();
        if (visible) {
            await this.acceptAllButton.click();
            await this.page.waitForTimeout(1000);
        }
    }
}
