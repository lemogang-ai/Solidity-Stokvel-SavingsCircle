//SPDX-License-Identifier: MIT

pragma solidity 0.8.18; // this is the solidity version , 

contract savingCircle {
    uint256 public constant Contribution_amount = 0.001 ether;
    uint256 public maxMembers; // members in the saving circle
    uint256 public payOutAmount; // total payout per month
    uint256 public bucketAmount;
    uint256 public nextReceiverIndex = 0;
    address[] public members; 

    struct contributor{
        bool isMemberActive;
        bool didMemberPay;
    }

    mapping(address => contributor) public addressToContributor;

    constructor(uint256 _maxMembers){
        maxMembers = _maxMembers;
        payOutAmount = Contribution_amount * _maxMembers;
    }

    function joinCircle () public{
        require(members.length < maxMembers, "Circle is full");
        require(!addressToContributor[msg.sender].isMemberActive, "Already a member"); // check if member is active

        members.push(msg.sender);
        addressToContributor[msg.sender].isMemberActive = true;
    }

    function contribute() public payable {
        //my security guards
        require(addressToContributor[msg.sender].isMemberActive, "Join first!");
        require(msg.value == Contribution_amount, "Contribution amount is 0.001 ETH");
        require(!addressToContributor[msg.sender].didMemberPay, "Already paid"); // check if member has paid, message);

        bucketAmount += msg.value;
        addressToContributor[msg.sender].didMemberPay = true;

        if (bucketAmount >= payOutAmount){
            
            address payReceiver = members[nextReceiverIndex];

            bucketAmount = 0;

            //point to next month
            nextReceiverIndex++;

            if (nextReceiverIndex == maxMembers){
                nextReceiverIndex == 0; // loop back to the start of the circle 
            }

            for (uint256 i = 0; i < members.length; i ++){
                addressToContributor[members[i]].didMemberPay = false;
            }

            (bool success, ) = payable (payReceiver).call{value: address(this).balance}("");
            require(success, "Payout failed");  
    }
}