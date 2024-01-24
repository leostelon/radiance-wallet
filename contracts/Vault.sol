// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault {
    mapping(address => uint256) public balance;
    mapping(address => bool) public withdrawn;
    mapping(address => uint256) public timing;

    constructor() {}

    function withdraw() public {
        require(block.timestamp >= timing[msg.sender], "Can't withdraw now!");
        (bool sent, ) = payable (msg.sender).call{value: balance[msg.sender]}("");
        require(sent, "Unable to withdraw");
        withdrawn[msg.sender] = true;
        
    }

    function deposit(uint256 _timing) public payable {
        require(msg.value > 0, "Please send more than 0.");
        balance[msg.sender] += msg.value;
        if(withdrawn[msg.sender]) {
            withdrawn[msg.sender] = false;
        }
        timing[msg.sender] = _timing;
    }

    function time() view external returns(uint256) {
        return block.timestamp;
    }
}