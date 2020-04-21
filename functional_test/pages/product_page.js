const web_actions = require('../service/web_actions')

exports.ProductPage = browser => {
    const actions = web_actions.forSession(browser)
    const checkCartCounterIs = actions.checkElementTextInSession('//*[@id="shopping_cart_container"]/a/span')

    const isProductPage = async () => {
        return actions.checkElementTextInSession('//*[@id="inventory_filter_container"]/div')('Products')
    }

    const addFirstItemToCart = async () => {
        await actions.clickTheButtonInSession('//*[@id="inventory_container"]/div/div[1]/div[3]/button')
        return checkCartCounterIs('1')
    }

    const openCart = async () => {
        return actions.clickTheButtonInSession('//*[@id="shopping_cart_container"]/a')
    }

    return { isProductPage, addFirstItemToCart, openCart }
}