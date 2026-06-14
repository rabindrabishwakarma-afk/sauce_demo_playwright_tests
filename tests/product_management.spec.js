import { test, expect } from '../fixture/index.js';

test.describe('product management', () => {
   
    test('add products to cart, remove and verify the cart badge count', async ({ loggedIn }) => {
        const { page, productBrowse, productManagement, cart } = loggedIn;

        await productManagement.addProduct('fleeceJacket');
        await expect (productManagement.cartBadge).toHaveText('1');

        await productManagement.addProduct('backpack');
        await expect (productManagement.cartBadge).toHaveText('2');

        await productManagement.addProduct('boltTshirt');
        await expect (productManagement.cartBadge).toHaveText('3');

        await productManagement.addProduct('bikeLight');
        await expect (productManagement.cartBadge).toHaveText('4');

        await productManagement.addProduct('onesie');
        await expect (productManagement.cartBadge).toHaveText('5');

        await productManagement.addProduct('redTshirt');
        await expect (productManagement.cartBadge).toHaveText('6');

        await productManagement.removeProduct('redtshirt');
        await expect (productManagement.cartBadge).toHaveText('5');   
        
        await productManagement.removeProduct('oneSie');
        await expect (productManagement.cartBadge).toHaveText('4');
    });

    test('add non-existing product', async ({ loggedIn }) => {
        const { page, productBrowse, productManagement, cart } = loggedIn;
        await productManagement.addProduct('iPhone');
        
    });

    test('remove non-existing product(negative test)', async ({ loggedIn }) => {
        const { page, productBrowse, productManagement, cart } = loggedIn;
        await productManagement.removeProduct('iPhone');
        await productManagement.removeProduct('macbook');
        
    });

});
