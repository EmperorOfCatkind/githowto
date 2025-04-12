import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';


Then('the search input should be visible', async function () {
    await expect(this.homePage.searchInput).toBeVisible();
});

Then('the search button should be visible', async function () {
    await expect(this.homePage.searchButton).toBeVisible();
});
