import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DisambiguationPage } from '../pages/disambiguation.page.js';

Given('I open the article for {string}', async function (term: string) {
    this.disambiguationPage = new DisambiguationPage(this.page);
    const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(term)}`;
    await this.page.goto(url);
});

Then('the disambiguation page title should be visible', async function () {
    await expect(this.disambiguationPage.title).toBeVisible();
});

Then('the content should indicate it is a disambiguation page', async function () {
    const text = await this.disambiguationPage.contentText.textContent();
    expect(text?.toLowerCase()).toMatch(/may refer to|can refer to|refer to|most commonly refer to/);
});

Then('at least one disambiguation link should be present', async function () {
    await expect(this.disambiguationPage.disambiguationLinks.first()).toBeVisible();
});
