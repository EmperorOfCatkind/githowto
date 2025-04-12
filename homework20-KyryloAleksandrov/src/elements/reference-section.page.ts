import { Page, Locator } from 'playwright';

export class ReferenceSection {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public inlineReference(index: number): Locator {
        return this.page.locator('sup.reference a[href^=\'#cite_note\']').nth(index);
    }

    public footnoteById(id: string): Locator {
        return this.page.locator(`ol.references li#${id}`);
    }

    public get referenceSection(): Locator {
        return this.page.locator('ol.references');
    }
}
