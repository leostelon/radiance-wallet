// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault {
    mapping(address => uint256) public balance;
    mapping(address => bool) public withdrawn;
    mapping(address => uint256) public timing;

    mapping(address => mapping(uint256 => Slot)) public slot;
    mapping(address => uint256) public current_slot;
    mapping(address => uint256) public total_balance;
    mapping(address => uint256) public withdrawal_balance;

    constructor() {}

    struct Slot {
        uint256 id;
        bool withdrawn;
        uint256 expire_at;
        uint256 balance;
    }

    function withdraw() public {
        require(block.timestamp >= timing[msg.sender], "Can't withdraw now!");
        (bool sent, ) = payable (msg.sender).call{value: balance[msg.sender]}("");
        require(sent, "Unable to withdraw");
        withdrawn[msg.sender] = true;
    }

    function withdraw2() public {
        (bool sent, ) = payable (msg.sender).call{value: withdrawal_balance[msg.sender]}("");
        require(sent, "Unable to withdraw");
        total_balance[msg.sender] -= withdrawal_balance[msg.sender];
        withdrawal_balance[msg.sender] = 0;
    }

    function deposit(uint256 _timing) public payable {
        require(msg.value > 0, "Please send more than 0.");
        balance[msg.sender] += msg.value;
        if(withdrawn[msg.sender]) {
            withdrawn[msg.sender] = false;
        }
        timing[msg.sender] = _timing;
    }

    function deposit2(uint256 _expire_at) public payable {
        require(msg.value > 0, "Please send more than 0.");

        // Update current slot number
        if(block.timestamp >= _expire_at) {
            current_slot[msg.sender] += 1;
        }

        // Slot updates
        uint256 current_slot_number = current_slot[msg.sender];
        Slot memory sd = slot[msg.sender][current_slot_number];
        sd.balance += msg.value;
        sd.expire_at = _expire_at;
        // Update withdrawal balance
        if(block.timestamp >= _expire_at) {
            withdrawal_balance[msg.sender] += slot[msg.sender][current_slot_number - 1].balance;
        }
        // End Slot update
        
        total_balance[msg.sender] += msg.value;
    }

    function time() view external returns(uint256) {
        return block.timestamp;
    }
}