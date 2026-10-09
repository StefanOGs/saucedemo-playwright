# SauceDemo – QA Homework

Manual test cases, a bug report and Playwright UI tests for [SauceDemo](https://www.saucedemo.com/).

## Contents

- `ManualTestCases.feature` – manual test cases in Gherkin 
- `BugReport.md` – bug found during exploratory testing 
- `tests/` and `pages/` – UI automation with Playwright and TypeScript 

## How to run the tests

Requirements: Node.js 20 or newer.

```bash
npm install
npx playwright install
npx playwright test
```

The tests run in Chromium, Firefox and WebKit. To see the HTML report after a run:

```bash
npx playwright show-report
```

To run in one browser with the browser window visible:

```bash
npx playwright test --project=chromium --headed
```

## Automated scenario

`tests/purchase.spec.ts` follows the steps from the assignment. Each step is a `test.step()`, so it is shown separately in the report:

1. Get the standard user's credentials and log in
2. Add the products with the highest and the lowest price
3. Remove the highest priced product and verify the cart
4. Sort by Name (A to Z) and add the last product
5. Go to checkout
6. Finish the order
7. Verify that the order is placed
8. Verify that the cart is empty
9. Log out

## Approach

**Credentials.** The username and password are not hardcoded. SauceDemo shows the accepted usernames and the password on the login page, so the test reads them from there and picks the user whose name starts with `standard`. If they change, the test still works.

**Products.** Product names and prices are not hardcoded either. The test reads the prices from the page and finds the highest and the lowest, and after sorting it takes the last product in the list.

**Page Object Model.** Locators and actions for each page are in `pages/`. The test only describes the steps and the checks, so if the UI changes, only the page object needs to be updated.

```
pages/
  LoginPage.ts      login form and credentials
  InventoryPage.ts  product list, prices, sorting, add to cart
  CartPage.ts       cart items, remove, checkout
  CheckoutPage.ts   customer information, finish, confirmation
  Header.ts         cart icon, cart badge, menu and logout
tests/
  purchase.spec.ts  the automated scenario
```

**Locators.** SauceDemo has `data-test` attributes on its elements, so `testIdAttribute` is set to `data-test` in `playwright.config.ts` and the tests use `getByTestId()`. Buttons inside a product card and the menu button are found with `getByRole()`.

**Language.** The assignment allows JavaScript. I used TypeScript because it is the default for Playwright and compiles to JavaScript; Playwright runs the `.ts` files directly, so no extra build step is needed.
