export class CheckoutCompletePage {

    constructor(page) {
        this.page = page;

        this.title = page.locator('[data-test="title"]');
        this.thankYouMessage = page.locator('[data-test="complete-header"]');
        this.backHomeBtn = page.getByRole('button', { name:'Back Home' })
    };

    async clickBackHomeBtn () {
       await this.backHomeBtn.click();
    };

     async displayThankYouMessage() {
        return this.thankYouMessage.textContent();
    };
}