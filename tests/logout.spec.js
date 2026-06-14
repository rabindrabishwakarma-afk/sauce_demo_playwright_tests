import { test, expect } from '../fixture/index.js';
// import { ENV } from '../config/env.js';

test('verify logout functionality', async ({ loggedIn })=> {
    const { page, productBrowse } = loggedIn;

    await productBrowse.burgerMenuBtn.click();

    await expect (productBrowse.logOutBtn).toBeVisible();
    await expect (productBrowse.logOutBtn).toBeEnabled();

    await productBrowse.logOutBtn.click();
    await expect (page).toHaveURL("/");
});