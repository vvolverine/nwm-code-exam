const web_actions = require('../service/web_actions')

exports.CartPage = browser => {
    const actions = web_actions.forSession(browser)
    const commonActions = web_actions.commonActions(actions)

    const isCartPage = async () => {
        return commonActions.checkHeaderText('Your Cart')
    }

    const checkFirstItemText = actions.checkElementTextInSession('//*[@id="item_4_title_link"]/div')

    const makeCheckout = async () => {
        return actions.clickTheButtonInSession('=CHECKOUT')
    }

    return { isCartPage, checkFirstItemText, makeCheckout }
}