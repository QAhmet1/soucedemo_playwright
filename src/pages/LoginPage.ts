import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Encapsulating locators and actions for the login page.
 * Comments are in English as requested.
 */
export class LoginPage extends BasePage{
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#login-button");
    }

    public async login(user: string, pass: string): Promise<void> {
        // High-level action that combines multiple low-level steps
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }
}