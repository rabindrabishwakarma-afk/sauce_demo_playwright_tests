export class CheckoutStepTwoPage {

    constructor(page) {
        this.page = page;

        this.title = page.locator('[data-test="title"]');
        this.productPriceText = page.locator('[data-test="inventory-item-price"]');
        this.subTotalText = page.locator('[data-test="subtotal-label"]');
        this.taxText = page.locator('[data-test="tax-label"]');
        this.totalPriceText = page.locator('[data-test="total-label"]');
        this.finishBtn = page.getByRole('button', {name:'Finish'});
        this.cancelBtn = page.getByRole('button', {name:'Cancel'});
    

    };

    async getProductPrice(index) {
        const productPrice = await this.productPriceText.nth(index).innerText(); 
        return parseFloat(productPrice.replace(/[^0-9.]/g, '').trim());
    };

    async getSubTotal () {
        const subTotal = await this.subTotalText.innerText();
        return parseFloat(subTotal.replace(/[^0-9.]/g, '').trim());
    };

    async getTaxAmount() {
        const taxAmount = await this.taxText.innerText();
        return parseFloat(taxAmount.replace(/[^0-9.]/g,'').trim());
    };

    async getTotal () {
        const total = await this.totalPriceText.innerText();
        return parseFloat(total.replace(/[^0-9.]/g, '').trim());
    };

    async clickCancelBtn() {
        await this.cancelBtn.click();
    };

    async clickFinishBtn() {
        await this.finishBtn.click();
    };


};