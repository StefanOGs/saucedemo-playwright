# Bug Report

**Title:** problem_user cannot enter a last name at checkout, so the order cannot be completed

**Environment:** https://www.saucedemo.com, Windows 11, Chrome / Firefox / Safari (WebKit)

**User:** problem_user / secret_sauce

**Severity:** Critical

**Priority:** High

**Reproducibility:** Always

## Steps to reproduce

1. Log in with `problem_user` / `secret_sauce`.
2. Add "Sauce Labs Backpack" to the cart.
3. Open the cart and click **Checkout**.
4. Type `Stefan` in **First Name**.
5. Type `Angelov` in **Last Name**.
6. Type `1000` in **Postal Code**.
7. Click **Continue**.

## Expected result

First Name shows `Stefan`, Last Name shows `Angelov`, and after clicking Continue the user is taken to the Checkout: Overview page.

## Actual result

The text typed in Last Name goes into the First Name field instead. After step 5 First Name shows the last typed letter and Last Name is empty. After clicking Continue the error `Error: Last Name is required` is shown and the user cannot continue. Typing the last name again gives the same result.

## Severity – Critical

The bug blocks the purchase. The user can add products to the cart but cannot get past the checkout form, and there is no workaround.

## Priority – High

Every user affected by this bug cannot buy anything, which means lost sales.

---

## Additional observation: order with an empty cart

With `standard_user` it is possible to place an order without any products: open the empty cart → Checkout → fill in the form → Continue → Finish. The overview shows a total of $0.00 and the page says "Thank you for your order!".

There is no written requirement for this case, so I am not reporting it as a confirmed bug. Based on how online shops normally work, checkout should not be possible with an empty cart. In a real project I would confirm the expected behaviour with the Product Owner.
