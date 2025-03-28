
import { browser, $$ } from '@wdio/globals';

export default class Page {
    public async open(path: string): Promise<void> {
        await browser.url(path);
    }

    public async acceptCookiesIfVisible(): Promise<void> {
        const acceptButton = await this.findAcceptCookiesButton();
        if (!acceptButton) return;

        if (await acceptButton.isDisplayed()) {
            await acceptButton.click();
            await this.waitForAllAcceptButtonsToDisappear();
        }
    }

    private async findAcceptCookiesButton(): Promise<import('webdriverio').ChainablePromiseElement | undefined> {
        const buttons = await $$('ytd-button-renderer');
        for (const btn of buttons) {
            const text = await btn.getText();
            if (text.includes('Accept all')) {
                return await btn.$('button');
            }
        }
        return undefined;
    }

    private async waitForAllAcceptButtonsToDisappear(): Promise<void> {
        await browser.waitUntil(async () => {
            try {
                const buttons = await $$('ytd-button-renderer');
                for (const btn of buttons) {
                    const txt = await btn.getText();
                    if (txt.includes('Accept all') && await btn.isDisplayed()) {
                        return false;
                    }
                }
                return true;
            } catch {
                return true;
            }
        }, {
            timeout: 10000,
            timeoutMsg: '"Accept all" buttons still visible after click'
        });
    }
}
