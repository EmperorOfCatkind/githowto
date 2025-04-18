import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I search for {string}', async function (query: string) {
    await this.homePage.submitSearch(query);
});

Then('the article title should be {string}', async function (expectedTitle: string) {
    await expect(this.articlePage.title).toBeVisible();
    await expect(this.articlePage.title).toHaveText(expectedTitle);
});

Then('the language dropdown should be visible', async function () {
    await expect(this.articlePage.languageDropdownToggle).toBeVisible();
});
