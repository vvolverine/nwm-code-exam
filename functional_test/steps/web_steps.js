const chai = require('chai');
const { Given, When, Then, After, Before, setWorldConstructor } = require('cucumber');
const { remote } = require('webdriverio');
const { expect } = chai;

function CustomWorld({attach, parameters}) {
    this.attach = attach
    this.parameters = parameters
}

setWorldConstructor(CustomWorld)

Before({tags: "@web"}, async () => {
    this.browser = await remote({
                       logLevel: 'trace',
                       capabilities: {
                           browserName: 'chrome'
                       }
                  })
    this.fillTheFieldInSession = fillTheField(this.browser)
    this.clickTheButtonInSession = clickTheButton(this.browser)
    this.checkTheElementInSession = checkTheElement(this.browser)
    this.checkElementTextInSession = checkElementText(this.browser)
})

const fillTheField = browser => fieldLocator => async value => {
    const field = await browser.$(fieldLocator)
    await field.setValue(value)
}

const clickTheButton = browser => async fieldLocator => {
    const button = await browser.$(fieldLocator)
    await button.click()
}

const checkTheElement = browser => async fieldLocator => {
    const element = await browser.$(fieldLocator)
    const isEnabled = await element.isEnabled()
    expect(isEnabled).to.be.true
}

const checkElementText = browser => fieldLocator => async expectedText => {
    const cartCount = await browser.$(fieldLocator)
    const text = await cartCount.getText()
    expect(text).to.equal(expectedText)
}

Given('valid user successfully signed up to the site', async () => {
    await this.browser.url('https://www.saucedemo.com/')

    await this.fillTheFieldInSession('#user-name')('standard_user')
    await this.fillTheFieldInSession('#password')('secret_sauce')
    await this.clickTheButtonInSession('//*[@id="login_button_container"]/div/form/input[3]')

    await this.checkTheElementInSession('//*[@id="inventory_filter_container"]/div')
})

When('customer picking first item to the cart', async () => {
    await this.clickTheButtonInSession('//*[@id="inventory_container"]/div/div[1]/div[3]/button')
    await this.checkElementTextInSession('//*[@id="shopping_cart_container"]/a/span')('1')
})

Then('cart contains first item', async () => {
    await this.clickTheButtonInSession('//*[@id="shopping_cart_container"]/a')
    await this.checkTheElementInSession('//*[@id="contents_wrapper"]/div[2]')
    await this.checkElementTextInSession('//*[@id="item_4_title_link"]/div')('Sauce Labs Backpack')
})

When('customer make a checkout', async () => {
    await this.clickTheButtonInSession('=CHECKOUT')

    await this.fillTheFieldInSession('#first-name')('First Test Name')
    await this.fillTheFieldInSession('#last-name')('Last Test Name')
    await this.fillTheFieldInSession('#postal-code')('84567')
    await this.clickTheButtonInSession('//*[@id="checkout_info_container"]/div/form/div[2]/input')

    await this.checkElementTextInSession('//*[@id="contents_wrapper"]/div[2]')('Checkout: Overview')

    await this.checkElementTextInSession('//*[@id="checkout_summary_container"]/div/div[2]/div[7]')('Total: $32.39')

    await this.clickTheButtonInSession('=FINISH')
})

Then('order placed correctly', async () => {
    await this.checkElementTextInSession('//*[@id="checkout_complete_container"]/h2')('THANK YOU FOR YOUR ORDER')
})

After({tags: "@web"}, async () => {
    await this.browser.deleteSession()
})