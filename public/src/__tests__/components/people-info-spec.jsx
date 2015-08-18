'use strict';

var request = require('superagent');

describe("PeopleInfo", function(){
  var React = require('react/addons'),
      PeopleInfoItem = require('../../components/PeopleInfoItem'),
      setMuiTheme = require('../set-mui-theme'),
      TestUtils = React.addons.TestUtils;

  it("should load data into component", function(done) {
    var component = mockRequest(function(){ return require('../mock-config.js')});
    spyOn(component, 'componentDidUpdate').and.callFake(function () {
      var countPeople = TestUtils.scryRenderedComponentsWithType(component, PeopleInfoItem).length;
      expect(countPeople).toBe(2);
      done();
    });
  });

  it("should only display consistent data", function(done) {
    var component = mockRequest(function() { return require('../mock-config-inconsistent-data.js'); }),
        properties = ["id", "login", "name", "email", "p3", "p2"];
    spyOn(component, 'componentDidUpdate').and.callFake(function () {
        var peopleItems = TestUtils.scryRenderedComponentsWithType(component, PeopleInfoItem);
        expect(peopleItems.length).toBe(1);
        expect(Object.keys(peopleItems[0].props)).toEqual(properties);
        done();
    });
  });

  it("should display search component", function(){
    var component = mockRequest(function(){ return require('../mock-config.js'); }),
        PeopleSearch = require('../../components/PeopleSearch');
    expect(TestUtils.scryRenderedComponentsWithType(component, PeopleSearch).length).toBe(1);
  });

  var mockRequest = function(mockConfig) {
    var config = mockConfig();
    require('superagent-mock')(request, config);

    var PeopleInfo = require("../../components/PeopleInfo.jsx");
    setMuiTheme(PeopleInfo);
    return TestUtils.renderIntoDocument(<PeopleInfo />);
  };
});
