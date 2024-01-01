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

    // buttons
    this.saveAddressButton = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.continuePaymentButton = page.getByRole("button", {
      name: "Continue to payment",
    });

    // message
    this.addressSavedMessage = page.getByText("Your saved addresses");
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

    await this.page.pause();
    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();

    await this.page.pause();
  };
}
