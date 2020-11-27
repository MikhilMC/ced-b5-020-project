const CSRewards = artifacts.require("CSRewards");

module.exports = function (deployer) {
  deployer.deploy(CSRewards, 'CS Rewards', 'CSR', 0);
};