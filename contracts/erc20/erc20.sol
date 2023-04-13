// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TZToken8 is ERC20 {
    constructor(uint256 initialSupply) ERC20("TZToken8", "TZT8") {
        _mint(msg.sender, initialSupply);
    }
}