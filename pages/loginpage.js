// import { ENV } from '../config/env.js';
export class LoginPage {

    constructor(page) {

        this.page = page;

        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');

        this.errorMessage = page.locator('h3');

    };

    async visitPage() {
        await this.page.goto('/');
    };

    async login(username, password) {

        await this.usernameField.clear();
        await this.usernameField.fill(username);
        await this.passwordField.clear();
        await this.passwordField.fill(password);
        await this.loginButton.click();
    };

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    };

};

