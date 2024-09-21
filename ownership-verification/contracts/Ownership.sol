// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownership {
    struct Commodity {
        uint id;
        address owner;
        string details;
    }

    mapping(uint => Commodity) public commodities;

    // Register a new commodity
    function registerCommodity(uint _id, string memory _details) public {
        commodities[_id] = Commodity(_id, msg.sender, _details);
    }

    // Transfer ownership of a commodity
    function transferOwnership(uint _id, address _newOwner) public {
        require(commodities[_id].owner != address(0), "Commodity does not exist");
        require(msg.sender == commodities[_id].owner, "Not the owner");
        commodities[_id].owner = _newOwner;
    }

    // Fetch details of a commodity
    function getCommodity(uint _id) public view returns (Commodity memory) {
        require(commodities[_id].owner != address(0), "Commodity does not exist");
        return commodities[_id];
    }
}
