import { Page, Locator } from '@playwright/test';

export class ReferenceSection {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    // Inline reference (e.g. [1], [2], etc.)
    public inlineReference(index: number): Locator {
        return this.page.locator('sup.reference a[href^=\'#cite_note\']').nth(index);
    }

    // Corresponding footnote in the reference section
    public footnoteById(id: string): Locator {
        return this.page.locator(`ol.references li#${id}`);
    }

    // Entire reference section
    public get referenceSection(): Locator {
        return this.page.locator('ol.references');
    }
}
