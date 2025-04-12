import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I switch the article language to {string}', async function (langCode: string) {
    await this.articlePage.languageDropdownToggle.scrollIntoViewIfNeeded();
    await this.articlePage.languageDropdownToggle.click({ force: true });

    const link = this.articlePage.languageLinkInDropdown(langCode);
    await link.waitFor({ state: 'attached', timeout: 5000 });

    await this.articlePage.clickLanguageLinkByCode(langCode);
});

Then('I should be on the {string} domain', async function (domain: string) {
    await expect(this.page).toHaveURL(new RegExp(`^https://${domain}/`));
});

Then('the article title should be visible', async function () {
    await expect(this.articlePage.title).toBeVisible();
});
