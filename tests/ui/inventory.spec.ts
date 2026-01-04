// tests/ui/example.spec.ts
import { test, expect } from '@playwright/test'; 
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
        await test.step('Change sorting to Low to High',async()=>{
           await inventoryPage.sortProductsBy('lohi');
        })
        // Step 2: Validate the logic
        await test.step('Validate the logic',async()=>{
        const numericPrices = await inventoryPage.getAllPricesAsNumbers(); 
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);
        expect(numericPrices, 'Prices should be sorted in ascending order').toEqual(sortedPrices);
        })
        
    });

    test('should toggle button state between "Add to cart" and "Remove"', async ({ page }) => {
        await test.step('Add item and verify button change', async () => {
            await inventoryPage.adRemoveBtn.click();
            await inventoryPage.verifyElementText(inventoryPage.adRemoveBtn,'Remove')
        });
        await test.step('Remove item and verify button reverts', async () => {
            await inventoryPage.adRemoveBtn.click();
            await inventoryPage.verifyElementText(inventoryPage.adRemoveBtn,'Add to cart')
        });
    });
});