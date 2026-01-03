import { test, expect } from '@playwright/test';
import {Config} from '../src/config/config'
import { LoginPage } from '../src/pages/LoginPage'
import { InventoryPage} from '../src/pages/InventoryPage';




test('Souce demo title test', async ({ page }) => {
    const lp=new LoginPage(page);
    const inventoryPage=new InventoryPage(page)
   // 1. Navigate to dynamic URL
    await page.goto(Config.baseUrl);

    // 2. Perform login using dynamic credentials from config
    await lp.login(Config.adminUser, Config.adminPass);

    // 3. Assertion: Verify we are on the inventory page
    await expect(page).toHaveURL(/inventory.html/);
   

    // 4. Add first item to the cart
    await inventoryPage.addFirstProductToCart()

    // 5. Assertion: Verify cart badge shows '1'
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe("1");
    await page.pause()

});
