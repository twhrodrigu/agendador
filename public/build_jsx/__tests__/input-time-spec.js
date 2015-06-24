// var React = require('react/addons');
// var InputTime = require('../src/components/InputTime.jsx');
// var ReactTestUtils = React.addons.TestUtils;

  describe('test', function() {
    it('should work pls', function(){
      var renderedComponent = ReactTestUtils.renderIntoDocument(React.createElement(InputTime, null));
      console.log(renderedComponent);
      var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');

      console.log(inputComponent);

      this.inputElement = inputComponent.getDOMNode();
      console.log(this.inputElement);

      expect(1).toBe(1);
    });
  });
