import { expect } from "@playwright/test";

export class Checkout {
  constructor(page) {
    this.page = page;

    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckouButton = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoveal = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allPriceTexts = await this.basketItemPrice.allInnerTexts();
    //['599$', '320$', '672$' ]
    const justNumbers = allPriceTexts.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
      console.warn({ element });
    });
    const smallestPrice = Math.min(...justNumbers);
    const smallestPriceIndex = justNumbers.indexOf(smallestPrice);
    const specificRemoveButton = await this.basketItemRemoveButton.nth(
      smallestPriceIndex
    );
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoveal - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckouButton.waitFor();
    await this.continueToCheckouButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
}
