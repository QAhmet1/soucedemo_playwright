import { expect, Page } from "@playwright/test";
import { Locator } from "@playwright/test";

/**
 * The BasePage class acts as a parent for all Page Objects.
 * It holds the common 'page' instance and shared utilities.
 */
export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Shared utility for repetitive navigation tasks.
     */
    protected async navigateTo(path: string = "") {
        await this.page.goto(path);
    }

    /**
     * @description Generic assertion to verify if a locator contains the expected text.
     * Playwright's toHaveText has a built-in auto-retry mechanism.
     * @param locator The Playwright Locator to check.
     * @param expectedText The string value expected to be present in the element.
     */
    public async verifyElementText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator, `Expected text '${expectedText}' was not found in the element`).toHaveText(expectedText);
    }
}