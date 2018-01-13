var NodeToken = artifacts.require("NodeToken");
var NodeMinter01 = artifacts.require("NodeMinter01");
var NodeMinter02 = artifacts.require("NodeMinter02");
var NodeMinter03 = artifacts.require("NodeMinter03");
var NodeMinter04 = artifacts.require("NodeMinter04");

module.exports = function (deployer) {
  deployer.then(function () {
    return NodeToken.deployed();
  }).then(function (instance) {
    nodeToken = instance;
    deployer.deploy(NodeMinter01, instance.address).then(function (instance) {
      return NodeMinter01.deployed();
    }).then(function (instance) {
      nodeMinter01 = instance;
      //console.log(nodeMinter);
      nodeToken.addMinter(nodeMinter01.address).then(function (instance) {
        nodeMinter01.Mint().then(function (instance) {
          nodeToken.delMinter(nodeMinter01.address);
          console.log("Minted Stage 01");
        })
      })
    })
    // start Stage 02
    deployer.deploy(NodeMinter02, instance.address).then(function (instance) {
      return NodeMinter02.deployed();
    }).then(function (instance) {
      nodeMinter02 = instance;
      //console.log(nodeMinter);
      nodeToken.addMinter(nodeMinter02.address).then(function (instance) {
        nodeMinter02.Mint().then(function (instance) {
          nodeToken.delMinter(nodeMinter02.address);
          console.log("Minted Stage 02");
        })
      })
    })
    // End stage 02
    // start Stage 03
    deployer.deploy(NodeMinter03, instance.address).then(function (instance) {
      return NodeMinter03.deployed();
    }).then(function (instance) {
      nodeMinter03 = instance;
      //console.log(nodeMinter);
      nodeToken.addMinter(nodeMinter03.address).then(function (instance) {
        nodeMinter03.Mint().then(function (instance) {
          nodeToken.delMinter(nodeMinter03.address);
          console.log("Minted Stage 03");
        })
      })
    })
    // End stage 03
  })
}
