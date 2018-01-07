var NodePowerToken = artifacts.require("NodePowerToken");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(NodePowerToken);
};
