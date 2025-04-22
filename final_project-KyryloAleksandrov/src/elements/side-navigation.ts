import { Page, Locator } from 'playwright';
import { expect } from 'playwright/test';

export class SideNavigation {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    private get navContainer(): Locator {
        return this.page.locator('nav[aria-label="side-navigation"]');
    }

    public get profits(): Locator {
        return this.navContainer.locator('ul.side-navigation-panel-select:nth-child(1) .side-navigation-panel-select-option-text');
    }

    public get expenses(): Locator {
        return this.navContainer.locator('ul.side-navigation-panel-select:nth-child(2) .side-navigation-panel-select-option-text');
    }

    public get taxes(): Locator {
        return this.navContainer.locator('ul.side-navigation-panel-select:nth-child(3) .side-navigation-panel-select-option-text');
    }

    private get taxesSubmenu(): Locator {
        return this.navContainer.locator('ul.side-navigation-panel-select:nth-child(3) ul.side-navigation-panel-select-inner');
    }

    public get taxesCurrent(): Locator {
        return this.taxesSubmenu.locator('li:nth-child(1) .side-navigation-panel-select-inner-option');
    }

    public get taxesPaid(): Locator {
        return this.taxesSubmenu.locator('li:nth-child(2) .side-navigation-panel-select-inner-option');
    }

    public async clickProfits(): Promise<void> {
        await this.profits.click();
    }

    public async clickExpenses(): Promise<void> {
        await this.expenses.click();
    }

    public async clickTaxes(): Promise<void> {
        if (!(await this.taxesSubmenu.isVisible())) {
            await this.taxes.click();
            await expect(this.taxesSubmenu).toBeVisible();
        }
    }

    public async clickTaxesCurrent(): Promise<void> {
        await this.taxesCurrent.click();
    }

    public async clickTaxesPaid(): Promise<void> {
        await this.taxesPaid.click();
    }
}
