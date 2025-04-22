import test, { expect } from 'playwright/test';
import { Config } from 'src/helpers/config.helper';
import { IncomesPage } from 'src/pages/income.page';
import { LoginPage } from 'src/pages/login.page';
import { MainPage } from 'src/pages/main.page';

test.describe('Income Page ', () => {
    let mainPage: MainPage;
    let incomesPage: IncomesPage;


    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.goto();

        await Promise.all([
            page.waitForURL(/\/auth\/login$/),
            mainPage.topRightLinks.clickLogin()
        ]);

        await new LoginPage(page).login(Config.login, Config.password);

        mainPage.useAuthenticatedLinks();
        await expect(mainPage.topRightLinks.profile).toBeVisible();

        await Promise.all([
            page.waitForURL(/\/auth\/profile$/),
            mainPage.topRightLinks.clickProfile()
        ]);

        await expect(page).toHaveURL(/\/auth\/profile$/);
    });

    test('shows pop-up after clicking "+" button', async ({ page }) => {
        incomesPage = new IncomesPage(page);

        await mainPage.sideNavigation.clickProfits();

        await expect(page).toHaveURL(/\/incomes$/);

        await incomesPage.clickAddIncome();

        await expect(incomesPage.addIncomePopUp.navContainer).toBeVisible();
        await expect(incomesPage.addIncomePopUp.dateInput).toBeVisible();
        await expect(incomesPage.addIncomePopUp.incomeInput).toBeVisible();
        await expect(incomesPage.addIncomePopUp.currencySelect).toBeVisible();
        await expect(incomesPage.addIncomePopUp.commentInput).toBeVisible();
        await expect(incomesPage.addIncomePopUp.cashCheckbox).toBeVisible();
        await expect(incomesPage.addIncomePopUp.addButton).toBeVisible();
        await expect(incomesPage.addIncomePopUp.cancelButton).toBeVisible();
    });

    test('adds the new row to income table', async ({ page }) => {
        incomesPage = new IncomesPage(page);
        const income = '1000';
        const comment = 'test';

        await mainPage.sideNavigation.clickProfits();

        await expect(page).toHaveURL(/\/incomes$/);

        await incomesPage.clickAddIncome();
        await incomesPage.addIncomePopUp.incomeInput.fill(income);
        await incomesPage.addIncomePopUp.commentInput.fill(comment);
        await incomesPage.addIncomePopUp.addButton.click();

        await expect(incomesPage.getRowCount()).toBeGreaterThan(0);
    });

});

