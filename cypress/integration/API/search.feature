@regression
Feature: Search by book titled

  @regression
  Scenario: Search for a book by title and author
    When I look up a book titled "Harry Potter"
    Then I validate the author's website
