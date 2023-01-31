// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Escrow.sol";

contract Manager {
    mapping(address => address[]) contractsByOwner;

    event NewEscrowCreated(address);

    function deployNewEscrow(
        address _arbiter,
        address _beneficiary
    ) public payable {
        Escrow escrow = new Escrow{value: msg.value}(
            _arbiter,
            _beneficiary,
            msg.sender
        );

        contractsByOwner[_arbiter].push(address(escrow));

        emit NewEscrowCreated(address(escrow));
    }

    function getContractsByOwner() public view returns (address[] memory) {
        return contractsByOwner[msg.sender];
    }
}
