import { test } from "@playwright/test";
import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addButton = this.page.locator('[data-qa="product-button"]');
  }
  visit = async () => {
    await this.page.goto("/");
  };

  addProductToBasket = async (index) => {
    const specificAddButton = this.addButton.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");

    const navigation = new Navigation(this.page);
    const basketCounterBeforeAdding = await navigation.getBasketCount();
    await specificAddButton.click();

    const basketCounterAfterAdding = await navigation.getBasketCount();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding);
  };
}
