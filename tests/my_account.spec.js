import * as dotenv from "dotenv";
dotenv.config();
import { test } from "@playwright/test";
import { myAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { userDetails } from "../data/userDetails";

test.only("My Account using cookie injection and mocking network request", async ({
  page,
}) => {
  const loginToken = await getLoginToken(
    userDetails.login,
    userDetails.password
  );
  await page.route("**/api/user**", async (route, request) => {
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ message: "Playwright error from mocking" }),
    });
  });
  const myAccount = new myAccountPage(page);
  await myAccount.visit();
  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = "token=" + loginTokenInsideBrowserCode;
    },
    [loginToken]
  );
  await myAccount.visit();
  await myAccount.waitForPageHeading();
  await myAccount.waitForErrorMessage();
  await page.pause();
});
