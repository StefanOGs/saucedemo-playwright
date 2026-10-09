import { Page, Locator } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByTestId("logout-sidebar-link");
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}