Feature: Purchase flow on SauceDemo
  As a customer of SauceDemo
  I want to buy products from the online store
  So that I can receive the items I need

  Background:
    Given I am on the SauceDemo login page

  @positive
  Scenario: Standard user completes a purchase successfully
    Given I am logged in as "standard_user"
    And I have added "Sauce Labs Backpack" to the cart
    When I open the cart
    Then I should see "Sauce Labs Backpack" in the cart
    When I click "Checkout"
    And I enter first name "Ivan", last name "Petrov" and postal code "1000"
    And I click "Continue"
    Then I should see "Sauce Labs Backpack" on the overview page
    And the item total should be "$29.99"
    When I click "Finish"
    Then I should see the message "Thank you for your order!"
    And the cart should be empty

  @negative
  Scenario: Checkout is blocked when the postal code is missing
    Given I am logged in as "standard_user"
    And I have added "Sauce Labs Backpack" to the cart
    When I open the cart
    And I click "Checkout"
    And I enter first name "Ivan" and last name "Petrov"
    And I leave the postal code empty
    And I click "Continue"
    Then I should see the error "Error: Postal Code is required"
    And I should stay on the checkout information page
    When I enter postal code "1000"
    And I click "Continue"
    Then I should see the checkout overview page

  @negative
  Scenario: Logged out user cannot access the store pages
    Given I am logged in as "standard_user"
    And I have added "Sauce Labs Backpack" to the cart
    When I log out from the menu
    Then I should see the login page
    When I open "https://www.saucedemo.com/inventory.html" directly in the browser
    Then I should see the error "Epic sadface: You can only access '/inventory.html' when you are logged in."
    And I should not see any products

  @edge
  Scenario: Customer can buy every product in the store in one order
    Given I am logged in as "standard_user"
    When I add every product on the products page to the cart
    Then the cart badge should show "6"
    When I open the cart
    Then I should see all 6 products in the cart
    When I click "Checkout"
    And I enter first name "Ivan", last name "Petrov" and postal code "1000"
    And I click "Continue"
    Then the item total should be "$129.94"
    And the tax should be "$10.40"
    And the total should be "$140.34"
    When I click "Finish"
    Then I should see the message "Thank you for your order!"
    And the cart should be empty