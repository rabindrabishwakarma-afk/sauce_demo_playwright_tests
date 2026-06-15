# SauceDemo Playwright Automation Framework

A comprehensive end-to-end test automation framework for [SauceDemo](https://www.saucedemo.com/) built with Playwright and JavaScript, implementing Page Object Model (POM) and fixture-based architecture patterns.

## Overview

This framework automates the complete purchase workflow including login, product browsing, cart management, and checkout processes. Features fixture composition, session reuse via `storageState`, and structured test data management.

## Prerequisites

- **Node.js**: v16+ 
- **npm**: v8+
- **Playwright**: Latest version

## Installation

```bash
# Clone/navigate to project directory
cd saucedemo-automation

# Initialize node package
npm init -y

# Initialize playwright within project
npm init playwright@latest
```

## Project Structure

```
├── auth/
│    └── user.json              # Stored auth state
├── config/
│   └── env.js                 # Environment variables configuration
├── pages/                     # Page Object Model classes
│   ├── loginpage.js
│   ├── productbrowse.js
│   ├── product_management.js
│   ├── cartpage.js
│   ├── checkout_step_one.js
│   ├── checkout_step_two.js
│   └── checkout_complete.js
├── fixture/
│   └── index.js               # Fixture composition with dependency chain
│
├── test_data/
│   ├── customerInfo.json
│   └── loginData.json
│          
├── tests/
│   ├── login.spec.js
│   ├── product_browse.spec.js
│   ├── product_management.spec.js
│   ├── cart.spec.js
│   ├── checkout_step_one.spec.js
│   ├── checkout_step_two.spec.js
│   ├── checkout_complete.spec.js
│   ├── logout.spec.js
│   └── e2e.spec.js
├── playwright.config.js       # Playwright configuration
├── globalSetup.js             # Authentication setup hook
└── .env                       # Environment variables
```

## Configuration
 
### .env
Create a `.env` file in the project root storing baseURL and credentials.


## Key Features

###  Fixture Composition Chain
- **loggedIn** → Sets up authenticated session using `storageState`
- **productAdded** → Adds 4 products to cart
- **atCartPage** → Initializes CartPage object
- **atCheckoutStepOne** → Removes items & navigates to checkout
- **atCheckoutStepTwo** → Enters customer info & moves to step two
- **atCheckoutComplete** → Completes order

###  Page Object Model
Each page encapsulates:
- Locators (data-test attributes)
- User interaction methods
- Assertion helpers

###  Session Reuse
Authentication happens once in `globalSetup.js`:
- Logs in via LoginPage
- Saves cookies & localStorage to `auth/user.json`
- Tests bypass login using saved state

###  Test Coverage

| Feature | Tests | Status |
|---------|-------|--------|
| Login | 7 tests | ✅ |
| Product Browse | 5 tests | ✅ |
| Product Management | 3 test | ✅ |
| Cart Management | 6 test | ✅ |
| Checkout Step 1 | 6 tests | ✅ |
| Checkout Step 2 | 6 test | ✅ |
| Checkout Complete | 3 test | ✅ |
| Logout | 1 test | ✅ |
| End-to-End | 1 test | ✅ |

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/login.spec.js

# Run with headed browser
npm test -- --headed

# Run in debug mode
npm test -- --debug

# Run in parallel mode (default)
npm test -- tests/ --workers=4

# Run with specific project
npm test -- --project=chromium
```

## Test Data

### customerInfo.json
    Stores customer information used in checkout process.

### loginData.json
    Stores login credentials used across login-related test cases.


## Authentication Flow

1. **Global Setup** (`globalSetup.js`)
   - Launches browser, navigates to login page
   - Performs login with valid credentials
   - Saves storage state to `auth/user.json`

2. **Test Execution**
   - Tests load saved authentication state
   - Navigates directly to inventory page
   - Skips login process entirely

## Test Cases

### login.spec.js
    1. Login with both field empty
    2. Login with empty username field
    3. Login with empty password field
    4. Login wtih invalid username
    5. Login with invalid password
    6. Login with locked out user credentials
    7. Login with valid credentials

### prodcut_browse.spec.js
    1. Navigation to product detail page
    2. Default sort order is Name (A to Z)
    3. Sort products by Name (Z to A)
    4. Sort products by Price (low to high)
    5. Sort products by Price (high to low)

### product_management.spec.js
    1. Add products to cart, remove and verify the cart badge count
    2. Add non-existing product(negative test)
    3. Remove non-existing product(negative test)

### cart_page.spec.js
    1. Cart page navigation
    2. Products in cart
    3. Product remove
    4. Remove non-existing product(negative test)
    5. Continue shopping button functionality
    6. Checkout button functionality

### checkout_step_one.spec.js
    1. Checkout with all fields empty in customer info
    2. Checkout with empty first name in customer info
    3. Checkout with empty last name in customer info
    4. Checkout with empty postal code in customer info
    5. Cancel button functionality
    6. Continue button functionality

### checkout_step_two.spec.js
    1. Checkout step two page navigation
    2. Final products in the cart
    3. Checkout information on checkout step two page
    4. Total and subtotal amount calculation
    5. Cancel button functionality
    6. Finish button functionality
    
### checkout_complete.spec.js
    1. Checkout complete page navigation
    2. Thank you message display
    3. Back Home button functionality

### logout.spec.js
    1. Logout functionality

### e2e_user_flow.spec.js
    complete user flow from login to logout


## Best Practices Implemented

    **Page Object Model** - Centralized locators & actions  
    **Fixture Composition** - Reusable setup chains  
    **Environment Variables** - Configuration management  
    **Test Data Separation** - JSON-based test data  
    **Session Reuse** - Fast test execution  
    **Parallel Execution** - Tests run in parallel  
    **Error Messages** - Descriptive error handling  

## Dependencies

- `@playwright/test` - Testing framework
- `dotenv` - Environment variable management

