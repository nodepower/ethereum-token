var NodeCrowdSale = artifacts.require("NodeCrowdSale");
var datetime = require('unix-timestamp');
var phase45PercentStart = datetime.fromDate("2018-01-15T00:00:00Z");
var phase45PercentEnd = datetime.fromDate("2018-01-31T23:59:59Z");
console.log("45% period:", (phase45PercentEnd-phase45PercentStart)/60/60/24);
var phase40PercentStart = datetime.fromDate("2018-02-01T00:00:00Z");
var phase40PercentEnd = datetime.fromDate("2018-02-14T23:59:59Z");
console.log("40% period:", (phase40PercentEnd-phase40PercentStart)/60/60/24);
var phase30PercentStart = datetime.fromDate("2018-02-15T00:00:00Z");
var phase30PercentEnd = datetime.fromDate("2018-02-24T23:59:59Z");
console.log("30% period:", (phase30PercentEnd-phase30PercentStart)/60/60/24);
var phase20PercentStart = datetime.fromDate("2018-02-25T00:00:00Z");
var phase20PercentEnd = datetime.fromDate("2018-03-06T23:59:59Z");
console.log("20% period:", (phase20PercentEnd-phase20PercentStart)/60/60/24);
var phase15PercentStart = datetime.fromDate("2018-03-07T00:00:00Z");
var phase15PercentEnd = datetime.fromDate("2018-03-16T23:59:59Z");
console.log("15% period:", (phase15PercentEnd-phase15PercentStart)/60/60/24);
var phase10PercentStart = datetime.fromDate("2018-03-17T00:00:00Z");
var phase10PercentEnd = datetime.fromDate("2018-03-26T23:59:59Z");
console.log("10% period:", (phase10PercentEnd-phase10PercentStart)/60/60/24);
var phase00PercentStart = datetime.fromDate("2018-03-27T00:00:00Z");
var phase00PercentEnd = datetime.fromDate("2018-04-16T00:00:00Z");
console.log("00% period:", (phase00PercentEnd-phase00PercentStart)/60/60/24);

module.exports = function(deployer) {
  deployer.deploy(NodeCrowdSale, '0x123', '0x456', 100, [phase45PercentStart,phase45PercentEnd,45,phase40PercentStart,phase40PercentEnd,40]);
};
