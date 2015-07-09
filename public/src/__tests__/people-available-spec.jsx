/**
 * @jsx React.DOM
 */

var React = require('react/addons'),
    PeopleAvailable = require('../components/PeopleAvailable'),
    ReactTestUtils = React.addons.TestUtils,
    moment = require('moment');


describe("People Available", function() {

	var _peopleAvailable;

	beforeEach(function() {
		_peopleAvailable = ReactTestUtils.renderIntoDocument(<PeopleAvailable/>);
	});

	it("should start with current date on date box", function() {
		var today = moment().format('YYYY-MM-DD');
		var dateTextField = ReactTestUtils.findRenderedDOMComponentWithTag(_peopleAvailable, 'input');
		var node = dateTextField.getDOMNode();

		expect(node.getAttribute('value')).toEqual(today);
	});

	it("should start with selectedTime equal to 07:00", function() {
		var expectedTime = moment().startOf('day').add(7, 'hours').toString();

		expect(_peopleAvailable.state.selectedTime.toString()).toEqual(expectedTime);
	});
});