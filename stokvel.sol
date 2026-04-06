//SPDX-License-Identifier: MIT

pragma solidity 0.8.18; // this is the solidity version , 

contract savingCircle {
    uint256 public constant Contribution_amount = 0.001 ether;
    uint256 public maxMembers; // members in the saving circle
    uint256 public payOutAmount; // total payout per cycle 
    address[] public members; 

    struct contributor{
        bool isMemberActive;
        bool didMemberPay;
    }

    constructor(uint256 _maxMembers){
        maxMembers = _maxMembers;
        payOutAmount = Contribution_amount * _maxMembers;
    }




}   