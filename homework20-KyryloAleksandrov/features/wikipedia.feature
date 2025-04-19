Feature: Wikipedia homepage UI

  Scenario: Search input and button are visible
    Given I am on the Wikipedia homepage
    Then the search input should be visible
    And the search button should be visible