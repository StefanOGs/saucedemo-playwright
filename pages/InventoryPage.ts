import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly products: Locator;
  readonly prices: Locator;
  readonly sortDropdown: Locator;
  readonly activeSort: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.products = page.getByTestId("inventory-item");
    this.prices = page.getByTestId("inventory-item-price");
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.activeSort = page.getByTestId("active-option");
  }

  async getPrices() {
    const priceTexts = await this.prices.allInnerTexts();
    return priceTexts.map((text) => Number(text.replace("$", "")));
  }

  async getProductName(index: number) {
    return this.products.nth(index).getByTestId("inventory-item-name").innerText();
  }

  async addToCart(index: number) {
    await this.products.nth(index).getByRole("button", { name: "Add to cart" }).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }
}