var NodePowerToken = artifacts.require('NodePowerToken');

contract('NodePowerToken', function (accounts) {
  it('Owner can mint tokens to himself', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 10000);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Mint', 'Incorrect result of minting');
      assert.equal(result['logs'][1]['event'], 'Transfer', 'Incorrect result of minting');
    });
  });
  it('Owner can mint tokens to non-owners', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.mint(accounts[1], 500);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Mint', 'Incorrect result of minting');
      assert.equal(result['logs'][1]['event'], 'Transfer', 'Incorrect result of minting');
    });
  });
  it('Non-owner can\'t mint tokens', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 10000, {from: accounts[1]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('TokenHolder can transfer tokens to another holder', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.transfer(accounts[1], 4000);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Transfer', 'Incorrect result of transfer');
    });
  });
  it('New TokenHolder can transfer tokens to another holder', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.transfer(accounts[2], 3000,{from: accounts[1]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Transfer', 'Incorrect result of transfer');
    });
  });
  it('Check resulting balance for account', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.balanceOf.call(accounts[1]);
    }).then(function (result) {
      assert.equal(result, 1500, 'Incorrect account balance');
    });
  });
  it('Burn tokens', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.burn(300, {from: accounts[1]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Burn', 'Incorrect result of burning');
    });
  });
  it('Check balance after burning', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.balanceOf.call(accounts[1]);
    }).then(function (result) {
      assert.equal(result, 1200, 'Incorrect account balance');
    });
  });
  it('Check resulting totalSupply', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.totalSupply();
    }).then(function (result) {
      assert.equal(result, 10200, 'Incorrect totalSupply');
    });
  });
  it('Owner can initiate transferOwnership', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.transferOwnership(accounts[3]);
    }).then(function (result) {
      assert.equal(result['receipt']['status'],1);
    });
  });
  it('Ownership not changed', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.owner();
    }).then(function (result) {
      assert.equal(result, accounts[0]);
    });
  });
  it('New owner claim ownership', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.claimOwnership({from: accounts[3]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'OwnershipTransferred');
    });
  });
  it('Ownership changed', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.owner();
    }).then(function (result) {
      assert.equal(result, accounts[3]);
    });
  });
  it('Non-owner can\'t initiate ownership transfer', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.transferOwnership(accounts[0],{from:accounts[2]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('claimOwnership doesnt operational without transferOwnership first', function () {
    return NodePowerToken.deployed().then(function (instance) {
      return instance.claimOwnership({from:accounts[0]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
});

/*
useful snippets for interactive use in truffle develop console
 NodePowerToken.deployed().then(function(instance) {return instance.totalSupply});
 NodePowerToken.deployed().then(function(instance) {return instance.mint(web3.eth.accounts[0], 10000)});
 NodePowerToken.deployed().then(function(instance) {return instance.mint(web3.eth.accounts[1], 10000, {from: web3.eth.accounts[1]})});
NodePowerToken.deployed().then(function(instance) {return instance.owner()});
NodePowerToken.deployed().then(function(instance) {return instance.mintingFinished()});
NodePowerToken.deployed().then(function(instance) {return instance.finishMinting()});
NodePowerToken.deployed().then(function(instance) {return instance.mint(web3.eth.accounts[0], 10000)});
NodePowerToken.deployed().then(function(instance) {return instance.balanceOf.call(web3.eth.accounts[0])});
*/