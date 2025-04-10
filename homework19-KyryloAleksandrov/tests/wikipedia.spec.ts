import { test, expect } from '@playwright/test';
import { ReferenceSection } from 'src/elements/reference-section.page';
import { disambiguationTerms } from 'src/helpers/disambiguous-terms';
import { languages } from 'src/helpers/languages';
import { queries } from 'src/helpers/queries';
import { ArticlePage } from 'src/pages/article.page';
import { DisambiguationPage } from 'src/pages/disambiguation.page';
import { HomePage } from 'src/pages/home.page';


test.describe('Wikipedia test suite', () => {
    test('Search input and button are visible on Wikipedia homepage', async ({ page }) => {
        const home = new HomePage(page);
        await home.goto();

        await expect(home.searchInput).toBeVisible();
        await expect(home.searchButton).toBeVisible();
    });

    test.describe('Wikipedia article search', () => {
        for (const searchQuery of queries) {
            test(`Search for "${searchQuery}" and verify title and language dropdown`, async ({ page }) => {
                const home = new HomePage(page);
                const article = new ArticlePage(page);

                await home.goto();
                await home.submitSearch(searchQuery);

                await expect(article.title).toBeVisible();
                await expect(article.title).toHaveText(searchQuery);
                await expect(article.languageDropdownToggle).toBeVisible();
            });
        }
    });

    test.describe('Wikipedia article language switch', () => {
        for (const { code, domain } of languages) {
            test(`should switch to language: ${code}`, async ({ page }) => {
                const home = new HomePage(page);
                const article = new ArticlePage(page);

                const searchQuery = queries[0];

                await home.goto();
                await home.submitSearch(searchQuery);

                await expect(article.title).toBeVisible();

                await article.languageDropdownToggle.scrollIntoViewIfNeeded();
                await expect(article.languageDropdownToggle).toBeVisible();
                await article.languageDropdownToggle.click({ force: true });

                const selector = `.vector-menu-content a[lang='${code}']`;
                await page.locator(selector).waitFor({ state: 'attached', timeout: 5000 });

                await page.evaluate((lang) => {
                    const el = document.querySelector(`.vector-menu-content a[lang='${lang}']`) as HTMLElement;
                    if (el) el.click();
                }, code);

                await expect(page).toHaveURL(new RegExp(`^https://${domain}/`));
                await expect(article.title).toBeVisible();
            });
        }
    });

    test.describe('Wikipedia disambiguation page validation', () => {
        for (const title of disambiguationTerms) {
            test(`should confirm "${title}" is a disambiguation page`, async ({ page }) => {
                const disambiguation = new DisambiguationPage(page);

                await page.goto(`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`);

                await expect(disambiguation.title).toBeVisible();

                const text = await disambiguation.contentText.textContent();
                expect(text?.toLowerCase()).toMatch(/may refer to|can refer to|refer to|most commonly refer to/);

                await expect(disambiguation.disambiguationLinks.first()).toBeVisible();
            });
        }
    });

    test('Should jump to corresponding footnotes for up to 5 references', async ({ page }) => {
        const home = new HomePage(page);
        const references = new ReferenceSection(page);

        const searchQuery = queries[0];

        await home.goto();
        await home.submitSearch(searchQuery);

        for (let i = 0; i < 5; i++) {
            const refLink = references.inlineReference(i);

            const count = await refLink.count();
            if (count === 0) {
                console.log(`Reference [${i + 1}] does not exist. Stopping early.`);
                break;
            }

            const href = await refLink.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                console.log(`Reference [${i + 1}] does not have a valid href.`);
                continue;
            }

            const footnoteId = href.slice(1);
            const footnote = references.footnoteById(footnoteId);

            await refLink.click();
            await expect(footnote).toBeVisible();
        }
    });
});

