import { Page } from '@playwright/test';
import { TopRightLinks } from '../elements/top-right-links';
import { SideNavigation } from 'src/elements/side-navigation';

export class MainPage {
    private page: Page;
    public topRightLinks: TopRightLinks;
    public sideNavigation: SideNavigation;

    public constructor(page: Page) {
        this.page = page;
        this.topRightLinks = TopRightLinks.forUnauthenticated(page);
        this.sideNavigation = new SideNavigation(page);
    }

    public async goto(): Promise<void> {
        await this.page.goto('/');
        this.useUnauthenticatedLinks();
    }

    public async getMainHeading(): Promise<string> {
        return this.page.locator('h1').innerText();
    }

    public useUnauthenticatedLinks(): void {
        this.topRightLinks = TopRightLinks.forUnauthenticated(this.page);
    }

    public useAuthenticatedLinks(): void {
        this.topRightLinks = TopRightLinks.forAuthenticated(this.page);
    }
}
