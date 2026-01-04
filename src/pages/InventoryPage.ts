import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * InventoryPage handles actions on the products listing screen.
 */
export class InventoryPage extends BasePage{

    private readonly firstProductAddBtn: Locator;
    private readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        super(page);
        // Locator for the first 'Add to cart' button
        this.firstProductAddBtn = page.locator(".inventory_item button").first();
        // Locator for the cart quantity badge
        this.shoppingCartBadge = page.locator(".shopping_cart_badge");
        this.sortContainer = '.product_sort_container';
        this.itemPrices = '.inventory_item_price';
        this.inventoryButtons = '.btn_inventory';
    }

    public async addFirstProductToCart(): Promise<void> {
        await this.firstProductAddBtn.click();
    }

    public async getCartCount(): Promise<string | null> {
        return await this.shoppingCartBadge.textContent();
    }

    public async sortProductsBy(option: 'lohi' | 'hilo' | 'az' | 'za') {
        await this.page.selectOption(this.sortContainer, option);
    }

    /**
     * @description High-level action: Extracts and formats prices into numbers.
     * Moving the 'map' logic here keeps tests clean.
     */
    public async getAllPricesAsNumbers(): Promise<number[]> {
        const priceTexts = await this.page.locator(this.itemPrices).allInnerTexts();
        return priceTexts.map(p => parseFloat(p.replace('$', '')));
    }

    public async getFirstItemButton() {
        return this.page.locator(this.inventoryButtons).first();
    }
}