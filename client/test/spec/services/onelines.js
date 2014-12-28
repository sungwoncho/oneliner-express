'use strict';

describe('Service: onelines', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var onelines;
  beforeEach(inject(function (_onelines_) {
    onelines = _onelines_;
  }));

  it('should do something', function () {
    expect(!!onelines).toBe(true);
  });

});
