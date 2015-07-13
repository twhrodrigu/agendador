Feature: As a recruiter, I want to view a list of available consultants for a specified time, so that I can schedule an interview

Scenario: Search for available consultants
	Given I'm a recruiter and I'm logged on the Agendador System
	When I choose the day, hour, role and office for the interview
	Then I should see the available consultants with their photo, name and email