import { Page, Locator } from 'playwright';

export class HomePage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get searchInput(): Locator {
        return this.page.locator('input[name="search"]');
    }

    public get searchButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    public async goto(baseURL: string): Promise<void> {
        await this.page.goto(baseURL);
    }

    public async submitSearch(term: string): Promise<void> {
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }
}
