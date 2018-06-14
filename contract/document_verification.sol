pragma solidity ^0.4.21;

contract DocumentVerification {

  address public owner;
  uint public numDocHash;


  struct docOwner {
    address docOwnerAddress;
    string docHash;
    uint registeredDate;
  }

  struct docAESOwner {
    address docAESOwnerAddress;
    string base64Message;
    uint registeredAESDate;
  }

  mapping (address => docOwner) public hashToAddress;
  mapping (address => docAESOwner) public addressToBase64;

  function DocumentVerification() public{
    owner=msg.sender;
    numDocHash=0;
  }


  function addHash(string _hash) public {
    require(hashToAddress[msg.sender].docOwnerAddress == 0 || hashToAddress[msg.sender].docOwnerAddress == msg.sender);

    hashToAddress[msg.sender].docOwnerAddress=msg.sender;
    hashToAddress[msg.sender].docHash=_hash;
    hashToAddress[msg.sender].registeredDate=now;
    numDocHash++;
  }


  function addBase64(string _encDoc) public {
    require(addressToBase64[msg.sender].docAESOwnerAddress==msg.sender || addressToBase64[msg.sender].docAESOwnerAddress==0);

    addressToBase64[msg.sender].docAESOwnerAddress = msg.sender;
    addressToBase64[msg.sender].base64Message = _encDoc;
    addressToBase64[msg.sender].registeredAESDate = now;
  }




}
