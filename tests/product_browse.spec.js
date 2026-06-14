import { test, expect } from '../fixture/index.js';
// import { ENV } from '../config/env.js';

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

    test('default sort order is Name (A to Z)', async ({ loggedIn }) => {

        const { page, productBrowse } = loggedIn;
        
        await expect (productBrowse.productSort).toHaveValue('az');

        const names = await productBrowse.getAllNames();
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

        await expect (names).toEqual(sortedNames);

        const expectedFirstProduct = sortedNames[0];
        await expect (names[0]).toBe(expectedFirstProduct);
    });

    test('sort products by name (Z to A)', async ({ loggedIn }) => {

        const { page, productBrowse } = loggedIn;
        
        await productBrowse.sortBy('Name (Z to A)');

        const names = await productBrowse.getAllNames();
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

        await expect (names).toEqual(sortedNames);

        const expectedFirstProduct = sortedNames[0];
        await expect (names[0]).toBe(expectedFirstProduct);
    });


    test('sort products by price (low to high)', async ({ loggedIn }) => {

        const { page, productBrowse } = loggedIn;
        
        await productBrowse.sortBy('Price (low to high)');

        const prices = await productBrowse.getAllPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);

        await expect (prices).toEqual(sortedPrices);

        const minPrice = Math.min(...prices);
        await expect (prices[0]).toBe(minPrice);
    });

    test('sort products by price (high to low)', async ({ loggedIn }) => {

        const { page, productBrowse } = loggedIn;
        
        await productBrowse.sortBy('Price (high to low)');

        const prices = await productBrowse.getAllPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);

        await expect (prices).toEqual(sortedPrices);

        const maxPrice = Math.max(...prices);
        await expect (prices[0]).toBe(maxPrice);
    });
    
});