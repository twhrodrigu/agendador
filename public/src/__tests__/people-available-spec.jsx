var React = require('react/addons'),
    PeopleAvailable = require('../components/PeopleAvailable'),
    PeopleAvailableStore = require('../stores/PeopleAvailableStore'),
    setMuiTheme = require('./set-mui-theme'),
    moment = require('moment'),
    mui = require('material-ui'),
    ReactTestUtils = React.addons.TestUtils;

require('react-tap-event-plugin')();
setMuiTheme(PeopleAvailable);

describe("People Available", function() {

    var _peopleAvailable;
    var _initialData = {
        selectedDate:           new Date(1438873200000), // 2015-08-06 12:00:00.000 BRT
        selectedStartTimeIndex: 0,
        selectedEndTimeIndex:   1,
        selectedRoleIndex:      2,
        selectedOfficeIndex:    3,
        roles:                  ['r0', 'r1', 'r2', 'r3'].map((role, idx) => ({payload: idx, text: role})),
        offices:                ['o0', 'o1', 'o2', 'o3'].map((office, idx) => ({payload: idx, text: office})),
        people:                 []
    };

    beforeEach(function() {
        spyOn(PeopleAvailableStore, 'getInitialState').and.returnValue(_initialData);
        _peopleAvailable = ReactTestUtils.renderIntoDocument(<PeopleAvailable/>);
    });

    it("should start with current date on date box", function() {
        var date = moment(_initialData.selectedDate).format('YYYY-MM-DD');
        var dateTextField = ReactTestUtils.findRenderedDOMComponentWithTag(_peopleAvailable, 'input');
        var node = dateTextField.getDOMNode();

        expect(node.getAttribute('value')).toEqual(date);
    });

    it('should set the initial state', function () {
        var refs = _peopleAvailable.refs;

        // test React component states
        expect(refs.date.state.date.getTime()).toEqual(_initialData.selectedDate.getTime());
        expect(refs.startTime.refs.dropDownMenu.state.selectedIndex).toEqual(_initialData.selectedStartTimeIndex);
        expect(refs.endTime.refs.dropDownMenu.state.selectedIndex).toEqual(_initialData.selectedEndTimeIndex);
        expect(refs.role.state.selectedIndex).toEqual(_initialData.selectedRoleIndex);
        expect(refs.office.state.selectedIndex).toEqual(_initialData.selectedOfficeIndex);
        expect(refs.role.props.menuItems).toEqual(_initialData.roles);
        expect(refs.office.props.menuItems).toEqual(_initialData.offices);
        expect(refs.people).toBeUndefined();

        // test DOM (TODO: review whether this is the right place to test the rendering) of subcomponents)
        expect(ReactTestUtils.findRenderedDOMComponentWithTag(refs.date, 'input').getDOMNode().getAttribute('value')).toEqual("2015-08-06");
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(refs.startTime, 'time-box').getDOMNode().querySelector('div').innerText).toEqual('7:00');
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(refs.endTime, 'time-box').getDOMNode().querySelector('div').innerText).toEqual('7:30');
        expect(refs.role.getDOMNode().querySelector('div').innerText).toEqual('r2');
        expect(refs.office.getDOMNode().querySelector('div').innerText).toEqual('o3');
    });

    it('should change the form inputs', function () {
        var refs = _peopleAvailable.refs;

        // skip test of refs.date because we were unable to trigger a rerender of the DatePicker component
        refs.startTime.refs.dropDownMenu.setState({ selectedIndex: 1 });
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(refs.startTime, 'time-box').getDOMNode().querySelector('div').innerText).toEqual(refs.startTime.state.menuItems[1].text);
        refs.endTime.refs.dropDownMenu.setState({ selectedIndex: 2 });
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(refs.endTime, 'time-box').getDOMNode().querySelector('div').innerText).toEqual(refs.endTime.state.menuItems[2].text);
        refs.role.setState({ selectedIndex: 3 });
        expect(refs.role.getDOMNode().querySelector('div').innerText).toEqual('r3');
        refs.office.setState({ selectedIndex: 0 });
        expect(refs.office.getDOMNode().querySelector('div').innerText).toEqual('o0');
    });

    it('should trigger the Action.searchRequest when the search button is clicked', function () {
        var refs = _peopleAvailable.refs;
        var Actions = require('../actions/Actions');
        spyOn(Actions, 'searchRequest');
        var component = ReactTestUtils.renderIntoDocument(<PeopleAvailable />);
        ReactTestUtils.Simulate.touchTap(component.refs.search.getDOMNode().firstChild); // why "firstChild"? see https://github.com/callemall/material-ui/issues/410
        expect(Actions.searchRequest).toHaveBeenCalled();
    });
});
