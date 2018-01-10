//var NodeToken = artifacts.require('NodeToken');
var PreITOCrowdSale = artifacts.require("PreITOCrowdSale");
var datetime = require('unix-timestamp');
var phase45PercentStart = datetime.fromDate("2018-01-15T00:00:00Z");
var phase45PercentEnd = datetime.fromDate("2018-01-31T23:59:59Z");
var phase40PercentStart = datetime.fromDate("2018-02-01T00:00:00Z");
var phase40PercentEnd = datetime.fromDate("2018-02-14T23:59:59Z");

contract('PreITOCrowdSale', function (accounts) {
  it('Phases provisioned successfully', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.totalPhases();
    }).then(function (result) {
      assert.equal(result, 2, 'should contain 2 phases');
    });
  });
  it('getBonusPercentByTime reverts before start', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.getBonusPercentByTime(phase45PercentStart-1);
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('getBonusPercentByTime returns 45% if just started', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.getBonusPercentByTime(phase45PercentStart);
    }).then(function (result) {
      assert.equal(result, 45);
    });
  });
  it('getBonusPercentByTime returns 45% before the phase end', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.getBonusPercentByTime(phase40PercentStart-1);
    }).then(function (result) {
      assert.equal(result, 45);
    });
  });
  it('getBonusPercentByTime returns 40% at the 2nd phase start', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.getBonusPercentByTime(phase40PercentStart+1000);
    }).then(function (result) {
      assert.equal(result, 40);
    });
  });
  it('getBonusPercentByTime returns 40% at the 2nd phase end', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.getBonusPercentByTime(phase40PercentEnd-1000);
    }).then(function (result) {
      assert.equal(result, 40);
    });
  });
  it('getBonusPercentByTime reverts after 2nd phase end', function () {
    return PreITOCrowdSale.deployed().then(function (instance) {
      return instance.getBonusPercentByTime(phase40PercentEnd+1);
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
});

/*
*/