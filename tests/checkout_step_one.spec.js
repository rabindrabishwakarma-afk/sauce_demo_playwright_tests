import { test, expect } from '../fixture/index.js';
import { ENV } from '../config/env.js';


import customerInfo from '../test_data/customerInfo.json' assert { type: 'json'   };

test.describe('checkout', ()=> {

    
    test('all fields empty', async({ atCheckoutStepOne }) => {
       
        const { page, checkoutStepOne } = atCheckoutStepOne;
        await checkoutStepOne.enterCheckoutInfo('','','');
        await checkoutStepOne.clickContinueBtn();
        const error = await checkoutStepOne.getErrorMessage();
        await expect(error).toBe('Error: First Name is required');
    });

    test('empty first name', async({ atCheckoutStepOne }) => {
        const { page, checkoutStepOne } = atCheckoutStepOne;
        await checkoutStepOne.enterCheckoutInfo('', customerInfo.lastName, customerInfo.postalCode);
        await checkoutStepOne.clickContinueBtn();
        const error = await checkoutStepOne.getErrorMessage();
        await expect(error).toBe('Error: First Name is required');
    });

    test('empty last name', async({ atCheckoutStepOne }) => {
        const { page, checkoutStepOne } = atCheckoutStepOne;
        await checkoutStepOne.enterCheckoutInfo(customerInfo.firstName, '', customerInfo.postalCode);
        await checkoutStepOne.clickContinueBtn();
        const error = await checkoutStepOne.getErrorMessage();
        await expect(error).toBe('Error: Last Name is required');
    });

    test('empty  postal code', async({ atCheckoutStepOne }) => {
        const { page, checkoutStepOne } = atCheckoutStepOne;
        await checkoutStepOne.enterCheckoutInfo(customerInfo.firstName, customerInfo.lastName, '');
        await checkoutStepOne.clickContinueBtn();
        const error = await checkoutStepOne.getErrorMessage();
        await expect(error).toBe('Error: Postal Code is required');
    });

    test('cancel button functionality', async ({ atCheckoutStepOne }) => {
        const { page, checkoutStepOne } = atCheckoutStepOne;
        await checkoutStepOne.enterCheckoutInfo(customerInfo.firstName, customerInfo.lastName, customerInfo.postalCode);
        await checkoutStepOne.clickCancelBtn();
        await expect (page).toHaveURL(`${ENV.baseURL}/cart.html`);

    });

    test('continue button functionality', async ({ atCheckoutStepOne }) => {
        const { page, checkoutStepOne } = atCheckoutStepOne;
        await checkoutStepOne.enterCheckoutInfo(customerInfo.firstName, customerInfo.lastName, customerInfo.postalCode);
        await checkoutStepOne.clickContinueBtn();
        await expect (page).toHaveURL(`${ENV.baseURL}/checkout-step-two.html`);
        
    });

});
