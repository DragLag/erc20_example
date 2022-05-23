pragma solidity >=0.4.25 ;
                            
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TestCoin.sol";
 
contract TestTestCoin {
 
  function testInitialBalanceUsingDeployedContract() public {
    TestCoin meta = TestTK(DeployedAddresses.TestCoin());
 
    uint expected = 10000;
 
    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    TestCoin meta = new TestTK(); 

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 TestCoin initially");
  }
 
}

