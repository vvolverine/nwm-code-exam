const CucumberJSAllureFormatter = require('allure-cucumberjs').CucumberJSAllureFormatter;
const AllureRuntime = require('allure-cucumberjs').AllureRuntime;

 /**
 * Allure Reporter class
 * @class
 */
  class Reporter extends CucumberJSAllureFormatter {
  /**
   * Create a allure report.
   * @param {Object} options - Allure options.
   */
    constructor(options) {
      super(
          options,
          new AllureRuntime({resultsDir:"./out/allure-results"}),
          {
            labels: {
              issue: [/@bug_(.*)/],
              epic: [/@feature:(.*)/],
            },
          },
      );
    }
  }

  exports.default = Reporter;