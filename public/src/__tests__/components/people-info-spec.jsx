'use strict';

var request = require('superagent');

describe("PeopleInfo", function(){
  var React = require('react/addons'),
      TestUtils = React.addons.TestUtils,
      setMuiTheme = require('../set-mui-theme');

  var PeopleInfo, renderedComponent;

  it("should load data into component", function(){
    mockRequest(function(){ return require('../mock-config.js')});

    var PeopleInfoItem = require('../../components/PeopleInfoItem'),
        countPeople = TestUtils.scryRenderedComponentsWithType(renderedComponent, PeopleInfoItem).length;

    expect(countPeople).toBe(2);
  });

  it("should only display consistent data", function(){
    mockRequest(function(){
      return require('../mock-config-inconsistent-data.js');
    });

    var PeopleInfoItem = require('../../components/PeopleInfoItem'),
        _ = require('underscore'),
        peopleItems = TestUtils.scryRenderedComponentsWithType(renderedComponent, PeopleInfoItem),
        requiredProperties = ["name", "email", "p3", "tech_pairing"];

    expect(peopleItems.length).toBe(1);
    expect(_.keys(peopleItems[0].props)).toEqual(requiredProperties);
  });

  var mockRequest = function(mockConfig){
    var config = mockConfig();
    require('superagent-mock')(request, config);

    PeopleInfo = require("../../components/PeopleInfo.jsx");
    setMuiTheme(PeopleInfo);
    renderedComponent = TestUtils.renderIntoDocument(<PeopleInfo/>);
  };
});
