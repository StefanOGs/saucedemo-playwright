import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.items = page.getByTestId("inventory-item");
    this.itemNames = this.items.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByTestId("checkout");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
  }

  async removeProduct(name: string) {
    await this.items.filter({ hasText: name }).getByRole("button", { name: "Remove" }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}