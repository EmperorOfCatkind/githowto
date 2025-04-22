import { test, expect } from '@playwright/test';
import { Config } from 'src/helpers/config.helper';
import { ExpensesPage } from 'src/pages/expenses.page';
import { IncomesPage } from 'src/pages/income.page';
import { LoginPage } from 'src/pages/login.page';
import { MainPage } from 'src/pages/main.page';
import { TaxesPaidPage } from 'src/pages/taxes.paid';
import { TaxesPendingPage } from 'src/pages/taxes.pending.page';


test.describe('Homepage ', () => {
    test('shows login & register when not authenticated', async ({ page }) => {
        const homePage = new MainPage(page);
        await homePage.goto();

        await expect(homePage.topRightLinks.home).toBeVisible();
        await expect(homePage.topRightLinks.login).toBeVisible();
        await expect(homePage.topRightLinks.register).toBeVisible();

        await expect(homePage.sideNavigation.profits).toBeVisible();
        await expect(homePage.sideNavigation.expenses).toBeVisible();
        await expect(homePage.sideNavigation.taxes).toBeVisible();
    });

    test('side navigation routes to correct pages', async ({ page }) => {
        const homePage = new MainPage(page);
        await homePage.goto();

        await homePage.sideNavigation.clickProfits();
        await expect(page).toHaveURL(/\/incomes$/);

        await homePage.sideNavigation.clickExpenses();
        await expect(page).toHaveURL(/\/expenses$/);

        await homePage.sideNavigation.clickTaxes();
        await homePage.sideNavigation.clickTaxesCurrent();
        await expect(page).toHaveURL(/\/taxes\/pending$/);

        await homePage.sideNavigation.clickTaxes();
        await homePage.sideNavigation.clickTaxesPaid();
        await expect(page).toHaveURL(/\/taxes\/payed$/);
    });
});

test.describe('Side Navigation Pages Suite', () => {
    let mainPage: MainPage;
    let incomesPage: IncomesPage;
    let expensesPage: ExpensesPage;
    let taxesPendingPage: TaxesPendingPage;
    let taxesPaidPage: TaxesPaidPage;

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

    test('Income page accessible and elements visible', async ({ page }) => {
        incomesPage = new IncomesPage(page);

        await mainPage.sideNavigation.clickProfits();

        await expect(page).toHaveURL(/\/incomes$/);

        await expect(incomesPage.addIncomeButton).toBeVisible();
        await expect(incomesPage.incomesTable).toBeVisible();
    });

    test('Expenses page accessible and elements visible', async ({ page }) => {
        expensesPage = new ExpensesPage(page);

        await mainPage.sideNavigation.clickExpenses();

        await expect(page).toHaveURL(/\/expenses$/);

        await expect(expensesPage.addExpenseButton).toBeVisible();
        await expect(expensesPage.expensesTable).toBeVisible();
    });

    test('Pending Taxes page is reachable and elements visible', async ({ page }) => {
        taxesPendingPage = new TaxesPendingPage(page);

        await mainPage.sideNavigation.clickTaxes();
        await mainPage.sideNavigation.clickTaxesCurrent();

        await expect(page).toHaveURL(/\/taxes\/pending$/);

        await expect(taxesPendingPage.pendingTaxesTable).toBeVisible();
    });

    test('Paid Taxes page is reachable and elements visible', async ({ page }) => {
        taxesPaidPage = new TaxesPaidPage(page);

        await mainPage.sideNavigation.clickTaxes();
        await mainPage.sideNavigation.clickTaxesPaid();

        await expect(page).toHaveURL(/\/taxes\/payed$/);

        await expect(taxesPaidPage.paidTaxesTable).toBeVisible();
    });
});
