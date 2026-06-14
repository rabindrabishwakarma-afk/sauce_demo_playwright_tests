import { test, expect } from '../fixture/index.js';
// import { ENV } from '../config/env.js';

test.describe.configure({ mode: 'parallel' });

test.describe('checkout step two', () => {

    test('verify checkout step two page navigation', async ({ atCheckoutStepTwo }) => {
        const { page, checkoutStepTwo } = atCheckoutStepTwo;
        await expect (page).toHaveURL("/checkout-step-two.html");
        await expect (checkoutStepTwo.title).toHaveText('Checkout: Overview');
    });

    test('verify final products in cart', async({ atCheckoutStepTwo }) => {
        const { page, cartPage, checkoutStepTwo } = atCheckoutStepTwo;

        await cartPage.isProductInCart('fleeceJacket');
        await cartPage.isProductInCart('boltTshirt'); 

    });

    test('verify checkout info on checkout step two page', async({ atCheckoutStepTwo }) => {
        const { page, checkoutStepTwo } = atCheckoutStepTwo;
    
        await expect(checkoutStepTwo.getCheckoutInfo('paymentInfo')).toBeVisible();
        await expect(checkoutStepTwo.getCheckoutInfo('shippingInfo')).toBeVisible();
        await expect(checkoutStepTwo.getCheckoutInfo('priceInfo')).toBeVisible();
    });

    test('verify the total and subtotal and continue', async({ atCheckoutStepTwo }) => {
        const { page, checkoutStepTwo } = atCheckoutStepTwo;
        
        const fleeceJacketPrice = await checkoutStepTwo.getProductPrice(0);
        const boltTshirtPrice = await checkoutStepTwo.getProductPrice(1);

        const subTotalAmount= await checkoutStepTwo.getSubTotal();
        const taxAmount = await checkoutStepTwo.getTaxAmount();
        const totalPrice = await checkoutStepTwo.getTotal();

        // subtotal validation
        const expectedSubTotal = fleeceJacketPrice + boltTshirtPrice;
        console.log(`Sub Total is ${subTotalAmount}`);
        console.log(`Expected sub Total is ${expectedSubTotal}`);

        await expect (subTotalAmount).toBe(expectedSubTotal);

        // total validation
        const expectedTotal = expectedSubTotal + taxAmount;
        await expect (totalPrice).toBe(expectedTotal);
    });

    test('verify cancel button functionality', async ({ atCheckoutStepTwo }) => {
        const { page, checkoutStepTwo } = atCheckoutStepTwo;
        await checkoutStepTwo.clickCancelBtn();
        await expect (page).toHaveURL("/inventory.html");
    });

    test('verify finish button functionality', async ({ atCheckoutStepTwo }) => {
        const { page, checkoutStepTwo } = atCheckoutStepTwo;
        await checkoutStepTwo.clickFinishBtn();
        await expect (page).toHaveURL("/checkout-complete.html");
    });
    

});