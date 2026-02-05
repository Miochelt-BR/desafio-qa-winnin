import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseUrl: string = 'https://ge.globo.com';

  constructor(page: Page) {
    
    this.page = page;
  }

  async navegar() {
    await this.page.goto(this.baseUrl);
  }
}