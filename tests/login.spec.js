// tests/login.setup.ts
// // tests/login.setup.ts
// import { test as setup, expect } from '@playwright/test';
// import fs from 'fs';
// setup('guardar sesión', async ({ page }) => {
//     await page.goto('http://localhost:3000/auth/login')
//     await page.fill('#username', 'geovanny')
//     await page.fill('#password', '1314780774')
//     await page.click('button[type="submit"]');

//     // Guarda la sesión
//     await page.context().storageState({ path: 'storage/state.json' });
// });