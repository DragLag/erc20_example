pragma solidity ^0.8.5;
                           
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SToken.sol";
 
contract TestSToken {
 
  function testInitialBalanceUsingDeployedContract() public {
    SToken token  = SToken(DeployedAddresses.SToken());
 
    uint expected = 10000;
 
    Assert.equal(token.balanceOf(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceUsingDeployedContract_2() public {
    SToken token  = SToken();
 
    uint expected = 10000;
 
    Assert.equal(token.balanceOf(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }
}

