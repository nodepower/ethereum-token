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
      return instance.owners.call(accounts[0]);
    }).then(function (result) {
      assert.equal(result, true);
    });
  });
  it('Discount equals 0% before 0 phase', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.getBonusPercent(1514000000);
      }).then(function (result) {
          assert.equal(result, 0);
      });
  });
  it('Discount equals 45% for 0 phase', function () {
    return NodeCrowdsale.deployed().then(function (instance) {
      return instance.getBonusPercent(1517443000);
    }).then(function (result) {
      assert.equal(result, 45);
    });
  });
  it('Discount equals 40% for 1 phase', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.getBonusPercent(1518652000);
      }).then(function (result) {
          assert.equal(result, 40);
      });
  });
  it('Discount equals 30% for 2 phase', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.getBonusPercent(1518652800);
      }).then(function (result) {
          assert.equal(result, 30);
      });
  });
  it('Discount equals 20% for 3 phase', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.getBonusPercent(1520000000);
      }).then(function (result) {
          assert.equal(result, 20);
      });
  });
  it('Discount equals 15% for 4 phase', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.getBonusPercent(1521000000);
      }).then(function (result) {
          assert.equal(result, 15);
      });
  });
  it('Discount equals 10% for 5 phase', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.getBonusPercent(1522000000);
      }).then(function (result) {
          assert.equal(result, 10);
      });
  });
  it('Discount equals 0% after 5 phase', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.getBonusPercent(1523000000);
      }).then(function (result) {
          assert.equal(result, 0);
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
      return instance.calculateTokenAmount(0.2356151 * 1e18, 45);
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
  it('Non-owner prohibited to update bots list', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.addBot(accounts[1], {from: accounts[1]});
      }).catch(function (error) {
          assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
      });
  });
  it('Owner adds Acc1 as the bot', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.addBot(accounts[1]);
      }).then(function (result) {
          assert.equal(result['logs'][0]['event'], 'BotAdded');
      });
  });
  it('Bot updates rate in allowed limits +9%', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.setRate(141276, {from: accounts[1]});
      }).then(function (result) {
          assert.equal(result['logs'][0]['event'], 'RateUpdate');
      });
  });
  it('Check rate after allowed update', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.rateUSDcETH();
      }).then(function (result) {
          assert.equal(result, 141276, {from: accounts[1]});
      });
  });
  it('Owner removes himself from bots list', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.delBot(accounts[0]);
      }).then(function (result) {
          assert.equal(result['logs'][0]['event'], 'BotRemoved');
      });
  });
  it('Just removed bot (Ex-owner) prohibited to update rate', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.setRate(141277);
      }).catch(function (error) {
          assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
      });
  });
  it('Check rate didnt change after err. update', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.rateUSDcETH();
      }).then(function (result) {
          assert.equal(result, 141276);
      });
  });
  it('Non-owner prohibited to update wallet', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.setWallet(accounts[3], {from: accounts[1]});
      }).catch(function (error) {
          assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
      });
  });
  it('Wallet collecting ethers not changed after err update', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.wallet();
      }).then(function (result) {
          assert.equal(result, accounts[0]);
      });
  });
  it('Owner is able to update wallet', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.setWallet(accounts[3]);
      }).then(function (result) {
          assert.equal(result['logs'][0]['event'], 'WalletSet');
      });
  });
  it('Wallet collecting ethers changed after update by Owner', function () {
      return NodeCrowdsale.deployed().then(function (instance) {
          return instance.wallet();
      }).then(function (result) {
          assert.equal(result, accounts[3]);
      });
  });
});

/*
*/