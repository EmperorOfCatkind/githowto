import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    private get emailInput(): Locator {
        return this.page.locator('input#email');
    }

    private get passwordInput(): Locator {
        return this.page.locator('input#password');
    }

    private get submitButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    public async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}
