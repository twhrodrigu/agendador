'use strict';

describe('PeopleInfoItem', function(){
  var React = require('react/addons'),
      TestUtils = React.addons.TestUtils;

  var PeopleInfoItem, component, person, renderedComponent;

  beforeEach(function(){
    PeopleInfoItem = require('../../components/PeopleInfoItem.jsx');
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
    expect(component.props.name).toBe("Procha");
    expect(component.props.email).toBe("procha@thoughtworks.com");
  });

  it("should render properties into component ", function(){
    var itemName = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'person-info-name');
    expect(itemName.getDOMNode().textContent).toBe(component.props.name);

    var itemEmail = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'person-info-email');
    expect(itemEmail.getDOMNode().textContent).toBe(component.props.email);
  });
});
