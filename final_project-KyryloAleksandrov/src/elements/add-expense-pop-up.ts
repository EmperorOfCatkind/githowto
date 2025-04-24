import { Page, Locator } from '@playwright/test';

export class AddExpensePopUp{
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get navContainer(): Locator{
        return this.page.locator('table.MuiTable-root[id="add-new-expense"]');
    }

    public get dateInput(): Locator {
        return this.page.locator('input.MuiInput-input[id="Date-New"]');
    }

    public get expenseInput(): Locator {
        return this.page.locator('input.MuiInput-input[id="Expense-New"]');
    }

    public get currencySelect(): Locator {
        return this.page.locator('select.MuiInput-input[id="Currency-New"]');
    }

    public get commentInput(): Locator {
        return this.page.locator('input.MuiInput-input[id="Comment-New"]');
    }

    public get cashCheckbox(): Locator {
        return this.page.locator('//*[@id="Cash-New"]');
    }

    public get addButton(): Locator{
        return this.page.locator('button.MuiIconButton-root[id="BtnAdd-New"]');
    }

    public get cancelButton(): Locator{
        return this.page.locator('button.MuiIconButton-root[id="BtnCancel-New"]');
    }
}
