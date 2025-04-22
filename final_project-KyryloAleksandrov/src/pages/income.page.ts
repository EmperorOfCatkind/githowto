import { Page, Locator } from 'playwright';
import { AddIncomePopUp } from '../elements/add-income-pop-up';

export class IncomesPage {
    private page: Page;
    public addIncomePopUp: AddIncomePopUp;

    public constructor(page: Page) {
        this.page = page;
        this.addIncomePopUp = new AddIncomePopUp(page);
    }

    public get addIncomeButton(): Locator {
        return this.page.locator('button.MuiIconButton-root:has(+ #test-table)');
    }

    public get incomesTable(): Locator {
        return this.page.locator('#test-table table[aria-label="simple table"]');
    }

    public async goto(): Promise<void> {
        await this.page.goto('/incomes');
    }

    public async clickAddIncome(): Promise<void> {
        await this.addIncomeButton.click();
    }

    public async getRowCount(): Promise<number> {
        return this.incomesTable.locator('tbody tr').count();
    }
}
