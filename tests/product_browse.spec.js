import { test, expect } from '../fixture/index.js';
import { ENV } from '../config/env.js';

test.describe('product browse', () =>{

    test('product browse details page', async ({ loggedIn }) => {

        const { page, productBrowse } = loggedIn;

        await productBrowse.productDetail();
        await expect(page).toHaveURL(`${ENV.baseURL}/inventory-item.html?id=4`);
    
        await expect (productBrowse.backToProductBtn).toBeVisible();
        await expect (productBrowse.backToProductBtn).toBeEnabled();
        await expect (productBrowse.backPackImg).toBeVisible();

        await productBrowse.backToProductPage();

        await expect(page).toHaveURL(`${ENV.baseURL}/inventory.html`);

    });

    test('sort products', async ({ loggedIn }) => {

        const { page, productBrowse } = loggedIn;
        
        await productBrowse.sortBy('Price (high to low)');

        const prices = await productBrowse.getAllPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);

        await expect (prices).toEqual(sortedPrices);

        const maxPrice = Math.max(...prices);
        await expect (prices[0]).toBe(maxPrice);
    });
    
});