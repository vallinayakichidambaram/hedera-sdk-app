// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LiquidityPool {
    address private admin;
    mapping (address => uint256) private userDeposits;

    receive() external payable{}

    constructor() {
        admin = msg.sender;
    }

   //Modifier only admin
    modifier onlyAdmin () {
        require(msg.sender == admin, "Admin Only");
        _;
    }

   //Transfer function
    function depositToPool () public payable {
        require(msg.value > 0, "send value to transfer");
        require(msg.sender.balance > msg.value, "Insufficient Balance");
        //Tansfer to this contract
        (bool sent, ) = address(this).call{value: msg.value}("");
        require(sent, "Failed transaction");
        //Save the transfer in mapping
        userDeposits[msg.sender] = msg.value;

    }

   //Getter function - admin
    function getDepositAdmin (address _user) view external onlyAdmin returns (uint256) {
        return userDeposits[_user];
    }

   //Getter function - user
    function getDeposit () view public returns(uint256) {
        return userDeposits[msg.sender];
    }

   //Get balance of liquidity pool - balance(this.address)
    function getLiquidityPool() view external onlyAdmin returns(uint256) {
        return(address(this).balance);
    }
    
}