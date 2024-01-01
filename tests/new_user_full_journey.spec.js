import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage.js";
import { Navigation } from "../page-objects/Navigation.js";
import { Checkout } from "../page-objects/Checkout.js";
import { LoginPage } from "../page-objects/LoginPage.js";
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js";
import { v4 as uuidv4 } from "uuid";
import { deliveryDetails as userAddress } from "../data/deliveryDetails.js";

test.only("New user full endt-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const navigation = new Navigation(page);
  await productsPage.visit();
  await productsPage.sortByCheapest();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.moveToSignUp();

  const registerPage = new RegisterPage(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await registerPage.signUpAsNewUser(email, password);

  const deliveryDetails = new DeliveryDetails(page);
  await deliveryDetails.fillDeliveryDetails(userAddress);
  await deliveryDetails.saveDetails();
});
