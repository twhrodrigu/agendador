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

  it("should trigger request only when typing more than 3 chars on text field", function(){
    var Actions = require('../../actions/Actions');
    spyOn(Actions, 'getConsultants');
    var searchComponent = TestUtils.findRenderedComponentWithType(renderedComponent, TextField),
        searchTextField = React.findDOMNode(searchComponent.refs.input);

    searchTextField.value = "Pe";
    TestUtils.Simulate.keyUp(searchTextField, { keyCode: 65 });
    expect(Actions.getConsultants).not.toHaveBeenCalled();

    searchTextField.value = "Ped";
    TestUtils.Simulate.keyUp(searchTextField, { keyCode: 65 });
    expect(Actions.getConsultants).toHaveBeenCalled();
  });
});