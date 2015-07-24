/**
 * @jsx React.DOM
 */

var React = require('react/addons'),
    InputTime = require('../components/InputTime'),
    setMuiTheme = require('./set-mui-theme'),
    ReactTestUtils = React.addons.TestUtils;

setMuiTheme(InputTime);

describe('InputTime', function() {

 it("should have available times between 07:00 and 19:00 stepped by 30 minutes", function () {

  var expectedItems = [];
    for (var i = 7; i <= 19; i++) {
        expectedItems.push({payload : i, text: i + ':00' });
        expectedItems.push({payload : i, text: i + ':30' });
    }

    result = ReactTestUtils.renderIntoDocument(<InputTime/>);
    
    expect(result.state.menuItems).toEqual(expectedItems);
 });

});
