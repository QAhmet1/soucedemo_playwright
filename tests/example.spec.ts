import { test, expect } from '@playwright/test';
import { InventoryPage } from '../src/pages/InventoryPage';
import { Config } from '@config/config';

/**
 * Describe blokları testleri mantıksal gruplara ayırır.
 */
test.describe('SauceDemo Inventory Tests', () => {
    let inventoryPage: any;

    // Her testten önce çalışacak ortak adımlar
    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        // Session storage sayesinde direkt inventory sayfasına gidebiliriz!
        await page.goto(`${Config.baseUrl}/inventory.html`);
    });

    test('should display the inventory page', async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should add the first product to the cart', async () => {
        await inventoryPage.addFirstProductToCart();
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe("1");
    });

    test('should have items in the inventory list', async ({ page }) => {
        const items = page.locator('.inventory_item');
        await expect(items).toHaveCount(6);
    });
});