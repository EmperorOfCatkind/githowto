Feature: Wikipedia article search

  Scenario Outline: Search for an article and verify title and language dropdown
    Given I am on the Wikipedia homepage
    When I search for "<query>"
    Then the article title should be "<query>"
    And the language dropdown should be visible

    Examples:
      | query         |
      | Alan Turing   |
      | Marie Curie   |
      | Isaac Newton  |