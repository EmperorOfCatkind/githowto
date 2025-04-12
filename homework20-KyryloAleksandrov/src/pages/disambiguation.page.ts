import { Page, Locator } from 'playwright';

export class DisambiguationPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get title(): Locator {
        return this.page.locator('#firstHeading');
    }

    public get contentText(): Locator {
        return this.page.locator('#mw-content-text');
    }

    public get disambiguationLinks(): Locator {
        return this.page.locator('.mw-parser-output ul > li > a');
    }
}
