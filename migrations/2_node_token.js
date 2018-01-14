var NodeToken = artifacts.require("NodeToken");
var NodeCrowdsale = artifacts.require("NodeCrowdsale");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(NodeToken);
  NodeToken.deployed().then(function (nToken) {
      console.log("##########" + nToken.address);
      deployer.deploy(NodeCrowdsale, nToken.address, 130671).then(function(){
      NodeCrowdsale.deployed().then(function (nCS) {
        console.log("##########" + nCS.address);
        nToken.addMinter(nCS.address);
      })
    })
    })
};
