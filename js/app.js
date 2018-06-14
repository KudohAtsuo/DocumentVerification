if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


var abi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "addressToBase64", "outputs": [ { "name": "docAESOwnerAddress", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "base64Message", "type": "string", "value": "" }, { "name": "registeredAESDate", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numDocHash", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x3b13e4513aac5ac3efec497926e8dca71e6ba7b4" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_hash", "type": "string" } ], "name": "addHash", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "hashToAddress", "outputs": [ { "name": "docOwnerAddress", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "docHash", "type": "string", "value": "" }, { "name": "registeredDate", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_encDoc", "type": "string" } ], "name": "addBase64", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];

var myContractAddress = "0xC638eEe34B6e8B82D89B3f6FdF2a9A36b4b26be7";
var myContractInstance;

myContractInstance = web3.eth.contract(abi).at(myContractAddress);

$("#c_address").html(myContractAddress);

var documentNumber;

myContractInstance.numDocHash(function(error, result){
  if(!error){
    console.log(result);
    documentNumber=result.toString();
    $("#d_number").html(documentNumber);
  }else{
    console.log(error);
  }
});



web3.eth.getAccounts(function(error, result){
  if(!error){
    baseAccount=result[0];
    $("#cb_address").html(result[0]);
    web3.eth.getBalance(result[0], function(error, balance){
      if(!error){
        $("#cb_balance").html(web3.fromWei(balance.toString(), "ether"));
      }else{
        console.log(error);
      }
    });
  }else{
    console.log(error);
  }
});



var textResult;

$("#myfile").on("change", function(event){
  var file = event.target.files;
  var reader = new FileReader;
  reader.readAsText(file[0]);

  reader.onload = function(){
    textResult = reader.result;
    console.log(textResult);
    var hash = CryptoJS.SHA256(textResult);
    console.log(hash);
    console.log(hash.toString());
    console.log(hash.toString(CryptoJS.enc.Base64));
    $("#hashvalue").html(hash.toString(CryptoJS.enc.Base64));
  }
});




function addingHash() {
  web3.eth.getAccounts(function(error, result){
    if(!error){
      myContractInstance.addHash.sendTransaction($("#hashvalue").text(), {from:result[0]}, function(error, result){
      if(!error){
        console.log(result);
      }else{
        console.log(error);
      }
    });
  }else{
    console.log(error);
  }
});
}


function showHash(){
  web3.eth.getAccounts(function(error, result){
    if(!error){
      console.log(result);
      myContractInstance.hashToAddress(result[0], function(error, _date){
        if(!error){
          console.log(result);
          console.log(_date[2].toNumber());
          var uTime = new Date(_date[2].toNumber() * 1000);
          var utcTime = uTime.toUTCString();
          $("#registerdate").html(utcTime);
          myContractInstance.hashToAddress(result[0], function(error, _owner) {
            if(!error){
              console.log(result);
              console.log(_owner[0]);
              $("#docowner").html(_owner[0]);
              myContractInstance.hashToAddress(result[0], function(error, _hash){
                if(!error){
                  console.log(_hash[1]);
                  $("#dochash").html(_hash[1]);
                }else{
                  console.log(error);
                }
              });
            }else{
              console.log(error);
            }
          });
        }else{
          console.log(error);
        }
      });
    }else{
      console.log(error);
    }
  });
}
