import { expect } from '@playwright/test';
import { ENV } from '../config/env.js';

export class ProductBrowsePage {
    
    constructor(page) {
        this.page = page;

        this.backPack = page.locator('[data-test="item-4-title-link"]');
        this.backToProductBtn = page.getByRole('button', {name: 'Back to products'});
        this.backPackImg = page.locator('[data-test="item-sauce-labs-backpack-img"]');
        this.productSort = page.getByRole('combobox');
        this.allPrices = page.locator('[data-test="inventory-item-price"]');

        this.burgerMenuBtn = page.getByRole('button', {name: 'Open Menu'});
        this.logOutBtn = page.getByRole('link', {name: 'Logout'});

    };

    async productDetail() {
        await this.backPack.click();
    };


    async backToProductPage() {
        await this.backToProductBtn.click();
    };


    async sortBy(value) {
        await this.productSort.selectOption(value);
    };

    
    async getAllPrices() {
        const priceTexts = await this.allPrices.allTextContents();
        return priceTexts.map(p => parseFloat(p.replace('$', '')));
    };

};