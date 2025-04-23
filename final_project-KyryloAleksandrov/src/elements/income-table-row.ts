import { Page, Locator } from '@playwright/test';
import { Config } from 'src/helpers/config.helper';

export class IncomeTableRow{
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public get dateCell(): Locator{
        return this.page.locator('td.table-date');
    }

    public get incomeCell(): Locator{
        return this.page.locator('td.table-income');
    }

    public get commentCell(): Locator{
        return this.page.locator('td.table-comment');
    }

    public get cashCell(): Locator{
        return this.page.locator('td.table-cash');
    }

    public get filledIncomeCell(): Locator{
        return this.page.locator('td.table-income', { hasText: Config.incomeTestValue });
    }

    public get filledCommentCell(): Locator{
        return this.page.locator('td.table-comment', { hasText: Config.incomeCommentTestValue });
    }
}

