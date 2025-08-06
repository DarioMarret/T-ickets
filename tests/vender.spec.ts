import { test, expect } from '@playwright/test';
test('vender tickets', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('#username', 'geovanny');
    await page.fill('#password', '1314780774');
    await page.click('button[type="submit"]');
    await page.evaluate(() => {
        sessionStorage.setItem('SeccionToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJuYW1lIjoiZ2VvdmFubnkiLCJuYW1lIjoiQ0hBVkVaIFBBTExBUk9TTyBHRU9WQU5OWSBTQU5USUFHTyIsImVtYWlsIjoiZWplbXBsb0BnbWFpbC5jb20iLCJwZXJmaWwiOiJhZG1pbiIsInBlcm1pc29zIjpudWxsLCJzdGF0dXMiOjEsImZlY2hhX2NyZWFjaW9uIjoiMjAyMy0wMS0xMyAxNjo1NDo1OSIsImlhdCI6MTc1MzI5MDE4NSwiZXhwIjoxNzUzMjkzNzg1fQ.-3e4rTv0EMWSAaFZHcUFStN4UIjns9mmSIYT6XmthVU');
    });


    // Ir al panel de venta
    await page.goto('http://localhost:3000/admin/Vender-Tickets');
    await page.waitForLoadState('networkidle');
    const botones = page.locator('p.btn-primary', { hasText: /Vender entrada/i })
    // const eventos = await page.locator('a', { hasText: /Evento/i }).allTextContents();
    const count = await botones.count();
   // console.log('Total encontrados:', count);
    for (let i = 0; i < count; i++) {
        const btn = botones.nth(i);
        const visible = await btn.isVisible();
        const texto = await btn.textContent();
       // console.log(`Botón ${i}: "${texto}" visible?`, visible);
    }
    await Promise.all([
        await botones.last().click()
    ]);
    // Validar que fuiste redirigido a la ruta que esperas
    await expect(page).toHaveURL(/\/admin\/Vender-Tickets\/vender\/\d+/);
    const currentUrl = page.url();
    console.log('URL actual:', currentUrl);

});
