import { Page, Locator } from '@playwright/test';

export class TopRightLinks {
    private page: Page;
    private isAuthenticated: boolean;

    public static forUnauthenticated(page: Page): TopRightLinks {
        return new TopRightLinks(page, false);
    }

    public static forAuthenticated(page: Page): TopRightLinks {
        return new TopRightLinks(page, true);
    }

    private constructor(page: Page, isAuthenticated: boolean) {
        this.page = page;
        this.isAuthenticated = isAuthenticated;
    }

    private get navContainer(): Locator {
        return this.page.locator('header nav .navbar-nav');
    }

    public get home(): Locator {
        return this.navContainer.locator('a.nav-link[href="/"]');
    }

    public get login(): Locator {
        if (this.isAuthenticated) {
            throw new Error('Login link is not available when authenticated');
        }
        return this.navContainer.locator('a.nav-link[href="/auth/login"]');
    }

    public get register(): Locator {
        if (this.isAuthenticated) {
            throw new Error('Register link is not available when authenticated');
        }
        return this.navContainer.locator('a.nav-link[href="/auth/register"]');
    }

    public get profile(): Locator {
        if (!this.isAuthenticated) {
            throw new Error('Profile link is not available when unauthenticated');
        }
        return this.navContainer.locator('a.nav-link[href="/auth/profile"]');
    }

    public get logout(): Locator {
        if (!this.isAuthenticated) {
            throw new Error('Logout link is not available when unauthenticated');
        }
        return this.navContainer.locator('a.nav-link[href="/auth/logout"]');
    }

    public async clickHome(): Promise<void> {
        await this.home.click();
    }

    public async clickLogin(): Promise<void> {
        await this.login.click();
    }

    public async clickRegister(): Promise<void> {
        await this.register.click();
    }

    public async clickProfile(): Promise<void> {
        await this.profile.click();
    }

    public async clickLogout(): Promise<void> {
        await this.logout.click();
    }
}
