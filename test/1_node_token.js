var NodeToken = artifacts.require('NodeToken');

contract('NodeToken', function (accounts) {
  it('Owner can\'t mint tokens to himself until it added to minters', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 10000);
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Owner can mint tokens to non-owners', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.mint(accounts[1], 500);
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Non-owner can\'t mint tokens', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 10000, {from: accounts[9]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Non-owner can\'t add owners', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.addOwner(accounts[1], {from: accounts[9]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Owner can add other owners', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.addOwner(accounts[1]);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'OwnerAdded');
    });
  });
  it('New owner can add other owners', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.addOwner(accounts[2], {from: accounts[1]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'OwnerAdded');
    });
  });
  it('Non-owner still can\'t mint tokens', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 10000, {from: accounts[9]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('First owner still can\'t mint tokens', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 10000, {from: accounts[0]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Second owner still can\'t mint tokens', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 10000, {from: accounts[1]});
    }).catch(function (error) {
      assert.isAbove(error.message.search('VM Exception while processing transaction'), -1, 'revert must be returned')
    });
  });
  it('Second owner can add first owner as minter', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.addMinter(accounts[0], {from: accounts[1]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'MinterAdded');
    });
  });
  it('First owner can add non-owner account_2 as minter', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.addMinter(accounts[2], {from: accounts[0]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'MinterAdded');
    });
  });
  it('First owner 0 now able to mint to himself', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.mint(accounts[0], 12345, {from: accounts[0]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Mint');
    });
  });
  it('First owner 0 balance equals to just-minted value', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.balanceOf(accounts[0]);
    }).then(function (result) {
      assert.equal(result, 12345);
    });
  });
  it('TokenHolder 0 can transfer tokens to another account 9', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.transfer(accounts[9], 4000);
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Transfer');
    });
  });
  it('New Holder9 can transfer tokens to another holder 8', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.transfer(accounts[8], 3000,{from: accounts[9]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Transfer', 'Incorrect result of transfer');
    });
  });
  // ToDo overspend tests
  it('Check resulting balance for account', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function (result) {
      assert.equal(result, 8345, 'Incorrect account balance');
    });
  });
  it('Burn tokens', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.burn(5345, {from: accounts[0]});
    }).then(function (result) {
      assert.equal(result['logs'][0]['event'], 'Burn', 'Incorrect result of burning');
    });
  });
  it('Check balance after burning', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function (result) {
      assert.equal(result, 3000, 'Incorrect account balance');
    });
  });
  it('Check resulting totalSupply', function () {
    return NodeToken.deployed().then(function (instance) {
      return instance.totalSupply();
    }).then(function (result) {
      assert.equal(result, 7000, 'Incorrect totalSupply');
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