import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Then('I should be able to click and view the first {int} valid footnotes', async function (count: number) {
    const references = this.articlePage.references;

    for (let i = 0; i < count; i++) {
        const refLink = references.inlineReference(i);

        const exists = await refLink.count();
        if (exists === 0) {
            console.log(`Reference [${i + 1}] does not exist. Stopping early.`);
            break;
        }

        const href = await refLink.getAttribute('href');
        if (!href || !href.startsWith('#')) {
            console.log(`Reference [${i + 1}] has invalid or missing href.`);
            continue;
        }

        const footnoteId = href.slice(1);
        const footnote = references.footnoteById(footnoteId);

        await refLink.click();
        await expect(footnote).toBeVisible();
    }
});
