import { Page, Locator } from '@playwright/test';

export class TaxesPendingPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get pendingTaxesTable(): Locator {
        return this.page.locator('#not-payed-table table[aria-label="simple table"]');
    }
}
