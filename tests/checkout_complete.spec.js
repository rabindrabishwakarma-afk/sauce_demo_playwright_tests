import { test, expect } from '../fixture/index.js';
import { ENV } from '../config/env.js';

test('checkout complete page', async({ atCheckoutComplete }) => {
    const { page, checkoutComplete } = atCheckoutComplete;
   
    // URL assertion
    await expect(page).toHaveURL(`${ENV.baseURL}/checkout-complete.html`);

    // verify the thank you message display
    const thankyouMessage = await checkoutComplete.displayThankYouMessage();
    await expect (thankyouMessage).toBe('Thank you for your order!');
    await expect (checkoutComplete.thankYouMessage).toBeVisible();

    // click on back home button and navigate back to landing page
    await expect (checkoutComplete.backHomeBtn).toBeVisible();
    await expect (checkoutComplete.backHomeBtn).toBeEnabled();

    await checkoutComplete.clickBackHomeBtn();

    await expect(page).toHaveURL(`${ENV.baseURL}/inventory.html`);

});