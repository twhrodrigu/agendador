var React = require('react/addons'),
    PeopleAvailable = require('../components/PeopleAvailable'),
    setMuiTheme = require('./set-mui-theme'),
    moment = require('moment'),
    ReactTestUtils = React.addons.TestUtils;

setMuiTheme(PeopleAvailable);

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

	it("should start with selectedStartTime equal to 07:00", function() {
		var expectedTime = moment().startOf('day').add(7, 'hours').toString();

		expect(_peopleAvailable.state.selectedStartTime.toString()).toEqual(expectedTime);
	});

	it("should start with selectedEndTime equal to 07:00", function() {
		var expectedTime = moment().startOf('day').add(7, 'hours').toString();

		expect(_peopleAvailable.state.selectedEndTime.toString()).toEqual(expectedTime);
	});
});
