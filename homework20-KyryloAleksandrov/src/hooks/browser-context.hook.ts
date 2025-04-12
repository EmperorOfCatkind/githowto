import { After, Before } from '@cucumber/cucumber';
import * as fs from 'fs';
import { BrowserContextOptions } from 'playwright';
import { CustomWorld } from '../world/custom.world.js';

export function browserContextHook(): void {
    Before(async function(this: CustomWorld, { pickle }) {
        const featureName = pickle.uri.replace('.feature', '').replace(':', '-').replace('\\', '/');
        const scenarioName = pickle.name.split(':').join('').replace('/', '-').replace('\\', '-');
        const path = 'videos/' + featureName + '/' + scenarioName;

        const browserOptions: BrowserContextOptions = {
            recordVideo: { dir: path },
            timezoneId: 'Europe/London',
            viewport: { width: 1280, height: 1024 }
        };

        if (fs.existsSync('browser-context.json')) {
            browserOptions.storageState = 'browser-context.json';
        }
        this.context = await CustomWorld.browser.newContext(browserOptions);
    });

    After(async function(this: CustomWorld) {
        await this.context.close();
    });
}
