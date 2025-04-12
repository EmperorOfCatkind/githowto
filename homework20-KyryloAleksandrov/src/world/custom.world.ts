import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import config from '../../playwright.config.js';

export class CustomWorld extends World {
    public static globalContext: Map<string, unknown>;
    public scenarioContext: Map<string, unknown>;

    public static browser: Browser;
    public context: BrowserContext;
    public page: Page;

    public get browser(): Browser {
        return CustomWorld.browser;
    }

    public get globalContext(): Map<string, unknown> {
        return CustomWorld.globalContext;
    }

    public get baseURL(): string {
        return config.use?.baseURL ?? '';
    }


    public constructor(options: IWorldOptions) {
        super(options);
        this.scenarioContext = new Map<string, unknown>();
    }
}
