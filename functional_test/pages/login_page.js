const web_actions = require('../service/web_actions')

exports.LoginPage = browser => {
    const actions = web_actions.forSession(browser)
    const fillUsername = actions.fillTheFieldInSession('#user-name')
    const fillPassword = actions.fillTheFieldInSession('#password')

    const open = async () => {
        return browser.url('https://www.saucedemo.com/')
    }

    const isLoginPage = async () => {
        return actions.checkTheElementInSession('/html/body/div[1]')
    }

    const loginAsValidUser = async () => {
        await fillUsername('standard_user')
        await fillPassword('secret_sauce')
        return actions.clickTheButtonInSession('//*[@id="login_button_container"]/div/form/input[3]')
    }

    const loginAsProblemUser = async () => {
        await fillUsername('problem_user')
        await fillPassword('secret_sauce')
        return actions.clickTheButtonInSession('//*[@id="login_button_container"]/div/form/input[3]')
    }

    return {open, isLoginPage, loginAsValidUser}
}