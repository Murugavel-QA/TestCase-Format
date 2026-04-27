// ==============================================================================
// STEP DEFINITIONS TEMPLATE
// Copy this file to steps/<module>-steps.ts and replace all <placeholders>
// ==============================================================================

import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
// Replace <PageClass> and the import path with your actual page object
import { <PageClass> } from '../pages/<module>/<module>-page';

const { Given, When, Then } = createBdd();

// ---------------------------------------------------------------------------
// <Module Name> Steps
// ---------------------------------------------------------------------------

let <pageName>: <PageClass>;

// ---------------------------------------------------------------------------
// Given Steps — set up preconditions
// ---------------------------------------------------------------------------

Given('I navigate to the application URL', async ({ page }) => {
    <pageName> = new <PageClass>(page);
    await <pageName>.navigate();
});

Given('I am on the {string} page', async ({ page }, pageName: string) => {
    // Verify the user is on the expected page
    await <pageName>.verifyPageTitle(pageName);
});

// ---------------------------------------------------------------------------
// When Steps — describe user actions
// ---------------------------------------------------------------------------

When('<action step text>', async ({ page }) => {
    await <pageName>.<actionMethod>();
});

When('<action step with string parameter> {string}', async ({ page }, value: string) => {
    await <pageName>.<actionMethod>(value);
});

// ---------------------------------------------------------------------------
// Then Steps — verify expected outcomes
// ---------------------------------------------------------------------------

Then('<assertion step text>', async ({ page }) => {
    await expect(page.locator('<selector>')).toBeVisible();
});

Then('<assertion step with string parameter> {string}', async ({ page }, expected: string) => {
    const actual = await <pageName>.<getMethod>();
    expect(actual).toBe(expected);
});
