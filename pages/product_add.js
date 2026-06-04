export class ProductAddPage {

    constructor (page) {
        this.page = page;

        this.products = {
            fleeceJacket: page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]'),
            backpack: page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
            boltTshirt: page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
            bikeLight: page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]'),

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

    async clickOnCart() {
        await this.cart.click();
    };

    
};