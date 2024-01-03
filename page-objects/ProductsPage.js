import { test } from "@playwright/test";
import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDektopViewport } from "../utils/isDektopViewport";

export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.addButton = page.locator('[data-qa="product-button"]');
    this.sortDropDown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }
  visit = async () => {
    await this.page.goto("/");
  };

  addProductToBasket = async (index) => {
    const specificAddButton = this.addButton.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");
    const navigation = new Navigation(this.page);

    let basketCounterBeforeAdding = 0;
    if (isDektopViewport(this.page)) {
      basketCounterBeforeAdding = await navigation.getBasketCount();
    }
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");

    if (isDektopViewport(this.page)) {
      const basketCounterAfterAdding = await navigation.getBasketCount();
      expect(basketCounterAfterAdding).toBeGreaterThan(
        basketCounterBeforeAdding
      );
    }
  };

  sortByCheapest = async () => {
    await this.sortDropDown.waitFor();
    await this.productTitle.first().waitFor();
    const productTitleBeforeSorting = await this.productTitle.allInnerTexts();
    await this.sortDropDown.selectOption("price-asc");
    const productTitleAfterSorting = await this.productTitle.allInnerTexts();
    expect(productTitleBeforeSorting).not.toEqual(productTitleAfterSorting);
  };
}
