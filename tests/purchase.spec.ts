import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { Header } from "../pages/Header";

test("Standard User can complete a purchase", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const header = new Header(page);

  await test.step("1-2. Get the standard user's credentials and log in", async () => {
    await loginPage.open();

    const username = await loginPage.getStandardUsername();
    const password = await loginPage.getPassword();
    await loginPage.login(username, password);

    await expect(inventoryPage.title).toHaveText("Products");
  });

  const { highestPriceName, lowestPriceName } = await test.step(
    "3. Add the products with the highest and the lowest price",
    async () => {
      const prices = await inventoryPage.getPrices();
      const highestIndex = prices.indexOf(Math.max(...prices));
      const lowestIndex = prices.indexOf(Math.min(...prices));

      const highestPriceName = await inventoryPage.getProductName(highestIndex);
      const lowestPriceName = await inventoryPage.getProductName(lowestIndex);

      await inventoryPage.addToCart(highestIndex);
      await inventoryPage.addToCart(lowestIndex);

      await expect(header.cartBadge).toHaveText("2");
      return { highestPriceName, lowestPriceName };
    },
  );

  await test.step("4. Remove the highest priced product and verify the cart", async () => {
    await header.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
    await expect(cartPage.itemNames).toHaveText([highestPriceName, lowestPriceName]);

    await cartPage.removeProduct(highestPriceName);

    await expect(cartPage.itemNames).toHaveText([lowestPriceName]);
  });

  const lastName = await test.step("5. Sort by Name (A to Z) and add the last product", async () => {
    await cartPage.continueShopping();
    await expect(inventoryPage.title).toHaveText("Products");

    await inventoryPage.sortBy("Name (A to Z)");
    await expect(inventoryPage.activeSort).toHaveText("Name (A to Z)");

    const lastIndex = (await inventoryPage.products.count()) - 1;
    const lastName = await inventoryPage.getProductName(lastIndex);
    await inventoryPage.addToCart(lastIndex);

    await expect(header.cartBadge).toHaveText("2");
    return lastName;
  });

  await test.step("6. Go to checkout", async () => {
    await header.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
    await expect(cartPage.itemNames).toHaveText([lowestPriceName, lastName]);

    await cartPage.checkout();
    await expect(checkoutPage.title).toHaveText("Checkout: Your Information");

    await checkoutPage.fillInformation("Stefan", "Angelov", "1000");
  });

  await test.step("7. Finish the order", async () => {
    await expect(checkoutPage.title).toHaveText("Checkout: Overview");
    await checkoutPage.finish();
  });

  await test.step("8. Verify that the order is placed", async () => {
    await expect(checkoutPage.title).toHaveText("Checkout: Complete!");
    await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");
  });

  await test.step("9. Verify that the cart is empty", async () => {
    await expect(header.cartBadge).toBeHidden();

    await header.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
    await expect(cartPage.items).toHaveCount(0);
  });

  await test.step("10. Log out", async () => {
    await header.logout();

    await expect(loginPage.loginButton).toBeVisible();
  });
});