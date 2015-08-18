'use strict';

describe('PeopleInfoItem', function(){
  var React = require('react/addons'),
      setMuiTheme = require('../set-mui-theme'),
      TestUtils = React.addons.TestUtils,
      PeopleInfoItem = require('../../components/PeopleInfoItem.jsx');

  var component, person, renderedComponent;

  setMuiTheme(PeopleInfoItem);

  beforeEach(function(){
    person = require('../fixtures/people.js')()[0];
    component = React.createElement(PeopleInfoItem, person);
    renderedComponent = TestUtils.renderIntoDocument(component);
  });

  afterEach(function() {
    React.unmountComponentAtNode(document);
  });

  it("should create a new PeopleInfoItem", function(){
    expect(component).toBeDefined();

    expect(component.props.id).toBe(1);
    expect(component.props.name).toBe("Pedro Rocha");
    expect(component.props.email).toBe("procha@thoughtworks.com");
    expect(component.props.p3).toBe("Lead");
    expect(component.props.p2).toBe("Pair");
  });

  it("should render properties into component ", function(){
    var itemName = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'people-tile-text-name');
    expect(itemName.getDOMNode().textContent).toBe(component.props.name);

    var itemEmail = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'people-tile-text-email');
    expect(itemEmail.getDOMNode().textContent).toBe(component.props.email);
  });
});
