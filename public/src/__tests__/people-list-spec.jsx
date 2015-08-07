var React = require('react/addons'),
    PeopleList = require('../components/PeopleList'),
    ReactTestUtils = React.addons.TestUtils;


describe('PeopleAvailable', function() {

 it("Check Text Assignment", function () {

    var result = ReactTestUtils.renderIntoDocument(<PeopleList/>);
    
    var items = ReactTestUtils.scryRenderedDOMComponentsWithClass(result, 'people-list');
 });

});
