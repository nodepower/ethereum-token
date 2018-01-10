var PreITOCrowdSale = artifacts.require("PreITOCrowdSale");
var datetime = require('unix-timestamp');
var phase45PercentStart = datetime.fromDate("2018-01-15T00:00:00Z");
var phase45PercentEnd = datetime.fromDate("2018-01-31T23:59:59Z");
var phase40PercentStart = datetime.fromDate("2018-02-01T00:00:00Z");
var phase40PercentEnd = datetime.fromDate("2018-02-14T23:59:59Z");
console.log(phase45PercentStart);
console.log(phase45PercentEnd);
console.log(phase40PercentStart);
console.log(phase40PercentEnd);

module.exports = function(deployer) {
  deployer.deploy(PreITOCrowdSale, [phase45PercentStart,phase45PercentEnd,45,phase40PercentStart,phase40PercentEnd,40]);
};
