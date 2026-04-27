# ==============================================================================
# FEATURE FILE TEMPLATE
# Copy this file to features/<module>.feature and replace all <placeholders>
# ==============================================================================

@<module>
Feature: <Feature Title>
  As a <role>
  I want to <goal>
  So that <benefit>

  # ---------------------------------------------------------------------------
  # Background: runs before every scenario in this feature
  # ---------------------------------------------------------------------------
  Background:
    Given I navigate to the application URL
    And I am on the "<page name>" page

  # ---------------------------------------------------------------------------
  # Smoke test — happy path, mandatory @high priority
  # ---------------------------------------------------------------------------
  @smoke @high @TC_<MODULE>_001
  Scenario: <Brief title describing the happy-path test case>
    Given <the initial state or precondition>
    When  <the primary action performed by the user>
    And   <additional action if needed>
    Then  <the expected outcome>
    And   <additional expected outcome if needed>

  # ---------------------------------------------------------------------------
  # Regression test — negative / edge case
  # ---------------------------------------------------------------------------
  @regression @medium @TC_<MODULE>_002
  Scenario: <Brief title describing the negative test case>
    Given <the initial state or precondition>
    When  <the action that triggers the error>
    Then  <the expected error message or behaviour>

  # ---------------------------------------------------------------------------
  # Data-driven test — use Scenario Outline + Examples table
  # ---------------------------------------------------------------------------
  @regression @medium @TC_<MODULE>_003
  Scenario Outline: <Data-driven scenario title using "<variable>">
    Given <precondition referencing "<variable>">
    When  <action referencing "<variable>">
    Then  <expected result referencing "<expected>">

    Examples:
      | variable | expected |
      | value1   | result1  |
      | value2   | result2  |
      | value3   | result3  |
