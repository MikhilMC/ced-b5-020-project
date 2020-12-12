const DogChain = artifacts.require('DogChain');

module.exports = function (deployer) {
    deployer.deploy(DogChain);
}