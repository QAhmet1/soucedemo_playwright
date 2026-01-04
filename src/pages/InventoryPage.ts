import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * @description InventoryPage manages all interactions and validations on the product listing screen.
 */
export class InventoryPage extends BasePage {
    // 1. All locators are defined at the top as private and readonly
    private readonly shoppingCartBadge: Locator;
    private readonly sortContainer: Locator; 
    private readonly itemPrices: Locator;    
    private readonly inventoryButtons: Locator;// add/remove buttons

    constructor(page: Page) {
        super(page);
        // 2. Consistent initialization: Everything is a Locator object now
        this.shoppingCartBadge = page.locator(".shopping_cart_badge");
        this.sortContainer = page.locator('.product_sort_container');
        this.itemPrices = page.locator('.inventory_item_price');
        this.inventoryButtons = page.locator('.btn_inventory');
    }

    // --- ACTIONS ---

    public async addFirstProductToCart(): Promise<void> {
        await this.inventoryButtons.first().click();
    }

    public async sortProductsBy(option: 'lohi' | 'hilo' | 'az' | 'za'): Promise<void> {
        // Clean call: No need for this.page.locator() anymore
        await this.sortContainer.selectOption(option);
    }

    // --- DATA RETRIEVAL ---

    public async getCartCount(): Promise<string | null> {
        return await this.shoppingCartBadge.textContent();
    }

    public async getAllPricesAsNumbers(): Promise<number[]> {
        // More readable and consistent access
        const priceTexts = await this.itemPrices.allInnerTexts();
        return priceTexts.map(p => parseFloat(p.replace('$', '')));
    }

    // --- GETTERS FOR ASSERTIONS ---

    /**
     * @description Public getter to expose the first button for assertions in test files.
     */
    public get adRemoveBtn(): Locator {
        return this.inventoryButtons.first();
    }
}