import { Given } from '@cucumber/cucumber';

Given('I am on the Wikipedia homepage', async function () {
    await this.homePage.goto(this.baseURL);
});
