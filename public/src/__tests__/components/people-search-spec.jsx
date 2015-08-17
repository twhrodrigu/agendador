'use strict';

describe("PeopleSearch", function(){

  var React = require('react/addons'),
      TestUtils = React.addons.TestUtils,
      setMuiTheme = require('../set-mui-theme'),
      PeopleSearch = require('../../components/PeopleSearch'),
      component, renderedComponent;

  setMuiTheme(PeopleSearch);

  beforeEach(function(){
    component = React.createElement(PeopleSearch);
    renderedComponent = TestUtils.renderIntoDocument(component);
  });

  it("should render text field into view", function(){
    var TextField = require('material-ui').TextField;
    expect(TestUtils.scryRenderedComponentsWithType(renderedComponent, TextField).length).toBe(1);
  });
});