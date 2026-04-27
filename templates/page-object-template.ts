// ==============================================================================
// PAGE OBJECT TEMPLATE
// Copy this file to pages/<module>/<module>-page.ts and replace all <placeholders>
// ==============================================================================

import { Page, Locator } from '@playwright/test';

/**
 * <PageName> Page Object
 * Module  : <Module Name>
 * URL     : <relative or absolute URL of the page>
 * Description: <Brief description of what this page covers>
 */
export class <PageName>Page {
    private readonly page: Page;

    // -------------------------------------------------------------------------
    // Locators — keep all selectors here, never inline them in methods
    // -------------------------------------------------------------------------
    private readonly <elementName>: Locator;
    // private readonly <anotherElement>: Locator;

    constructor(page: Page) {
        this.page = page;
        this.<elementName> = page.locator('<selector>');
        // this.<anotherElement> = page.locator('<selector>');
    }

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------

    /**
     * Navigates to the <PageName> page.
     */
    async navigate(): Promise<void> {
        await this.page.goto('<relative-url>');
    }

    // -------------------------------------------------------------------------
    // Actions — methods that represent user interactions
    // -------------------------------------------------------------------------

    /**
     * <Description of what the method does>.
     * @param value - <description of the parameter>
     */
    async <actionMethodName>(value?: string): Promise<void> {
        await this.<elementName>.fill(value ?? '');
    }

    /**
     * Clicks the <element description>.
     */
    async click<ElementName>(): Promise<void> {
        await this.<elementName>.click();
    }

    // -------------------------------------------------------------------------
    // Getters — methods that return a value for use in step definitions
    // -------------------------------------------------------------------------

    /**
     * Returns the text content of <element description>.
     */
    async get<ElementName>Text(): Promise<string> {
        return (await this.<elementName>.textContent()) ?? '';
    }

    // -------------------------------------------------------------------------
    // Verifications — wait for expected states (no assertions here)
    // -------------------------------------------------------------------------

    /**
     * Waits until the page title or heading matches the expected value.
     * @param title - expected page title text
     */
    async verifyPageTitle(title: string): Promise<void> {
        await this.page.getByRole('heading', { name: title }).waitFor({ state: 'visible' });
    }

    /**
     * Waits until <element description> is visible on the page.
     */
    async verify<ElementName>IsVisible(): Promise<void> {
        await this.<elementName>.waitFor({ state: 'visible' });
    }
}
