var NodeToken = artifacts.require("NodeToken");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(NodeToken);
};
