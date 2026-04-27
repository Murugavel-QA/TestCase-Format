# TestCase-Format

This repository defines the **standard test case format** to be used across all automation projects. All projects must follow this structure and naming convention when writing BDD feature files, step definitions, and page objects.

---

## 📋 Table of Contents
- [Test Case Format Standard](#test-case-format-standard)
- [Feature File Format](#feature-file-format)
- [Step Definitions Format](#step-definitions-format)
- [Page Object Format](#page-object-format)
- [Test Data Format](#test-data-format)
- [Naming Conventions](#naming-conventions)
- [Tags & Categorisation](#tags--categorisation)
- [Directory Structure](#directory-structure)
- [Templates](#templates)

---

## 🎯 Test Case Format Standard

All test cases must be written using **Gherkin BDD syntax** inside `.feature` files. Each scenario represents one test case and must include all mandatory fields defined in this document.

### Mandatory Fields per Scenario

| Field           | Gherkin Keyword              | Required |
|-----------------|------------------------------|----------|
| Test Case Title | `Scenario:` name             | ✅ Yes   |
| Module/Feature  | `Feature:` name              | ✅ Yes   |
| Preconditions   | `Background:` / `Given`      | ✅ Yes   |
| Test Steps      | `When` / `And`               | ✅ Yes   |
| Expected Result | `Then` / `And`               | ✅ Yes   |
| Priority Tag    | `@high` / `@medium` / `@low` | ✅ Yes   |
| Suite Tag       | `@smoke` / `@regression` / `@sanity` | ✅ Yes |
| Test Case ID    | `@TC_<MODULE>_<NNN>`         | ✅ Yes   |

---

## 📝 Feature File Format

Feature files live in the `features/` folder of each project. Follow this exact structure:

```gherkin
@<module>
Feature: <Feature Title>
  As a <role>
  I want to <goal>
  So that <benefit>

  Background:
    Given I navigate to the application URL
    And I am on the "<page name>" page

  @smoke @high @TC_<MODULE>_001
  Scenario: <Brief title describing what is being tested>
    Given <initial state or precondition>
    When  <action performed by the user>
    And   <additional action if needed>
    Then  <expected outcome>
    And   <additional expected outcome if needed>

  @regression @medium @TC_<MODULE>_002
  Scenario Outline: <Data-driven scenario title>
    Given <precondition with "<variable>">
    When  <action with "<variable>">
    Then  <expected result with "<expected>">

    Examples:
      | variable | expected |
      | value1   | result1  |
      | value2   | result2  |
```

### Rules
- One `.feature` file per functional module (e.g., `login.feature`, `checkout.feature`)
- Feature title must match the module name
- Each scenario must have at minimum one `Given`, one `When`, and one `Then`
- Use `And` instead of repeating `Given`/`When`/`Then`
- Scenarios must be independent — no scenario should depend on another
- Keep steps business-readable; avoid technical implementation details

---

## 🔧 Step Definitions Format

Step definition files live in the `steps/` folder and must follow this structure:

```typescript
import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { <PageClass> } from '../pages/<module>/<page-name>-page';

const { Given, When, Then } = createBdd();

// ---------------------------------------------------------------------------
// <Module Name> Steps
// ---------------------------------------------------------------------------

let <pageName>: <PageClass>;

Given('<step text>', async ({ page }) => {
    <pageName> = new <PageClass>(page);
    await <pageName>.<method>();
});

When('<step text>', async ({ page }) => {
    await <pageName>.<method>();
});

Then('<step text>', async ({ page }) => {
    await expect(<pageName>.<locator>).toBeVisible();
});
```

### Rules
- One step definitions file per feature file (e.g., `login-steps.ts` for `login.feature`)
- File names must end in `-steps.ts`
- Always import only the page objects needed for that module
- Steps must be atomic — one action per step
- Avoid duplicating step definitions across files

---

## 🖥️ Page Object Format

Page object files live in `pages/<module>/` and must follow this structure:

```typescript
import { Page, Locator } from '@playwright/test';

/**
 * <PageName> Page Object
 * Module: <Module Name>
 * Description: <Brief description of what this page covers>
 */
export class <PageName>Page {
    private readonly page: Page;

    // Locators
    private readonly <elementName>: Locator;

    constructor(page: Page) {
        this.page = page;
        this.<elementName> = page.locator('<selector>');
    }

    /**
     * <Description of what the method does>
     */
    async <methodName>(): Promise<void> {
        await this.<elementName>.<action>();
    }

    /**
     * <Description of assertion method>
     */
    async verify<ElementName>IsVisible(): Promise<void> {
        await this.<elementName>.waitFor({ state: 'visible' });
    }
}
```

### Rules
- One class per page or major component
- Locators must be `private readonly` properties
- Methods must be `async` and return `Promise<void>` or a typed value
- Method names must start with a verb (e.g., `click`, `fill`, `verify`, `get`)
- No assertions inside page objects — assertions belong in step definitions
- Add JSDoc comments for every public method

---

## 📊 Test Data Format

Test data files live in `test-data/` (JSON) or `test-data-excel/` (Excel) and must follow this structure:

```json
{
  "<moduleKey>": {
    "valid": {
      "<fieldName>": "<value>",
      "<fieldName>": "<value>"
    },
    "invalid": {
      "<fieldName>": "<value>",
      "<fieldName>": "<value>"
    }
  }
}
```

### Rules
- One JSON file per module (e.g., `login-data.json`, `checkout-data.json`)
- Always include both `valid` and `invalid` data sets
- Do not hardcode sensitive data (passwords, tokens) — use environment variables
- Use Excel files only for large data-driven tests with many rows

---

## 🏷️ Naming Conventions

| Artefact             | Convention               | Example                 |
|----------------------|--------------------------|-------------------------|
| Feature file         | `<module>.feature`       | `login.feature`         |
| Step definitions     | `<module>-steps.ts`      | `login-steps.ts`        |
| Page object file     | `<module>-page.ts`       | `login-page.ts`         |
| Page object class    | `<Module>Page`           | `LoginPage`             |
| Test data file       | `<module>-data.json`     | `login-data.json`       |
| Type definition file | `<module>-data.ts`       | `login-data.ts`         |

---

## 🏷️ Tags & Categorisation

Every scenario **must** have exactly one tag from each of the following groups:

### Suite Tags
| Tag           | Usage                                              |
|---------------|----------------------------------------------------|
| `@smoke`      | Critical happy-path tests, run on every build      |
| `@sanity`     | Quick health-check tests after a deployment        |
| `@regression` | Full regression suite covering all scenarios       |

### Priority Tags
| Tag       | Usage                                         |
|-----------|-----------------------------------------------|
| `@high`   | Must-pass; blocker if failing                 |
| `@medium` | Should-pass; important but not a blocker      |
| `@low`    | Nice-to-have; low impact if failing           |

### Test Case ID Tags
Format: `@TC_<MODULE>_<NNN>` where `<MODULE>` is the feature module in uppercase and `<NNN>` is a zero-padded three-digit number.

Examples: `@TC_LOGIN_001`, `@TC_CHECKOUT_003`, `@TC_DASHBOARD_012`

---

## 📁 Directory Structure

Each project must follow this exact folder structure:

```
<project-name>/
│
├── features/                        # Gherkin feature files (one per module)
│   └── <module>.feature
│
├── steps/                           # Step definitions (one per feature file)
│   └── <module>-steps.ts
│
├── pages/                           # Page Object Model classes
│   └── <module>/
│       └── <module>-page.ts
│
├── test-data/                       # JSON test data files
│   └── <module>-data.json
│
├── test-data-excel/                 # Excel test data files (data-driven only)
│   └── <module>-data.xlsx
│
├── types/                           # TypeScript type definitions
│   └── <module>-data.ts
│
├── Uploadfiles/                     # Files used in upload test scenarios
│
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # NPM dependencies
└── README.md                        # Project documentation
```

---

## 📂 Templates

Ready-to-use template files are available in the [`templates/`](templates/) folder:

| Template File                                                                | Purpose                       |
|------------------------------------------------------------------------------|-------------------------------|
| [`feature-template.feature`](templates/feature-template.feature)             | Gherkin feature file template |
| [`step-definitions-template.ts`](templates/step-definitions-template.ts)     | Step definitions template     |
| [`page-object-template.ts`](templates/page-object-template.ts)               | Page object class template    |
| [`test-data-template.json`](templates/test-data-template.json)               | Test data JSON template       |

### How to Use Templates

1. Copy the relevant template file into the appropriate folder of your project
2. Rename the file following the [Naming Conventions](#naming-conventions)
3. Replace all `<placeholder>` values with your actual implementation
4. Delete any commented-out sections that are not needed

---

**Standard maintained by: Murugavel-QA**  
**Last Updated: April 2026**
