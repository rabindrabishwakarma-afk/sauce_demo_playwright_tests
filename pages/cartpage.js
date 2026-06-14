
import { expect } from '@playwright/test';
export class CartPage {

    constructor (page) {
        this.page = page;

        this.title = page.locator('[data-test="title"]');

        this.productsInCart = {
            fleeceJacket: page.locator('[data-test="item-5-title-link"]'),
            backpack: page.locator('[data-test="item-4-title-link"]'),
            boltTshirt: page.locator('[data-test="item-1-title-link"]'),
            bikeLight: page.locator('[data-test="item-0-title-link"]'),
        }
       
        this.checkoutBtn = page.getByRole('button', {name: 'Checkout'});
        this.continueShoppingBtn = page.getByRole('button', {name: 'Continue Shopping'});
    
    };

    async isProductInCart(productName) {
        return await this.productsInCart[productName].isVisible();
    }


    async continueShopping() {
        await this.continueShoppingBtn.click();
    };
    
    async checkout() {
        await this.checkoutBtn.click();
    };

}