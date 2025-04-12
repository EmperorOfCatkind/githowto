export class HomePage {
    public constructor(private page: import('playwright').Page) {}

    public async navigate(): Promise<void>{
        await this.page.goto('/');
    }

    public async getTitle(): Promise<string> {
        return this.page.title();
    }
}
