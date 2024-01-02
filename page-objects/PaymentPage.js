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
    this.discountActivatedMessage = page.locator(
      '[data-qa="discount-active-message"]'
    );
    this.priceBeforeDiscount = page.locator('[data-qa="total-value"]');
    this.priceAfterDiscount = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
    this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]');
    this.creditCardValidUntilInput = page.locator('[data-qa="valid-until"]');
    this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
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

    expect(await this.priceAfterDiscount.isVisible()).toBe(false);

    await this.submitDiscountButton.waitFor();
    await this.submitDiscountButton.click();
    await this.discountActivatedMessage.waitFor();
    await expect(this.discountActivatedMessage).toHaveText(
      "Discount activated!"
    );

    const standardPriceText = await this.priceBeforeDiscount.innerText();
    const discountPriceText = await this.priceAfterDiscount.innerText();

    const standardPrice = parseInt(standardPriceText.replace("$", ""), 10);
    const discountPrice = parseInt(discountPriceText.replace("$", ""), 10);

    expect(discountPrice).toBeLessThan(standardPrice);
  };

  fillPaymentDetails = async (customerDetails) => {
    await this.creditCardOwnerInput.waitFor();
    await this.creditCardOwnerInput.fill(customerDetails.cardOwner);

    await this.creditCardNumberInput.waitFor();
    await this.creditCardNumberInput.fill(customerDetails.cardNumber);

    await this.creditCardValidUntilInput.waitFor();
    await this.creditCardValidUntilInput.fill(customerDetails.cardUntil);

    await this.creditCardCVCInput.waitFor();
    await this.creditCardCVCInput.fill(customerDetails.cardCvc);

    await this.payButton.waitFor();
    await this.payButton.click();

    await this.page.pause();
  };
}
