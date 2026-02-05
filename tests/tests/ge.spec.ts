import { test } from '@playwright/test';
import { GeHome } from '../../pages/GeHome';

test('Deve carregar a home do GE com pelo menos 10 notícias', async ({ page }) => {
  const ge = new GeHome(page);
  await ge.validarNoticias();
});