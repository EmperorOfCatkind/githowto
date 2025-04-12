import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the homepage', async function () {
    await this.page.goto(this.baseURL);
});

Then('the title should contain {string}', async function (expectedTitle: string) {
    const actualTitle = await this.page.title();
    expect(actualTitle).toContain(expectedTitle);
});
