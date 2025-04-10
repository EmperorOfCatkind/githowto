import { Page, Locator } from '@playwright/test';

export class ArticlePage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    // Article title
    public get title(): Locator {
        return this.page.locator('#firstHeading');
    }

    // Language dropdown toggle button
    public get languageDropdownToggle(): Locator {
        return this.page.locator('button#p-lang-btn, #p-lang-btn');
    }

    // Navigate directly to a specific article
    public async goto(articlePath: string): Promise<void> {
        await this.page.goto(articlePath);
    }

    public languageLink(langCode: string): Locator {
        return this.page.locator(`.vector-menu-content a[lang='${langCode}']`);
    }
}
