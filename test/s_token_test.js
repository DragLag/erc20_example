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
		console.log("first account:" + accounts[0])
    console.log("second account:" + accounts[1]);
		console.log("third account:" +accounts[2]);

		//let transfer = await STokenInstance.transfer(accounts[1],100);
    let approve = await STokenInstance.approve(accounts[1], 10);
    let all = await STokenInstance.allowance.call(accounts[0], accounts[1]);
    
		let balance_0 = await STokenInstance.balanceOf.call(accounts[0]);
    let balance_1 = await STokenInstance.balanceOf.call(accounts[1]);
    let balance_2 = await STokenInstance.balanceOf.call(accounts[2]);
		console.log("balance 0:"+ balance_0.toString());
		console.log("balance 1:"+ balance_1.toString());
		console.log("balance 2:"+ balance_2.toString());

	  let transfer_two= await STokenInstance.transferFrom(accounts[0], accounts[2], 10, {from: accounts[1]});

    let balance_one_after_transfer = await STokenInstance.balanceOf.call(accounts[1]);

		let balance_0_1 = await STokenInstance.balanceOf.call(accounts[0]);
    let balance_1_1 = await STokenInstance.balanceOf.call(accounts[1]);
    let balance_2_1 = await STokenInstance.balanceOf.call(accounts[2]);
		console.log("balance 0:"+ balance_0_1.toString());
		console.log("balance 1:"+ balance_1_1.toString());
		console.log("balance 2:"+ balance_2_1.toString());

    let balance_two = await STokenInstance.balanceOf.call(accounts[2]);

		console.log(balance_two.toString());
    assert.equal(balance_1.toString(),"100", "100 wasn't in the first account");
    assert.equal(balance_2_1.toString(),"10", "10 wasn't in the second account");
    assert.equal(balance_1_1.toString(),"100", "100 wasn't in the first account");
  });


	it("test the refund with 10 SToken in the first account", async () => {
    const STokenInstance = await SToken.deployed();

    console.log("owner:" + accounts[0]);
    console.log("seller:" + accounts[5]);
		console.log("found:" + accounts[1]);

		//let transfer = await STokenInstance.transfer(accounts[1],100);
    let approve = await STokenInstance.approve(accounts[1], //spender
																								10); // amount
    let all = await STokenInstance.allowance.call(accounts[0], //owner
																									accounts[1]); //spender

    let balance_seller = await STokenInstance.balanceOf.call(accounts[5]);
		console.log("balance seller : "+balance_seller.toString());
	  let refound = await STokenInstance.transferFrom(accounts[0],//from 
																									accounts[5], //to
																									10, //amount
																									{from: accounts[1]}
																									);

    let balance_seller_after_transfer = await STokenInstance.balanceOf.call(accounts[5]);
		console.log("balance seller after refund:"+ balance_seller_after_transfer.toString());

    //assert.equal(balance_seller.toString(),"0", "10 wasn't in the second account");
    assert.equal(balance_seller_after_transfer.toString(),"10", "10 wasn't in the first account");
  });
});
