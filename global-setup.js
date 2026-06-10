import { chromium } from '@playwright/test';
import { ENV } from './config/env.js';
import { LoginPage } from './pages/loginpage.js';
import loginData from './test_data/loginData.json' assert { type: 'json' };

export default async function globalSetup() {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(ENV.baseURL);

    // login
    const Login = new LoginPage(page);
    await Login.login(loginData.validUser.username, loginData.validUser.password);

    // wait until user is on inventory page
    await page.waitForURL(`${ENV.baseURL}/inventory.html`);

    // save cookies, local storage and session storage to the file
    await page.context().storageState({ path: 'auth/user.json' });

    await browser.close();

}