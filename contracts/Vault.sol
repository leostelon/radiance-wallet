// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Vault {
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
        (bool sent, ) = payable (msg.sender).call{value: withdrawal_balance[msg.sender]}("");
        require(sent, "Unable to withdraw");
        total_balance[msg.sender] -= withdrawal_balance[msg.sender];
        withdrawal_balance[msg.sender] = 0;
    }

    function deposit(uint256 _expire_at) public payable {
        require(msg.value > 0, "Please send more than 0.");

        // Slot updates
        uint256 current_slot_number = current_slot[msg.sender];
        Slot storage currentSlot = slot[msg.sender][current_slot_number];

        // Update current slot number
        if(_expire_at > currentSlot.expire_at) {
            if(currentSlot.expire_at != 0) {
                current_slot[msg.sender] += 1;
            }
        }

        // Update withdrawal balance
        if(_expire_at > currentSlot.expire_at) {
            if(current_slot[msg.sender] != 0) {
                withdrawal_balance[msg.sender] += slot[msg.sender][current_slot[msg.sender] - 1].balance;
            }
        }
        currentSlot = slot[msg.sender][current_slot[msg.sender]];
        currentSlot.expire_at = _expire_at;
        currentSlot.balance += msg.value;
        // End Slot update
        
        total_balance[msg.sender] += msg.value;
    }

    function time() view external returns(uint256) {
        return block.timestamp;
    }
}