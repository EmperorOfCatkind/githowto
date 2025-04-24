import { Page, Locator } from '@playwright/test';

export class TaxesPaidPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get paidTaxesTable(): Locator {
        return this.page.locator('#payed-table table[aria-label="table with payed taxes"]');
    }
}
