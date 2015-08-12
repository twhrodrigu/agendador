'use strict';

var request = require('superagent'),
    config = require('../mock-config.js');
require('superagent-mock')(request, config);

describe("PeopleInfo", function(){
  var React = require('react/addons'),
      TestUtils = React.addons.TestUtils;
  var PeopleInfo, component, renderedComponent;

  beforeEach(function(){
    PeopleInfo = require("../../components/PeopleInfo.jsx");
    component = React.createElement(PeopleInfo);
    renderedComponent = TestUtils.renderIntoDocument(component);
  });

  it("should load data into component", function(){
    var PeopleInfoItem = require('../../components/PeopleInfoItem'),
        countPeople = TestUtils.scryRenderedComponentsWithType(renderedComponent, PeopleInfoItem).length;

    expect(countPeople).toBe(2);
  });
});
