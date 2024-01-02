import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );
  }

  activeDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();

    // Option 1 for laggy input .fill()
    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);

    // Option 2 for laggy input: slow typing
    // await this.discountInput.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discountInput.inputValue()).toBe(code);

    await this.submitDiscountButton.waitFor();
    await this.submitDiscountButton.click();
  };
}
