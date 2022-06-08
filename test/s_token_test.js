const SToken = artifacts.require("SToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SToken", function (accounts) {
  it("should assert true", async function () {
    await SToken.deployed();
    return assert.isTrue(true);
  });

	it("should put 10000 SToken in the first account", async () => {
    const STokenInstance = await SToken.deployed();
    const balance = await STokenInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
	
	it("should send coin correctly", async () => {
    const STokenInstance = await SToken.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (
      await STokenInstance.getBalance.call(accountOne)
    ).toNumber();
    const accountTwoStartingBalance = (
      await STokenInstance.getBalance.call(accountTwo)
    ).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await STokenInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (
      await STokenInstance.getBalance.call(accountOne)
    ).toNumber();
    const accountTwoEndingBalance = (
      await STokenInstance.getBalance.call(accountTwo)
    ).toNumber();

    assert.equal(
      accountOneEndingBalance,
      accountOneStartingBalance - amount,
      "Amount wasn't correctly taken from the sender"
    );
    assert.equal(
      accountTwoEndingBalance,
      accountTwoStartingBalance + amount,
      "Amount wasn't correctly sent to the receiver"
    );
  });
});
