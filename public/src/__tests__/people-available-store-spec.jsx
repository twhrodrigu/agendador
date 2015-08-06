var PeopleAvailableStore = require('../stores/PeopleAvailableStore'),
    moment = require('moment');

describe("People Available", function() {
	var _peopleAvailableStore;

	beforeEach(function() {
		PeopleAvailableStore.getInitialState();
	});

	it("should set selectedStartTimeIndex on people available store", function () {
		// TODO: finish assertions
		expect(PeopleAvailableStore.selectedRoleIndex).toEqual(0);
	});
});
