export class CheckoutStepOnePage {

    constructor(page) {
        this.page = page;

        this.title = page.locator('[data-test="title"]');
        this.fname = page.locator('[data-test="firstName"]');
        this.lname = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.cancelBtn = page.getByRole('button', {name: 'Cancel'});
        this.contBtn = page.getByRole('button', {name: 'Continue'});
        this.errorMessage = page.locator('[data-test="error"]');

    };

    async enterCheckoutInfo(firstname, lastname, postalcode) {
        await this.fname.clear();
        await this.fname.fill(firstname);
        await this.lname.clear();
        await this.lname.fill(lastname);
        await this.postalCode.clear();
        await this.postalCode.fill(postalcode);
    };

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    };

    async clickCancelBtn() {
        await this.cancelBtn.click();
    };

    async clickContinueBtn() {
        await this.contBtn.click();
    };
};