import { test, expect } from '@playwright/test';
import { Config } from 'src/helpers/config.helper';
import { ExpensesPage } from 'src/pages/expenses.page';
import { LoginPage } from 'src/pages/login.page';
import { MainPage } from 'src/pages/main.page';

test.describe('Expense Page ', () => {
    let mainPage: MainPage;
    let expensesPage: ExpensesPage;


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
        expensesPage = new ExpensesPage(page);

        await mainPage.sideNavigation.clickExpenses();

        await expect(page).toHaveURL(/\/expenses$/);

        await expensesPage.clickAddExpense();

        await expect(expensesPage.addExpensePopUp.navContainer).toBeVisible();
        await expect(expensesPage.addExpensePopUp.dateInput).toBeVisible();
        await expect(expensesPage.addExpensePopUp.expenseInput).toBeVisible();
        await expect(expensesPage.addExpensePopUp.currencySelect).toBeVisible();
        await expect(expensesPage.addExpensePopUp.commentInput).toBeVisible();
        await expect(expensesPage.addExpensePopUp.cashCheckbox).toBeVisible();
        await expect(expensesPage.addExpensePopUp.addButton).toBeVisible();
        await expect(expensesPage.addExpensePopUp.cancelButton).toBeVisible();
    });

    test('adds the new row to expense table', async ({ page }) => {
        expensesPage = new ExpensesPage(page);
        const expense = Config.expenseTestValue;
        const comment = Config.expenseCommentTestValue;

        await mainPage.sideNavigation.clickExpenses();

        await expect(page).toHaveURL(/\/expenses$/);

        await expensesPage.clickAddExpense();
        await expensesPage.addExpensePopUp.expenseInput.fill(expense);
        await expensesPage.addExpensePopUp.commentInput.fill(comment);
        await expensesPage.addExpensePopUp.addButton.click();

        await expect(expensesPage.expenseTableRow.filledExpenseCell).toBeVisible();
        await expect(expensesPage.expenseTableRow.filledCommentCell).toBeVisible();
    });
});
