
import { expect } from '@playwright/test';
export class CartPage {

    constructor (page) {
        this.page = page;

        this.title = page.locator('[data-test="title"]');
        this.removeBackPack = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.removeBikeLight = page.locator('[data-test="remove-sauce-labs-bike-light"]');
        this.sauceLabsFleeceJacket = page.locator('[data-test="item-5-title-link"]');
        this.sauceLabsBackpack = page.locator('[data-test="item-4-title-link"]');
        this.sauceLabsBoltTshirt = page.locator('[data-test="item-1-title-link"]');
        this.sauceLabsBikeLight = page.locator('[data-test="item-0-title-link"]');
        this.checkoutBtn = page.getByRole('button', {name: 'Checkout'});
        this.continueShoppingBtn = page.getByRole('button', {name: 'Continue Shopping'});
    
    };

   

    async removeBackpack() {
        await this.removeBackPack.click();
    };

    async removeBikelight() {
        await this.removeBikeLight.click();
    };

    async continueShopping() {
        await this.continueShoppingBtn.click();
    };
    async checkout() {
        await this.checkoutBtn.click();
    };

}