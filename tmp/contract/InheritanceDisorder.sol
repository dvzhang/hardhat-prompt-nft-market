// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ownable {
    address owner = msg.sender;
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}

contract KingOfTheHill is Ownable {
    address public owner;
    uint256 jackpot;

    function deposit() public payable {
        if (msg.value > jackpot) owner = msg.sender;
        jackpot += msg.value;
    }

    function takeAll() public onlyOwner {
        msg.sender.transfer(this.balance);
        jackpot = 0;
    }
}
