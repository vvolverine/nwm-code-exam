const { Given, When, Then, After, Before } = require('cucumber');

const web_infra = require('../service/web_infra')

const { LoginPage } = require('../pages/login_page')
const { ProductPage } = require('../pages/product_page')
const { CartPage } = require('../pages/cart_page')
const { InformationPage, OverviewPage, ConfirmationPage } = require('../pages/checkout_page')

Before({tags: "@web"}, async () => {
    this.browser = await web_infra.setup()
    this.LoginPage = LoginPage(this.browser)
    this.ProductPage = ProductPage(this.browser)
    this.CartPage = CartPage(this.browser)
    this.InformationPage = InformationPage(this.browser)
    this.OverviewPage = OverviewPage(this.browser)
    this.ConfirmationPage = ConfirmationPage(this.browser)
})

Given('valid user successfully signed up to the site', async () => {
    await this.LoginPage.open()
    await this.LoginPage.isLoginPage()
    await this.LoginPage.loginAsValidUser()

    await this.ProductPage.isProductPage()
})

When('customer picking first item to the cart', async () => {
    await this.ProductPage.addFirstItemToCart()
})

Then('cart contains first item', async () => {
    await this.ProductPage.openCart()
    await this.CartPage.isCartPage()
    // TODO: make the work with cart items more independent of order
    await this.CartPage.checkFirstItemText('Sauce Labs Backpack')
})

When('customer make a checkout', async () => {
    await this.CartPage.makeCheckout()

    await this.InformationPage.isInformationPage()
    await this.InformationPage.fillValidInfo()
    await this.InformationPage.continueToOverview()

    await this.OverviewPage.isOverviewPage()
    // TODO: make calculations to check prices instead of string comparison
    await this.OverviewPage.checkOrderTotal('Total: $32.39')

    await this.OverviewPage.completeCheckout()
})

Then('order placed correctly', async () => {
    await this.ConfirmationPage.isConfirmationPage()
    await this.ConfirmationPage.checkGreetings()
})

After({tags: "@web"}, async () => {
    await web_infra.tearDown(this.browser)
})