Feature: Editing a birthday
    Scenario: Correcting the year of birth
        Given An existing birthday for "Hercules" on "1992-03-04"
        When I navigate to the "/birthdays" page
        And I Edit the birthday for "Hercules" to be "1200-01-01"
        Then the birthday for "Hercules" should show "1200-01-01"
        And the text "1992-03-04" should not appear on the page
