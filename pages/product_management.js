export class ProductManagementPage {

    constructor (page) {
        this.page = page;

        this.products = {
            fleeceJacket: page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]'),
            backpack: page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
            boltTshirt: page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
            bikeLight: page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]'),
            onesie: page.locator('[data-test="add-to-cart-sauce-labs-onesie"]'),
            redTshirt: page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'),

        }

        this.removeProducts = {
            fleecejacket: page.locator('[data-test="remove-sauce-labs-fleece-jacket"]'),
            backPack: page.locator('[data-test="remove-sauce-labs-backpack"]'),
            bolttshirt: page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]'),
            bikelight: page.locator('[data-test="remove-sauce-labs-bike-light"]'),
            oneSie: page.locator('[data-test="remove-sauce-labs-onesie"]'),
            redtshirt: page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]'),
        }
        this.cart = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    };
    
    // add products to cart and throw error if product not found

    async addProduct(productName) {
        const product = this.products[productName];

        if (!product) {
            throw new Error(`Product "${productName}" not found.`);
        }

        await product.click();
    };

   async removeProduct(productName) {
        const removeButton = this.removeProducts[productName];

        if (!removeButton) {
            throw new Error(`Remove button for product "${productName}" not found.`);
        }

        await removeButton.click();
    }

    async getCartCount() {
        const count = await this.cartBadge.textContent();
        return Number(count || 0);
    }

    async clickOnCart() {
        await this.cart.click();
    };

    
};