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


	it("should transfer 100 SToken in the first account", async () => {
    const STokenInstance = await SToken.deployed();
		let transfer = await STokenInstance.transfer(accounts[1],100);

    let balance_one = await STokenInstance.balanceOf.call(accounts[1]);
    assert.equal(balance_one.toString(), "100", "100 not correctly transfered");
  });

	it("should put 10 SToken in the second account", async () => {
    const STokenInstance = await SToken.deployed();
    console.log(accounts[1]);
		console.log(accounts[2]);

		//let transfer = await STokenInstance.transfer(accounts[1],100);
    let approve = await STokenInstance.approve(accounts[1], 10);
    let all = await STokenInstance.allowance.call(accounts[0], accounts[1]);

    let balance_one = await STokenInstance.balanceOf.call(accounts[1]);
		console.log(balance_one.toString());
	  let transfer_two= await STokenInstance.transferFrom(accounts[0], accounts[2], 10, {from: accounts[1]});

    let balance_one_after_transfer = await STokenInstance.balanceOf.call(accounts[1]);
		console.log(balance_one_after_transfer.toString());
    let balance_two = await STokenInstance.balanceOf.call(accounts[2]);

		console.log(balance_two.toString());
    assert.equal(balance_one.toString(),"100", "100 wasn't in the first account");
    assert.equal(balance_two.toString(),"10", "10 wasn't in the second account");
    assert.equal(balance_one_after_transfer.toString(),"90", "90 wasn't in the first account");
  });
	/*
	it("should send coin correctly", async () => {
    const STokenInstance = await SToken.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (
      await STokenInstance.balanceOf.call(accountOne)
    ).toNumber();
    const accountTwoStartingBalance = (
      await STokenInstance.balanceOf.call(accountTwo)
    ).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await STokenInstance.transferFrom(accountOne,accountTwo, amount);

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (
      await STokenInstance.balanceOf.call(accountOne)
    ).toNumber();
    const accountTwoEndingBalance = (
      await STokenInstance.balanceOf.call(accountTwo)
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
	*/
});
