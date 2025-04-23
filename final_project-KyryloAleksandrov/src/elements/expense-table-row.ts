import { Page, Locator } from '@playwright/test';
import { Config } from 'src/helpers/config.helper';

export class ExpenseTableRow{
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get dateCell(): Locator{
        return this.page.locator('td.table-date');
    }

    public get expenseCell(): Locator{
        return this.page.locator('td.table-income');    //why is it called table-income in html when it is the element of expenses table?
    }

    public get commentCell(): Locator{
        return this.page.locator('td.table-comment');
    }

    public get cashCell(): Locator{
        return this.page.locator('td.table-cash');
    }

    public get filledExpenseCell(): Locator{
        return this.page.locator('td.table-income', { hasText: Config.expenseTestValue });
    }

    public get filledCommentCell(): Locator{
        return this.page.locator('td.table-comment', { hasText: Config.expenseCommentTestValue });
    }
}

