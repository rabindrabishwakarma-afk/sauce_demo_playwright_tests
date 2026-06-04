import { test, expect } from '../fixture/index.js';
import { ENV } from '../config/env.js';

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


    // click on finish button and navigate to complete page
    await checkoutStepTwo.clickFinishBtn();
    await expect (page).toHaveURL(`${ENV.baseURL}/checkout-complete.html`);
    

});