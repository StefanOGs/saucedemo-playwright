import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly usersText: Locator;
  readonly passwordText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.usersText = page.getByTestId("login-credentials");
    this.passwordText = page.getByTestId("login-password");
  }

  async open() {
    await this.page.goto("/");
  }

  async getStandardUsername() {
    const text = await this.usersText.innerText();
    const username = text.split("\n").find((line) => line.startsWith("standard"));
    if (!username) {
      throw new Error("Standard user not found on the login page");
    }
    return username;
  }

  async getPassword() {
    const text = await this.passwordText.innerText();
    return text.split("\n")[1];
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}