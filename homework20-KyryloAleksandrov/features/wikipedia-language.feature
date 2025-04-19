Feature: Wikipedia article language switch

  Scenario Outline: Switch article to another language
    Given I am on the Wikipedia homepage
    When I search for "Alan Turing"
    And I switch the article language to "<langCode>"
    Then I should be on the "<domain>" domain
    And the article title should be visible

    Examples:
      | langCode | domain             |
      | es       | es.wikipedia.org  |
      | fr       | fr.wikipedia.org  |
      | de       | de.wikipedia.org  |