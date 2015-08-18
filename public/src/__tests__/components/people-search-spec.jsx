'use strict';

describe("PeopleSearch", function(){

  var React = require('react/addons'),
      TestUtils = React.addons.TestUtils,
      setMuiTheme = require('../set-mui-theme'),
      PeopleSearch = require('../../components/PeopleSearch'),
      TextField = require('material-ui').TextField,
      component, renderedComponent;

  setMuiTheme(PeopleSearch);

  beforeEach(function(){
    component = React.createElement(PeopleSearch);
    renderedComponent = TestUtils.renderIntoDocument(component);
  });

  it("should render text field into view", function(){
    expect(TestUtils.scryRenderedComponentsWithType(renderedComponent, TextField).length).toBe(1);
  });

  it("should render text field with hint text", function(){
    var searchTextField = TestUtils.findRenderedComponentWithType(renderedComponent, TextField);
    expect(searchTextField.props.hintText).toBe("Search Thoughtworkers");
  });
});