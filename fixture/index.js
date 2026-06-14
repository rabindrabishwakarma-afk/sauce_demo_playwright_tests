import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginpage.js';  
import { ProductBrowsePage } from '../pages/productbrowse.js';
import { ProductManagementPage } from '../pages/product_management.js';
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
        const productManagement = new ProductManagementPage(page);
        

        // await Login.visitPage();
        // await Login.login(ENV.username, ENV.password);

        // use the storage state from global setup to bypass login
        await page.goto(`${ENV.baseURL}/inventory.html`);

        // confirms session is valid before any test body runs
        await expect(page).toHaveURL("/inventory.html");

        await use({ page, productBrowse, productManagement });
    },


    // fixture 2: logged in and added products to the cart
    productAdded: async ({ loggedIn }, use) => {
        const { page, productBrowse, productManagement } = loggedIn;
        
        await productBrowse.sortBy('Price (high to low)');
        await productManagement.addProduct('fleeceJacket');
        await productManagement.addProduct('backpack');
        await productManagement.addProduct('boltTshirt');
        await productManagement.addProduct('bikeLight');
        await productManagement.clickOnCart();

        await use({ page, productManagement });
    },


    // fixture 3: logged in, added products to the cart
    atCartPage: async ({ productAdded }, use) => {
        const { page, productManagement } = productAdded;
        const cartPage = new CartPage(page);
        await expect(page).toHaveURL("/cart.html");


        await use({ page, productManagement, cartPage });
    },

    // fixture 4: entered checkout info and navigated to checkout step one
    atCheckoutStepOne: async ({ atCartPage }, use) => {
        const { page, productManagement, cartPage } = atCartPage;
        const checkoutStepOne = new CheckoutStepOnePage(page);

        await productManagement.removeProduct('backPack');
        await productManagement.removeProduct('bikelight');

        await cartPage.checkout();
       
        await expect(page).toHaveURL("/checkout-step-one.html");
    
        await use({ page, checkoutStepOne });
           
    },


    // fixture 5: entered checkout info and navigated to checkout step two
    atCheckoutStepTwo: async ({ atCheckoutStepOne }, use) => {
        const { page, checkoutStepOne } = atCheckoutStepOne;
        const cartPage = new CartPage(page);
        const checkoutStepTwo = new CheckoutStepTwoPage(page);

        await checkoutStepOne.enterCheckoutInfo(
            customerInfo.firstName,
            customerInfo.lastName,
            customerInfo.postalCode
        );
        await checkoutStepOne.clickContinueBtn();
        await expect(page).toHaveURL("/checkout-step-two.html");

        await use({ page, cartPage, checkoutStepTwo });
    },

    // fixture 6: checkout complete
    atCheckoutComplete: async ({ atCheckoutStepTwo }, use) => {
        const { page,cartPage, checkoutStepTwo } = atCheckoutStepTwo;
        const checkoutComplete = new CheckoutCompletePage(page);

        await checkoutStepTwo.clickFinishBtn();
        await expect(page).toHaveURL("/checkout-complete.html");

        await use({ page, checkoutComplete });
    },

});

export { test, expect };

