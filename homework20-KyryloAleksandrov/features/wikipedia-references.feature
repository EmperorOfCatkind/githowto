Feature: Wikipedia article references and footnotes

  Scenario Outline: Jump to footnotes for a number of references
    Given I am on the Wikipedia homepage
    When I search for "Alan Turing"
    Then I should be able to click and view the first <count> valid footnotes

    Examples:
      | count |
      | 5     |