import { Page, Locator } from '@playwright/test';

export class ExpensesPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get addExpenseButton(): Locator {
        return this.page.locator('button.MuiIconButton-root:has(+ #test-table)');
    }

    public get expensesTable(): Locator {
        return this.page.locator('#test-table table[aria-label="simple table"]');
    }

    public async goto(): Promise<void> {
        await this.page.goto('/expenses');
    }

    /*public async clickAddExpense(): Promise<void> {
        await this.addExpenseButton.click();
    }

    public async getRowCount(): Promise<number> {
        return this.expensesTable.locator('tbody tr').count();
    }*/
}
