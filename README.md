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

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
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
│   ├── product_add.js
│   ├── cartpage.js
│   ├── checkout_step_one.js
│   ├── checkout_step_two.js
│   └── checkout_complete.js
├── fixture/
│   └── index.js               # Fixture composition with dependency 
│
├── test_data/
│   ├── customerInfo.json
│   └── loginData.json
│          
├── tests/
│   ├── login.spec.js
│   ├── product_browse.spec.js
│   ├── product_add.spec.js
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
| Product Browse | 2 tests | ✅ |
| Product Add | 1 test | ✅ |
| Cart Management | 1 test | ✅ |
| Checkout Step 1 | 5 tests | ✅ |
| Checkout Step 2 | 1 test | ✅ |
| Checkout Complete | 1 test | ✅ |
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

