Feature: Wikipedia disambiguation page validation

  Scenario Outline: Confirm a term leads to a disambiguation page
    Given I open the article for "<term>"
    Then the disambiguation page title should be visible
    And the content should indicate it is a disambiguation page
    And at least one disambiguation link should be present

    Examples:
      | term                      |
      | Mercury (disambiguation) |
      | Jaguar (disambiguation)  |
      | Java (disambiguation)    |
      | Delta (disambiguation)   |
      | Saturn (disambiguation)  |