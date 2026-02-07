import {
  Before,
  After,
  Given,
  When,
  Then,
  setDefaultTimeout
} from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { GeHome } from '../../pages/GeHome.js';


setDefaultTimeout(60000);

let browser: Browser;
let page: Page;
let geHome: GeHome;

Before(async () => {
  // headless: false permite que você acompanhe a execução visualmente
  browser = await chromium.launch({ headless: false }); 
  page = await browser.newPage();
  geHome = new GeHome(page);
});

Given('que eu navego para a home do GE', async () => {
  await geHome.navegar();
});

Then('a página deve exibir no mínimo 10 notícias', async () => {
  await geHome.carregarNoticias();
  await geHome.validarQuantidadeMinima(10);
});

Then('cada notícia deve conter título e imagem ou resumo', async () => {
  await geHome.validarConteudoDasNoticias();
});

When('eu clico na primeira notícia', async () => {
  await geHome.abrirPrimeiraNoticia();
});


Then('devo ser redirecionado para a página da matéria completa', async () => {
  await geHome.validarPaginaMateria();
});

When('eu acesso a página do time {string}', async (time: string) => {

  await geHome.navegarParaTime(time);
});

Then('devo visualizar a página oficial do time {string}', async (time: string) => {
 
  await geHome.validarPaginaDoTime(time);
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});