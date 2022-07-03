const Ballot = artifacts.require("Ballot");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Ballot", function (accounts) {
  it("should assert true", async function () {
    await Ballot.deployed();
    return assert.isTrue(true);
  });


	it("should transfer 100 SToken in the first account", async () => {
    const BallotInstance = await Ballot.deployed();

    assert.equal(BallotInstance.toString(), "true", " not correctly instant");
  });

});
