Feature: Wikipedia article references and footnotes

  Scenario: Jump to footnotes for up to 5 references
    Given I am on the Wikipedia homepage
    When I search for "Alan Turing"
    Then I should be able to click and view up to 5 valid footnotes