import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage.js';
import  loginData  from '../test_data/loginData.json' assert { type: 'json' };

test.describe.configure({ mode: 'parallel'});

test.describe('Login Test', async() =>{
    
  let Login;
  
  // runs before each test
  test.beforeEach(async ({ page }) => {

    Login = new LoginPage(page)

    // open the application URL
    await Login.visitPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('both field empty', async() => {
    await Login.login('', '');
    const error = await Login.getErrorMessage();
    await expect (error).toBe('Epic sadface: Username is required');
  });

  test('empty username field', async () => {
    await Login.login('', loginData.validUser.password);
    const error = await Login.getErrorMessage();
    await expect(error).toBe('Epic sadface: Username is required');
  });

  test('empty password field', async () => {
    await Login.login(loginData.validUser.username, '');
    const error = await Login.getErrorMessage();
    await expect(error).toBe('Epic sadface: Password is required');
  });

  test('invalid username', async () => {
    await Login.login(loginData.invalidUser.username, loginData.validUser.password);
    const error = await Login.getErrorMessage();
    await expect(error).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('invalid password', async () => {
    await Login.login(loginData.validUser.username, loginData.invalidUser.password);
    const error = await Login.getErrorMessage();
    await expect(error).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('locked out user', async () => {
    await Login.login(loginData.lockedoutUser.username, loginData.lockedoutUser.password);
    const error = await Login.getErrorMessage();
    await expect(error).toBe('Epic sadface: Sorry, this user has been locked out.');
  });

  test('valid credentials', async ({ page }) => {
    await Login.login(loginData.validUser.username, loginData.validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('User is logged into the sauce demo website.');
  });
    

});