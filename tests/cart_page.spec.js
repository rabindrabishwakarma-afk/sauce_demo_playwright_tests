
import { test, expect } from '../fixture/index.js';
import { ENV } from '../config/env.js';

test('cart page verification and product remove', async ({atCartPage}) => {
    const { page, productAdd, cartPage } = atCartPage;

    // verify cart page navigation and remove two product and verify the action
    await expect (cartPage.title).toHaveText('Your Cart');

    // remove two products
    await cartPage.removeBackpack();
    await cartPage.removeBikelight();

    // verify the product deletion
    await expect (cartPage.sauceLabsBackpack).toHaveCount(0);
    await expect (cartPage.sauceLabsBikeLight).toHaveCount(0);

    // verify cart has two product
    await expect (cartPage.sauceLabsFleeceJacket).toHaveCount(1);
    await expect (cartPage.sauceLabsBoltTshirt).toHaveCount(1);

    await expect (productAdd.cartBadge).toHaveText('2');

    // verify 'Continue Shopping' button functionality
    await expect (cartPage.continueShoppingBtn).toBeVisible();
    await expect (cartPage.continueShoppingBtn).toBeEnabled();

    await cartPage.continueShopping();
    await expect (page).toHaveURL(`${ENV.baseURL}/inventory.html`);

    await productAdd.clickOnCart();

    await cartPage.checkout();
    await expect (page).toHaveURL(`${ENV.baseURL}/checkout-step-one.html`);
    

});
