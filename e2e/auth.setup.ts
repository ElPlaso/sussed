import { test as setup } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  // Perform authentication steps.

  await page.goto("http://localhost:3000/");
  await page.getByLabel("Password").fill("password");
  await page.getByTestId("submitButton").click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("http://localhost:3000/");

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
