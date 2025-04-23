import { Page, Locator } from 'playwright';
import { AddIncomePopUp } from '../elements/add-income-pop-up';
import { IncomeTableRow } from '../elements/income-table-row';

export class IncomesPage {
    private page: Page;
    public addIncomePopUp: AddIncomePopUp;
    public incomeTableRow: IncomeTableRow;

    public constructor(page: Page) {
        this.page = page;
        this.addIncomePopUp = new AddIncomePopUp(page);
        this.incomeTableRow = new IncomeTableRow(page);
    }

    public get addIncomeButton(): Locator {
        return this.page.locator('button.MuiIconButton-root:has(+ #test-table)');
    }

    public get incomesTable(): Locator {
        return this.page.locator('#test-table table[aria-label="simple table"]');
    }

    public async clickAddIncome(): Promise<void> {
        await this.addIncomeButton.click();
    }

}
