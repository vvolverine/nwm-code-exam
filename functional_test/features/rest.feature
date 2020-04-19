@rest
Feature: Contains use cases to validate that REST api works correctly

  @get
  Scenario: To check the first user in the list
    Given first user exist and valid

  @post
  Scenario: To check ability to create user
    When new valid user created

  @put
  Scenario: To check ability to update user
    When first user can be updated correctly

  @delete
  Scenario: To check clean up ability
    When third album deleted successfully
