import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from '../world/custom.world.js';


export function browserHook():void {
    BeforeAll(async function() {
        CustomWorld.browser = await chromium.launch({ headless: false });
    });


    AfterAll(async function() {
        await CustomWorld.browser.close();
    });
}
