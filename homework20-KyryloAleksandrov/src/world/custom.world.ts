import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { HomePage } from '../pages/home.page.js';
import { ArticlePage } from '../pages/article.page.js';
import { DisambiguationPage } from '../pages/disambiguation.page.js';
import config from '../../playwright.config.js';

export class CustomWorld extends World {
    public static globalContext: Map<string, unknown>;
    public scenarioContext: Map<string, unknown>;

    public static browser: Browser;
    public context: BrowserContext;
    public page: Page;

    private _homePage: HomePage;
    private _articlePage: ArticlePage;
    private _disambiguationPage: DisambiguationPage;

    public constructor(options: IWorldOptions) {
        super(options);
        this.scenarioContext = new Map<string, unknown>();
    }

    public get browser(): Browser {
        return CustomWorld.browser;
    }

    public get globalContext(): Map<string, unknown> {
        return CustomWorld.globalContext;
    }

    public get baseURL(): string {
        return config.use?.baseURL ?? '';
    }

    public get homePage(): HomePage {
        if (!this._homePage) {
            this._homePage = new HomePage(this.page);
        }
        return this._homePage;
    }

    public get articlePage(): ArticlePage {
        if (!this._articlePage) {
            this._articlePage = new ArticlePage(this.page);
        }
        return this._articlePage;
    }

    public get disambiguationPage(): DisambiguationPage {
        if (!this._disambiguationPage) {
            this._disambiguationPage = new DisambiguationPage(this.page);
        }
        return this._disambiguationPage;
    }
}
