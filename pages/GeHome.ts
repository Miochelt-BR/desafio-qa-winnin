import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GeHome extends BasePage {
  readonly cardsNoticias: Locator;

  constructor(page: any) {
    super(page); 
    this.cardsNoticias = page.locator('.feed-post-body');
  }

  async validarNoticias() {
    await this.navegar();
    await this.cardsNoticias.first().waitFor();

    await this.page.mouse.wheel(0, 5000);
    await this.page.waitForTimeout(2000);
    await this.page.mouse.wheel(0, 5000);
    
    await this.page.waitForTimeout(6000);

    const total = await this.cardsNoticias.count();
    
    console.log(`Total de notícias encontradas após scroll: ${total}`);
    expect(total).toBeGreaterThanOrEqual(10);
  }
}