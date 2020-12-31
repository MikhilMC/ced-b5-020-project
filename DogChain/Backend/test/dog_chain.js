const DogChain = artifacts.require("DogChain");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("DogChain", function (/* accounts */) {
  it("should assert true", async function () {
    await DogChain.deployed();
    return assert.isTrue(true);
  });
});
