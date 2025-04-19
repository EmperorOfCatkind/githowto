import { Page, Locator } from '@playwright/test';
import { ReferenceSection } from 'src/elements/reference-section.page';

export class ArticlePage {
    private page: Page;
    public references: ReferenceSection;

    public constructor(page: Page) {
        this.page = page;
        this.references = new ReferenceSection(page);
    }

    public get title(): Locator {
        return this.page.locator('#firstHeading');
    }

    public get languageDropdownToggle(): Locator {
        return this.page.locator('button#p-lang-btn, #p-lang-btn');
    }

    public async goto(articlePath: string): Promise<void> {
        await this.page.goto(articlePath);
    }

    public languageLinkInDropdown(langCode: string): Locator {
        return this.page.locator(`.vector-menu-content a[lang='${langCode}']`);
    }

    public async clickLanguageLinkByCode(langCode: string): Promise<void> {
        await this.page.evaluate((lang) => {
            const el = document.querySelector(`.vector-menu-content a[lang='${lang}']`) as HTMLElement;
            if (el) el.click();
        }, langCode);
    }
}
