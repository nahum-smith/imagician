const expect = require('chai').expect;
describe('The code', () => {
  beforeEach(() => {
// optional preparation for each test
  });
  afterEach(() => {
// optional cleanup after each test
  });
  it('should test something', () => {
    var something = 1;
// here we "expect" some condition to declare our test
// in this case, we expect the variable to exist
// more on the assertion syntax a little later
    expect(something).to.exist;
  });
  it('should test something_else', () => {
    var something_else = false;
// now we test a different variable against its value
// and expect that value to equal false
    expect(something_else).to.equal(false);
  });
});
