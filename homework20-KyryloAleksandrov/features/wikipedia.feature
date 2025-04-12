Feature: Wikipedia homepage

  Scenario: Open Wikipedia homepage
    Given I am on the homepage
    Then the title should contain "Wikipedia"
