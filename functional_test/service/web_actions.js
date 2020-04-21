const chai = require('chai');
const { expect } = chai;

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

const actionsForSession = exports.forSession = browser => {
    const fillTheFieldInSession = fillTheField(browser)
    const clickTheButtonInSession = clickTheButton(browser)
    const checkTheElementInSession = checkTheElement(browser)
    const checkElementTextInSession = checkElementText(browser)
    return {fillTheFieldInSession, clickTheButtonInSession, checkTheElementInSession, checkElementTextInSession}
}

exports.commonActions = actionsForSession => {
    const checkHeaderText = actionsForSession.checkElementTextInSession('//*[@id="contents_wrapper"]/div[2]')
    return { checkHeaderText }
}