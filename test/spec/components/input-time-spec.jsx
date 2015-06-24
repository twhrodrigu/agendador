
console.log("a");
describe('test', function() {
  it('should work pls', function(){
    var ReactTestUtils = React.addons.TestUtils;


    var renderedComponent = ReactTestUtils.renderIntoDocument(<InputTime/>);
    console.log(renderedComponent);
    var inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');

    console.log(inputComponent);

    this.inputElement = inputComponent.getDOMNode();
    console.log(this.inputElement);

    expect(1).toBe(1);
  });
});
