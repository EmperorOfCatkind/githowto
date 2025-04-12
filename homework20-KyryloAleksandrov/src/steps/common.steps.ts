import { Given } from '@cucumber/cucumber';
import { HomePage } from '../pages/home.page.js';

Given('I am on the Wikipedia homepage', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.goto(this.baseURL);
});
