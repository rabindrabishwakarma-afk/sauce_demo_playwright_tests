export class CheckoutStepTwoPage {

    constructor(page) {
        this.page = page;

        this.title = page.locator('[data-test="title"]');
        this.summaryInfo = {
            paymentInfo: page.locator('[data-test="payment-info-label"]'),
            shippingInfo: page.locator('[data-test="shipping-info-label"]'),
            priceInfo: page.locator('[data-test="total-info-label"]'),
        }
        this.productPriceText = page.locator('[data-test="inventory-item-price"]');
        this.subTotalText = page.locator('[data-test="subtotal-label"]');
        this.taxText = page.locator('[data-test="tax-label"]');
        this.totalPriceText = page.locator('[data-test="total-label"]');
        this.finishBtn = page.getByRole('button', {name:'Finish'});
        this.cancelBtn = page.getByRole('button', {name:'Cancel'});
    

    };

    //get checkout info text based on info type
    getCheckoutInfo(infoType) {
        return this.summaryInfo[infoType]
    };

    // helper method to extract numeric value from text
    async getNumericValueFromText(locator) {
        const text = await locator.innerText();
        return parseFloat(text.replace(/[^0-9.]/g, '').trim());
    };

    // get product price based on index
    async getProductPrice(index) {
       return this.getNumericValueFromText(this.productPriceText.nth(index));
    };

    // get subtotal amount
    async getSubTotal () {
        return this.getNumericValueFromText(this.subTotalText);
    };

    // get tax amount
    async getTaxAmount() {
        return this.getNumericValueFromText(this.taxText);
    };

    // get total price
    async getTotal () {
        return this.getNumericValueFromText(this.totalPriceText);
    };

    // click cancel button
    async clickCancelBtn() {
        await this.cancelBtn.click();
    };

    // click finish button
    async clickFinishBtn() {
        await this.finishBtn.click();
    };


};