import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginpage.js';  
import { ProductBrowsePage } from '../pages/productbrowse.js';
import { ProductAddPage } from '../pages/product_add.js';
import { CartPage } from '../pages/cartpage.js';
import { CheckoutStepOnePage } from '../pages/checkout_step_one.js';
import { CheckoutStepTwoPage } from '../pages/checkout_step_two.js';
import { CheckoutCompletePage } from '../pages/checkout_complete.js';

import { ENV } from '../config/env.js';
import customerInfo from '../test_data/customerInfo.json' assert { type: 'json' };

const test = base.extend({

    // fixture 1: all page objects, page visited and login
    loggedIn: async ({ page }, use) => {
        const Login = new LoginPage(page);
        const productBrowse = new ProductBrowsePage(page);
        const productAdd = new ProductAddPage(page);
        

        // await Login.visitPage();
        // await Login.login(ENV.username, ENV.password);

        // use the storage state from global setup to bypass login
        await page.goto(`${ENV.baseURL}/inventory.html`);

        // confirms session is valid before any test body runs
        await expect(page).toHaveURL(`${ENV.baseURL}/inventory.html`);

        await use({ page, productBrowse, productAdd });
    },


    // fixture 2: logged in and added products to the cart
    productAdded: async ({ loggedIn }, use) => {
        const { page, productBrowse, productAdd } = loggedIn;
        
        await productBrowse.sortBy('Price (high to low)');
        await productAdd.addProduct('fleeceJacket');
        await productAdd.addProduct('backpack');
        await productAdd.addProduct('boltTshirt');
        await productAdd.addProduct('bikeLight');
        await productAdd.clickOnCart();

        await use({ page, productAdd });
    },


    // fixture 3: logged in, added products to the cart
    atCartPage: async ({ productAdded }, use) => {
        const { page, productAdd } = productAdded;
        const cartPage = new CartPage(page);
        await expect(page).toHaveURL(`${ENV.baseURL}/cart.html`);


        await use({ page, productAdd, cartPage });
    },

    // fixture 4: entered checkout info and navigated to checkout step one
    atCheckoutStepOne: async ({ atCartPage }, use) => {
        const { page, cartPage } = atCartPage;
        const checkoutStepOne = new CheckoutStepOnePage(page);

        await cartPage.removeBackpack();
        await cartPage.removeBikelight();
        await cartPage.checkout();
       
        await expect(page).toHaveURL(`${ENV.baseURL}/checkout-step-one.html`);
    
        await use({ page, checkoutStepOne });
           
    },


    // fixture 5: entered checkout info and navigated to checkout step two
    atCheckoutStepTwo: async ({ atCheckoutStepOne }, use) => {
        const { page, checkoutStepOne } = atCheckoutStepOne;
        const checkoutStepTwo = new CheckoutStepTwoPage(page);

        await checkoutStepOne.enterCheckoutInfo(
            customerInfo.firstName,
            customerInfo.lastName,
            customerInfo.postalCode
        );
        await checkoutStepOne.clickContinueBtn();
        await expect(page).toHaveURL(`${ENV.baseURL}/checkout-step-two.html`);

        await use({ page, checkoutStepTwo });
    },

    // fixture 6: checkout complete
    atCheckoutComplete: async ({ atCheckoutStepTwo }, use) => {
        const { page, checkoutStepTwo } = atCheckoutStepTwo;
        const checkoutComplete = new CheckoutCompletePage(page);

        await checkoutStepTwo.clickFinishBtn();
        await expect(page).toHaveURL(`${ENV.baseURL}/checkout-complete.html`);

        await use({ page, checkoutComplete });
    },

});

export { test, expect };

