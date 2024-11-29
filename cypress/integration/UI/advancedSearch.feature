Feature: Advanced Search

  @regression
  Scenario: User perform a advanced search
    Given I search for the book titled "Harry Potter"
    When I click in the author's name "J. K. Rowling"
    And I sort by rating
    Then I validate the top-rated work is "Harry Potter and the Half-Blood Prince"

  @regression
  Scenario: User changes localization
    When I change the language to "pt"
    Then I see the page in the expected language

#  @negative
#  Scenario: User browse an invalid book in advanced search
#    Given I access advanced search by browsing it
#    When I search by invalid combination
#    Then I see an error message