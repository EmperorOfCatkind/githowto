import { chromium } from 'playwright';
import { Config } from 'src/helpers/config.helper';


export async function grabSessionCookie(headless = true): Promise<string> {
    const browser = await chromium.launch({ headless });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(Config.baseURL, { waitUntil: 'domcontentloaded' });
    await page.goto(`${Config.baseURL}auth/login`, { waitUntil: 'domcontentloaded' });

    await page.fill('input#email', Config.login);
    await page.fill('input#password', Config.password);

    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 })
    ]);

    if (page.url().includes('/auth/login')) {
        await browser.close();
        throw new Error('Login failed: still on /auth/login');
    }

    const cookies = await context.cookies();
    await browser.close();

    if (cookies.length === 0) {
        throw new Error('No cookies found after login');
    }

    //console.log(cookies);
    return cookies.map(c => `${c.name}=${c.value}`).join('; ');
}
