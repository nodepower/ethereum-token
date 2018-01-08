//var NodeToken = artifacts.require('NodeToken');
var PreITOCrowdSale = artifacts.require("PreITOCrowdSale");

contract('PreITOCrowdSale', function (accounts) {
  it('Phases provisioned successfully', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.totalPhases();
    }).then(function (result) {
      assert.equal(result, 3, 'should contain 3 phases');
    });
  });
});

/*
*/