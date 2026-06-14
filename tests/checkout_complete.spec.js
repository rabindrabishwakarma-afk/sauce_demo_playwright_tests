import { test, expect } from '../fixture/index.js';
// import { ENV } from '../config/env.js';

test.describe('checkout complete page', () => {

    test('verify checkout complete page navigation', async ({ atCheckoutComplete }) => {
        const { page, checkoutComplete } = atCheckoutComplete;

        // URL assertion
        await expect(page).toHaveURL("/checkout-complete.html");
        await expect (checkoutComplete.title).toHaveText('Checkout: Complete!');
    });

    test('verify thank you message display', async({ atCheckoutComplete }) => {
        const { page, checkoutComplete } = atCheckoutComplete;
        const thankyouMessage = await checkoutComplete.displayThankYouMessage();
        await expect (thankyouMessage).toBe('Thank you for your order!');
        await expect (checkoutComplete.thankYouMessage).toBeVisible();
        await expect (checkoutComplete.completeText).toBeVisible();
        await expect (checkoutComplete.completeText).toHaveText(
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    test('verify back home button functionality', async({ atCheckoutComplete }) => {
        const { page, checkoutComplete } = atCheckoutComplete;

        await expect (checkoutComplete.backHomeBtn).toBeVisible();
        await expect (checkoutComplete.backHomeBtn).toBeEnabled();

        await checkoutComplete.clickBackHomeBtn();

        await expect(page).toHaveURL("/inventory.html");
    });

});