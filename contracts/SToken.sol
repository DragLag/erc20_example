// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract STKCoin is ERC20 {
    address public admin;

    event Mint(uint _value);
    // Constructor code is only run when the contract
    // is created
    constructor() ERC20('SToken', 'STK'){
	_mint(msg.sender, 1000*10**18);
	admin = msg.sender;
	}	

    function mint(address to, uint amount) external {
       require(msg.sender == admin,'only admin'); 		
        _mint(to, amount);
	emit Mint(amount);
 	}

    function burn(uint amount) external {
      _burn(msg.sender, amount);
	}
}

