import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ReferenceSection } from '../elements/reference-section.page.js';

Then('I should be able to click and view up to 5 valid footnotes', async function () {
    const references = new ReferenceSection(this.page);
    this.articlePage.references = references;

    for (let i = 0; i < 5; i++) {
        const refLink = references.inlineReference(i);

        const count = await refLink.count();
        if (count === 0) {
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
