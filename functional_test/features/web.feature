@web
Feature: To validate user ability to make a checkout

  Background:
    Given valid user successfully signed up to the site

  @checkout
  Scenario: Simple flow to complete checkout
    When customer picking first item to the cart
    Then cart contains first item
    When customer make a checkout
    Then order placed correctly

  Scenario: To check sort options
    When customer sorting items
    Then items displayed in sorted way

  Scenario: To check ability to modify shopping cart
    When customer picking '2' item to the cart
    Then cart contains '2' item
    When customer visiting cart
    And removing item
    Then cart contains '1' item