
import { test, expect } from '../fixture/index.js';
// import { ENV } from '../config/env.js';

test.describe.configure({ mode: 'parallel' });

test.describe('cart page tests', () => {

    test('verify cart page navigation', async ({ atCartPage }) => {
        const { page, cartPage } = atCartPage;
        await expect (page).toHaveURL("/cart.html");
        await expect (cartPage.title).toHaveText('Your Cart');
    });

    test('verify products in cart', async ({ atCartPage }) => {
        const { page, cartPage } = atCartPage; 
        await cartPage.isProductInCart('fleeceJacket');
        await cartPage.isProductInCart('backpack');
        await cartPage.isProductInCart('boltTshirt');
        await cartPage.isProductInCart('bikeLight'); 
    });

    test('verify product remove', async ({atCartPage}) => {
        const { page, productManagement, cartPage } = atCartPage;

        // remove two products
        await productManagement.removeProduct('backPack');
        await productManagement.removeProduct('bikelight');

        // verify the product deletion
        await expect (cartPage.productsInCart.backpack).toHaveCount(0);
        await expect (cartPage.productsInCart.bikeLight).toHaveCount(0);

        // verify cart has two product
        await cartPage.isProductInCart('fleeceJacket');
        await cartPage.isProductInCart('boltTshirt');

        await expect (productManagement.cartBadge).toHaveText('2');

    });

    test('verify remove non-existing product(negative test)', async ({ atCartPage }) => {
        const { page,productManagement, cartPage } = atCartPage;

        await productManagement.removeProduct('iPhone');
        await productManagement.removeProduct('laptop');
    });

        
    test('verify continue shopping button functionality', async ({ atCartPage }) => {
        const { page, cartPage } = atCartPage;

        await expect (cartPage.continueShoppingBtn).toBeVisible();
        await expect (cartPage.continueShoppingBtn).toBeEnabled();
        await cartPage.continueShopping();
        await expect (page).toHaveURL("/inventory.html");
    });

    test('verify checkout button functionality', async ({ atCartPage }) => {
        const { page, cartPage } = atCartPage;

        await cartPage.checkout();
        await expect (page).toHaveURL("/checkout-step-one.html");
    });
    

});
