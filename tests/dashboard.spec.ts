import { test, expect } from '@playwright/test';

test.use({ storageState: 'storage/state.json' });

test('ver dashboard', async ({ page }) => {
    // 1. Ir primero a tu dominio real (necesario para que sessionStorage esté disponible)
    await page.goto('http://localhost:3000/auth/login')
    await page.fill('#username', 'geovanny')
    await page.fill('#password', '1314780774')
    await page.click('button[type="submit"]');

    await page.evaluate(() => {
        sessionStorage.setItem('SeccionToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJuYW1lIjoiZ2VvdmFubnkiLCJuYW1lIjoiQ0hBVkVaIFBBTExBUk9TTyBHRU9WQU5OWSBTQU5USUFHTyIsImVtYWlsIjoiZWplbXBsb0BnbWFpbC5jb20iLCJwZXJmaWwiOiJhZG1pbiIsInBlcm1pc29zIjpudWxsLCJzdGF0dXMiOjEsImZlY2hhX2NyZWFjaW9uIjoiMjAyMy0wMS0xMyAxNjo1NDo1OSIsImlhdCI6MTc1MzI5MDE4NSwiZXhwIjoxNzUzMjkzNzg1fQ.-3e4rTv0EMWSAaFZHcUFStN4UIjns9mmSIYT6XmthVU');
        // O cualquier otro item que tu app use para la sesión
    });

    await page.goto('http://localhost:3000/admin/inicio');

    await page.waitForLoadState('networkidle');
    const eventos = await page.locator('a', { hasText: /Evento/i }).allTextContents();

});