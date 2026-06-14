import { test, expect } from '../fixture/index.js';
import { ENV } from '../config/env.js';
import customerInfo from '../test_data/customerInfo.json' assert { type: 'json' };

test('full end to end purchase flow', async ({ loggedIn }) => {

    const { page, productBrowse, productAdd } = loggedIn;

    // sort products
    await productBrowse.sortBy('Price (high to low)');

    // add products
    await productAdd.addProduct('fleeceJacket');
    await productAdd.addProduct('backpack');
    await productAdd.addProduct('boltTshirt');
    await productAdd.addProduct('bikeLight');

    // cart badge validation
    await expect(productAdd.cartBadge).toHaveText('4');

    // open cart
    await productAdd.clickOnCart();

    // cart page
    await expect(page).toHaveURL("/cart.html");

    // initialize cart page
    const { CartPage } = await import('../pages/cartpage.js');
    const cartPage = new CartPage(page);

    // remove products
    await cartPage.removeBackpack();
    await cartPage.removeBikelight();

    // checkout
    await cartPage.checkout();

    // checkout step one
    await expect(page)
        .toHaveURL("/checkout-step-one.html");

    const { CheckoutStepOnePage } =
        await import('../pages/checkout_step_one.js');

    const checkoutStepOne =
        new CheckoutStepOnePage(page);

    await checkoutStepOne.enterCheckoutInfo(
        customerInfo.firstName,
        customerInfo.lastName,
        customerInfo.postalCode
    );

    await checkoutStepOne.clickContinueBtn();

    // checkout step two
    await expect(page)
        .toHaveURL("/checkout-step-two.html");

    const { CheckoutStepTwoPage } =
        await import('../pages/checkout_step_two.js');

    const checkoutStepTwo =
        new CheckoutStepTwoPage(page);

    // finish order
    await checkoutStepTwo.clickFinishBtn();

    // complete page
    await expect(page)
        .toHaveURL("/checkout-complete.html");

    const { CheckoutCompletePage } =
        await import('../pages/checkout_complete.js');

    const checkoutComplete =
        new CheckoutCompletePage(page);

    // thank you validation
    await expect(checkoutComplete.thankYouMessage)
        .toBeVisible();

    // back home
    await checkoutComplete.clickBackHomeBtn();

    // logout
    await productBrowse.burgerMenuBtn.click();

    await expect(productBrowse.logOutBtn)
        .toBeVisible();

    await productBrowse.logOutBtn.click();

    await expect(page)
        .toHaveURL("/");
});