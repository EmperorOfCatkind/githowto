
import { browser, $$ } from '@wdio/globals';

export default class Page {
    public async open(path: string): Promise<void> {
        await browser.url(path);
    }

    public async acceptCookiesIfVisible(): Promise<void> {
        const buttons = await $$('ytd-button-renderer');
        for (const btn of buttons) {
            const text = await btn.getText();
            if (text.includes('Accept all')) {
                await btn.click();
                await btn.waitForExist({ reverse: true, timeout: 5000 });
                break;
            }
        }
    }
}
