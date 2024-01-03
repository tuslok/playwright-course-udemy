import { expect, test } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;

    // inputs
    this.firstName = page.locator('[data-qa="delivery-first-name"]');
    this.lastName = page.locator('[data-qa="delivery-last-name"]');
    this.street = page.locator('[data-qa="delivery-address-street"]');
    this.postalCode = page.locator('[data-qa="delivery-postcode"]');
    this.city = page.locator('[data-qa="delivery-city"]');
    this.country = page.locator('[data-qa="country-dropdown"]');

    // saved address
    this.savedAddressContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.savedAddressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]'
    );
    this.savedAddressLastName = page.locator(
      '[data-qa="saved-address-lastName"]'
    );
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostalCode = page.locator(
      '[data-qa="saved-address-postcode"]'
    );
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = page.locator(
      '[data-qa="saved-address-country"]'
    );

    // buttons
    this.saveAddressButton = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.continuePaymentButton = page.locator(
      '[data-qa="continue-to-payment-button"]'
    );
  }

  fillDeliveryDetails = async (userAddress) => {
    await this.firstName.waitFor();
    await this.firstName.fill(userAddress.firstName);

    await this.lastName.waitFor();
    await this.lastName.fill(userAddress.lastName);

    await this.street.waitFor();
    await this.street.fill(userAddress.street);

    await this.postalCode.waitFor();
    await this.postalCode.fill(userAddress.postalCode);

    await this.city.waitFor();
    await this.city.fill(userAddress.city);

    await this.country.waitFor();
    await this.country.selectOption(userAddress.country);
  };

  saveDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressContainer.count();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();
    await expect(this.savedAddressContainer).toHaveCount(
      addressCountBeforeSaving + 1
    );

    await this.savedAddressFirstName.first().waitFor();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(
      await this.firstName.inputValue()
    );

    await this.savedAddressLastName.first().waitFor();
    expect(await this.savedAddressLastName.first().innerText()).toBe(
      await this.lastName.inputValue()
    );

    await this.savedAddressStreet.first().waitFor();
    expect(await this.savedAddressStreet.first().innerText()).toBe(
      await this.street.inputValue()
    );

    await this.savedAddressPostalCode.first().waitFor();
    expect(await this.savedAddressPostalCode.first().innerText()).toBe(
      await this.postalCode.inputValue()
    );

    await this.savedAddressCity.first().waitFor();
    expect(await this.savedAddressCity.first().innerText()).toBe(
      await this.city.inputValue()
    );

    await this.savedAddressCountry.first().waitFor();
    expect(await this.savedAddressCountry.first().innerText()).toBe(
      await this.country.inputValue()
    );
  };

  continueToPayment = async () => {
    this.continuePaymentButton.waitFor();
    this.continuePaymentButton.click();
    this.page.waitForURL(/\/payment/, { timeout: 3000 });
  };
}
