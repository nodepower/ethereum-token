var NodeToken = artifacts.require('NodeToken');
var NodeCrowdsale = artifacts.require("NodeCrowdsale");

contract('NodeCrowdsale', function (accounts) {
  it('Correct wallet collecting ethers', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.wallet();
    }).then(function (result) {
      assert.equal(result, accounts[0]);
    });
  });
  it('Check rate equals initial', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rate();
    }).then(function (result) {
      assert.equal(result, 14534);
    });
  });
  it('Non-owner prohibited to update rate', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(14539, {from: accounts[1]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Check rate equals initial', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rate();
    }).then(function (result) {
      assert.equal(result, 14534);
    });
  });
  it('Owner updates rate in allowed limits +9%', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(15843);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'RateUpdate');
    });
  });
  it('Check rate after approved update', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rate();
    }).then(function (result) {
      assert.equal(result, 15843);
    });
  });
  it('Owner updates rate in non-allowed limits +11%', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(17586);
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Rate shouldnt change after err. update', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rate();
    }).then(function (result) {
      assert.equal(result, 15843);
    });
  });
});

/*
*/