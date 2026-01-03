import { Page } from "@playwright/test";

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
}