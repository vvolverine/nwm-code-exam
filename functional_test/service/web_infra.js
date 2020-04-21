const { remote } = require('webdriverio');

exports.setup = () => {
    return remote({
                       logLevel: 'trace',
                       capabilities: {
                           browserName: 'chrome'
                       }
                  })
}

exports.tearDown = browser => {
    return browser.deleteSession()
}