import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { Config } from '../src/config/config';
import path from 'path';

// Session verisinin kaydedileceği dosya yolu
const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(Config.baseUrl);
    await loginPage.login(Config.adminUser, Config.adminPass);
    
    // Login işleminin başarılı olduğunu doğrula
    await expect(page).toHaveURL(/inventory.html/);

    // Tarayıcı durumunu (cookies, storage vb.) dosyaya kaydet
    await page.context().storageState({ path: authFile });
});