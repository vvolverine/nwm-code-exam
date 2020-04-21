const web_actions = require('../service/web_actions')

exports.InformationPage = browser => {
    const actions = web_actions.forSession(browser)
    const commonActions = web_actions.commonActions(actions)
    const fillFirstNameWith = actions.fillTheFieldInSession('#first-name')
    const fillLastNameWith = actions.fillTheFieldInSession('#last-name')
    const fillPostalCodeWith = actions.fillTheFieldInSession('#postal-code')

    const isInformationPage = async () => {
        return commonActions.checkHeaderText('Checkout: Your Information')
    }

    const fillValidInfo = async () => {
        await fillFirstNameWith('First Test Name')
        await fillLastNameWith('Last Test Name')
        return fillPostalCodeWith('84567')
    }

    const continueToOverview = async () => {
        return actions.clickTheButtonInSession('//*[@id="checkout_info_container"]/div/form/div[2]/input')
    }

    return { isInformationPage, fillValidInfo, continueToOverview }
}

exports.OverviewPage = browser => {
    const actions = web_actions.forSession(browser)
    const commonActions = web_actions.commonActions(actions)

    const isOverviewPage = async () => {
        return commonActions.checkHeaderText('Checkout: Overview')
    }

    const checkOrderTotal = actions.checkElementTextInSession('//*[@id="checkout_summary_container"]/div/div[2]/div[7]')

    const completeCheckout = async () => {
        return actions.clickTheButtonInSession('=FINISH')
    }

    return { isOverviewPage, checkOrderTotal, completeCheckout }
}

exports.ConfirmationPage = browser => {
    const actions = web_actions.forSession(browser)
    const commonActions = web_actions.commonActions(actions)

    const isConfirmationPage = async () => {
        return commonActions.checkHeaderText('Finish')
    }

    const checkGreetings = async () => {
        return actions.checkElementTextInSession('//*[@id="checkout_complete_container"]/h2')('THANK YOU FOR YOUR ORDER')
    }

    return { isConfirmationPage, checkGreetings }
}