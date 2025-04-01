import { Page } from '@playwright/test';

export default class BasePage {
    protected readonly page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public async goto(path: string): Promise<void> {
        await this.page.goto(`https://www.youtube.com${path}`);
    }

    public async acceptCookiesIfVisible(): Promise<void> {
        const buttons = this.page.locator('ytd-button-renderer');
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            const btn = buttons.nth(i);
            const text = await btn.innerText();
            if (text.includes('Accept all')) {
                const innerBtn = btn.locator('button');
                await innerBtn.click();
                await this.page.waitForTimeout(100);
                break;
            }
        }
    }
}
