import { test, expect } from '../fixture/index.js';
import { ENV } from '../config/env.js';

test('add four different product to cart', async ({ loggedIn }) => {
   
    const { page, productBrowse, productAdd, cart } = loggedIn;

    await productBrowse.sortBy('hilo');

    await productAdd.addProduct('fleeceJacket');
    await expect (productAdd.cartBadge).toHaveText('1');

    await productAdd.addProduct('backpack');
    await expect (productAdd.cartBadge).toHaveText('2');

    await productAdd.addProduct('boltTshirt');
    await expect (productAdd.cartBadge).toHaveText('3');

    await productAdd.addProduct('bikeLight');
    await expect (productAdd.cartBadge).toHaveText('4');

    await productAdd.addProduct('iPhone');


});
