// tests/ui/example.spec.ts
import { test, expect } from '@playwright/test'; // FIX: This was missing
import { InventoryPage } from '@pages/InventoryPage';
import { Config } from '@config/config';

/**
 * @description Advanced UI validation for sorting and complex cart workflows.
 */
test.describe('SauceDemo: Advanced Inventory Workflows', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        await page.goto(`${Config.baseUrl}/inventory.html`);
    });

    test('should sort products by price (Low to High)', async ({ page }) => {
        // Step 1: Change sorting to Low to High
        await inventoryPage.sortProductsBy('lohi');

        // Step 2: Validate the logic
        const numericPrices = await inventoryPage.getAllPricesAsNumbers();
        
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);
        expect(numericPrices, 'Prices should be sorted in ascending order').toEqual(sortedPrices);
    });

    test('should toggle button state between "Add to cart" and "Remove"', async ({ page }) => {
        const firstItemBtn = page.locator('.btn_inventory').first();
        
        await test.step('Add item and verify button change', async () => {
            await firstItemBtn.click();
            await expect(firstItemBtn).toHaveText('Remove');
        });

        await test.step('Remove item and verify button reverts', async () => {
            await firstItemBtn.click();
            await expect(firstItemBtn).toHaveText('Add to cart');
        });
    });
});