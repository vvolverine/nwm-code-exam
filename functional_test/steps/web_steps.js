const chai = require('chai');
const { Given, When, Then, After, Before } = require('cucumber');
const { remote } = require('webdriverio');
const { expect } = chai;

let browser

Before({tags: "@web"}, async () => {
    browser = await remote({
                       logLevel: 'trace',
                       capabilities: {
                           browserName: 'chrome'
                       }
                  })
})

Given('valid user successfully signed up to the site', async () => {
    console.log(browser)

    await browser.url('https://www.saucedemo.com/')

    const userNameField = await browser.$('#user-name')
    await userNameField.setValue('standard_user')

    const passField = await browser.$('#password')
    await passField.setValue('secret_sauce')

    const loginBtn = await browser.$('//*[@id="login_button_container"]/div/form/input[3]')
    await loginBtn.click()

    const productPageName = await browser.$('//*[@id="inventory_filter_container"]/div')
    const isDisplayed = await productPageName.isEnabled()
    expect(isDisplayed).to.be.true
})

When('customer picking first item to the cart', async () => {
    const itemAddButton = await browser.$('//*[@id="inventory_container"]/div/div[1]/div[3]/button')
    await itemAddButton.click()
    const cartCount = await browser.$('//*[@id="shopping_cart_container"]/a/span')
    const text = await cartCount.getText()
    expect(text).to.equal('1')
})

Then('cart contains first item', async () => {
    const cartIcon = await browser.$('//*[@id="shopping_cart_container"]/a')
    await cartIcon.click()
    const cartPageName = await browser.$('//*[@id="contents_wrapper"]/div[2]')
    const isCartEnabled = await cartPageName.isEnabled()
    expect(isCartEnabled).to.be.true
    const firstCartItem = await browser.$('//*[@id="item_4_title_link"]/div')
    const firstItemText = await firstCartItem.getText()
    expect(firstItemText).to.equal('Sauce Labs Backpack')
})

When('customer make a checkout', async () => {
    const checkoutBtn = await browser.$('=CHECKOUT')
    await checkoutBtn.click()

    const userNameField = await browser.$('#first-name')
    await userNameField.setValue('First Test Name')

    const lastNameField = await browser.$('#last-name')
    await lastNameField.setValue('Lat Test Name')

    const zipCodeField = await browser.$('#postal-code')
    await zipCodeField.setValue('84567')

    const continueBtn = await browser.$('//*[@id="checkout_info_container"]/div/form/div[2]/input')
    await continueBtn.click()

    const overviewPageTitle = await browser.$('//*[@id="contents_wrapper"]/div[2]')
    const overviewPageText = await overviewPageTitle.getText()
    expect(overviewPageText).to.equal('Checkout: Overview')

    const totalPriceElement = await browser.$('//*[@id="checkout_summary_container"]/div/div[2]/div[7]')
    const totalPriceText = await totalPriceElement.getText()
    expect(totalPriceText).to.equal('Total: $32.39')

    const finishBtn = await browser.$('=FINISH')
    await finishBtn.click()
})

Then('order placed correctly', async () => {
    const greetingsElement = await browser.$('//*[@id="checkout_complete_container"]/h2')
    const greetingsText = await greetingsElement.getText()
    expect(greetingsText).to.equal('THANK YOU FOR YOUR ORDER')
})

After({tags: "@web"}, async () => {
    await browser.deleteSession()
})