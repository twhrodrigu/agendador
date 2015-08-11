'use strict';

describe('PeopleInfoList', function(){
  var React = require('react/addons'),
      TestUtils = React.addons.TestUtils;
  var PeopleInfoList, component, renderedComponent, people;

  beforeEach(function(){
    PeopleInfoList = require('../../components/PeopleInfoList.jsx');
    people = require('../fixtures/people.js')();
    component = React.createElement(PeopleInfoList, { people: people });
    renderedComponent = TestUtils.renderIntoDocument(component);
  });

  afterEach(function(){
    React.unmountComponentAtNode(document);
  });

  it('should create a new instance of PeopleInfoList', function(){
    expect(component).toBeDefined();
    expect(component.props.people.length).toBe(people.length);
  });

  it('should render a list of people', function(){
    var PeopleInfoItem = require('../../components/PeopleInfoItem');
    var countPeople = TestUtils.scryRenderedComponentsWithType(renderedComponent, PeopleInfoItem).length;

    expect(countPeople).toBe(component.props.people.length);
  });
});
