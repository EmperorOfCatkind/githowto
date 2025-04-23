import { Page, Locator } from '@playwright/test';
import { AddExpensePopUp } from 'src/elements/add-expense-pop-up';
import { ExpenseTableRow } from '../elements/expense-table-row';

export class ExpensesPage {
    private page: Page;
    public addExpensePopUp: AddExpensePopUp;
    public expenseTableRow: ExpenseTableRow;

    public constructor(page: Page) {
        this.page = page;
        this.addExpensePopUp = new AddExpensePopUp(page);
        this.expenseTableRow = new ExpenseTableRow(page);
    }

    public get addExpenseButton(): Locator {
        return this.page.locator('button.MuiIconButton-root:has(+ #test-table)');
    }

    public get expensesTable(): Locator {
        return this.page.locator('#test-table table[aria-label="simple table"]');
    }

    public async clickAddExpense(): Promise<void> {
        await this.addExpenseButton.click();
    }
}
