/*import test, { expect } from 'playwright/test';
import { Config } from 'src/helpers/config.helper';
import { MainPage } from 'src/pages/main.page';
import { LoginPage } from 'src/pages/login.page';

test('should log in and navigate to profile page', async ({ page }) => {
    const homePage = new MainPage(page);
    await homePage.goto();

    await Promise.all([
        page.waitForURL(/\/auth\/login$/),
        homePage.topRightLinks.clickLogin()
    ]);

    await new LoginPage(page).login(Config.login, Config.password);

    homePage.useAuthenticatedLinks();
    await expect(homePage.topRightLinks.profile).toBeVisible();

    await Promise.all([
        page.waitForURL(/\/auth\/profile$/),
        homePage.topRightLinks.clickProfile()
    ]);

    await expect(page).toHaveURL(/\/auth\/profile$/);
});*/
