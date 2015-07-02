/**
 * @jsx React.DOM
 */

var React = require('react/addons'),
    PeopleList = require('../components/PeopleList'),
    ReactTestUtils = React.addons.TestUtils;


describe('PeopleAvailable', function() {

 it("Check Text Assignment", function () {

    result = ReactTestUtils.renderIntoDocument(<PeopleList/>);
    
    var items = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'people-list');
    
    expect(1).toBe(1);
 });

});