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
  it('Owner is msg sender', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.owner();
    }).then(function (result) {
      assert.equal(result, accounts[0]);
    });
  });
  it('Check end time equals 2018-01-31T23:59:59+00:00', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.endTime();
    }).then(function (result) {
      assert.equal(result, 1517443199);
    });
  });
  it('Discount equals 45%', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.bonusTokensPercent();
    }).then(function (result) {
      assert.equal(result, 45);
    });
  });
  it('calculateUSDcValue with view function for 0.2356151 Ether', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.calculateUSDcValue(0.2356151 * 1e18);
    }).then(function (result) {
      assert.equal(result, 30788);
    });
  });
  it('calculateTokenAmount with view function for 0.2356151 Ether (with bonus)', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.calculateTokenAmount(0.2356151 * 1e18);
    }).then(function (result) {
      assert.equal(result, 44642);
    });
  });
  it('Check rate equals initial', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rateUSDcETH();
    }).then(function (result) {
      assert.equal(result, 130671);
    });
  });
  it('Check weiRaised == 0', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.weiRaised();
    }).then(function (result) {
      assert.equal(result, 0);
    });
  });
  it('Non-owner prohibited to update rate', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(130672, {from: accounts[1]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Check rate equals initial', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rateUSDcETH();
    }).then(function (result) {
      assert.equal(result, 130671);
    });
  });
  it('Send less than 100 USD to fallback function', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.sendTransaction({value: 757627935808251, gas: 300000});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Send more than 100 USD to fallback function', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.sendTransaction({value: 76569678407350600, gas: 300000});
    }).then(function (result) {
      console.log(result);
      assert.equal(result['logs'][0]['event'], 'TokenPurchase');
    });
  });
  it('Owner updates rate in allowed limits +9%', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(142431);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'RateUpdate');
    });
  });
  it('Check rate after allowed update', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rateUSDcETH();
    }).then(function (result) {
      assert.equal(result, 142431);
    });
  });
  it('Owner updates rate in non-allowed limits +11%', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(158098);
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Rate shouldnt change after err. update', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rateUSDcETH();
    }).then(function (result) {
      assert.equal(result, 142431);
    });
  });
  it('Owner updates rate in allowed limits -9%', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(129612);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'RateUpdate');
    });
  });
  it('Check rate after approved update', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rateUSDcETH();
    }).then(function (result) {
      assert.equal(result, 129612);
    });
  });
  it('Owner updates rate in non-allowed limits -11%', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.setRate(115354);
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Rate shouldnt change after err. update', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.rateUSDcETH();
    }).then(function (result) {
      assert.equal(result, 129612);
    });
  });
});

/*
*/