// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    uint256 private count;

    constructor(uint256 initialCount) {
        count = initialCount;
    }

    function increment() public {
        count += 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}

// Deployed to: 0xE722D9654973a131AEe6dFB84F29e8DfB202e6c7
// Transaction hash: 0x92eedb82ba92fdb4b7c225deefb046e559f578094c17e89eb25713f83de5e228