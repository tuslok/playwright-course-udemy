import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { Checkout } from "../page-objects/Checkout.js";

test.only("New user full endt-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const navigation = new Navigation(page);
  await productsPage.visit();
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  await productsPage.addProductToBasket(4);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();

  //await page.pause();
});
