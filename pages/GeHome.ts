import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class GeHome extends BasePage {

  async navegar() {
    await this.page.goto('https://ge.globo.com/', { waitUntil: 'domcontentloaded' });
  }

  async carregarNoticias() {
    for (let i = 0; i < 6; i++) {
      await this.page.mouse.wheel(0, 1500);
      await this.page.waitForTimeout(800);
    }
  }

  async validarQuantidadeMinima(minimo: number) {
    const noticias = this.page.locator('.feed-post-link');
    await noticias.first().waitFor({ state: 'attached', timeout: 15000 });
    const total = await noticias.count();
    if (total < minimo) throw new Error(`Esperado ${minimo}, encontrou ${total}`);
  }

  async validarConteudoDasNoticias() {
    const containers = this.page.locator('.feed-post-body');
    for (let i = 0; i < 10; i++) {
      const container = containers.nth(i);
      const temTitulo = await container.locator('.feed-post-link').isVisible();
      const temImagem = await container.locator('img').first().isVisible();
      const temResumo = await container.locator('.feed-post-description').isVisible();

      if (!temTitulo) throw new Error(`Notícia ${i + 1} sem título.`);
      if (!temImagem && !temResumo) throw new Error(`Notícia ${i + 1} sem imagem e sem resumo.`);
    }
  }

  async abrirPrimeiraNoticia() {
    const link = this.page.locator('a.feed-post-link').first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    await link.scrollIntoViewIfNeeded();

    const urlOriginal = this.page.url();

  
    await link.focus();
    await this.page.keyboard.press('Enter');

   
    await this.page.waitForTimeout(3000);
    if (this.page.url() === urlOriginal) {
      
      await link.evaluate((el: any) => {
        const destino = el.href;
        if (destino) {
          
          (globalThis as any).location.href = destino;
        } else {
          el.click();
        }
      });
    }
  }

  async validarPaginaMateria() {
    let sucesso = false;
    const urlHome = 'https://ge.globo.com/';

    // Polling estendido (60 segundos)
    for (let i = 0; i < 120; i++) { 
      const urlAtual = this.page.url();
      const ehMateria = /\.ghtml|\.html|\/noticia\/|\/materia\//.test(urlAtual);
      
      if (urlAtual !== urlHome && !urlAtual.endsWith('globo.com/') && ehMateria) {
        sucesso = true;
        break;
      }
      await this.page.waitForTimeout(500);
    }

    if (!sucesso) {
      throw new Error(`Navegação falhou. O navegador permaneceu na Home: ${this.page.url()}`);
    }
  }

  async navegarParaTime(time: string) {
    const slug = time.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
      
    await this.page.goto(`https://ge.globo.com/futebol/times/${slug}/`, { 
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });
  }

  async validarPaginaDoTime(time: string) {
    const slug = time.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    await expect(this.page).toHaveURL(new RegExp(slug));
  }
}