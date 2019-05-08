// src/main.js
?
// Loads nearlib and this contract into nearplace scope.
let self = this;

let owner;
let newOwner;
let symbol;
let  name;
let decimals;
 let _totalSupply;


	Hashtable<String, Integer> balances=new Hashtable<String, Integer>();

    Hashtable<String, Integer> balances=new Hashtable<String, Integer>();


async function doInitContract() {
  const config = await nearlib.dev.getConfig();
  console.log("nearConfig", config);
  self.nearplace.near = await nearlib.dev.connect();
?
  self.nearplace.contract = await self.nearplace.near.loadContract(config.contractName, {

    sender: nearlib.dev.myAccountId
  });
?

  self.nearplace.timedOut = false;
  const timeOutPeriod = 10 * 60 * 1000; // 10 min
  setInterval(() => { self.nearplace.timedOut = true; }, timeOutPeriod);
}
// ----------------------------------------------------------------------------

    function safeAdd(uint a, uint b) public pure returns (uint c) {
	if (c >= a){
        c = a + b;
	}
}

    function safeSub(uint a, uint b) public pure returns (uint c) {
        if (b <= a) {
        c = a - b;
    }

    function safeMul(uint a, uint b) public pure returns (uint c) {
	if (a == 0 || c / a == b){
        c = a * b;
    }

    function safeDiv(uint a, uint b) public pure returns (uint c) {

        if (b > 0) {
        c = a / b;
	}
}



// ----------------------------------------------------------------------------

async function ERC20Interface {

    function totalSupply() public constant returns (uint);

    function balanceOf(tokenOwner) public constant returns (int balance);

    function allowance(tokenOwner, spender) public constant returns (int remaining);

    function transfer(to, int tokens) public returns (bool success);

    function approve(spender, int tokens) public returns (bool success);

    function transferFrom(from, to, int tokens) public returns (bool success);



    async function Transfer(indexed from, indexed to, int tokens);

    async function Approval(indexed tokenOwner, indexed spender, int tokens);

}





// ----------------------------------------------------------------------------

// Contract function to receive approval and execute function in one call

//

// Borrowed from MiniMeToken

// ----------------------------------------------------------------------------

async function ApproveAndCallFallBack {

    function receiveApproval(from, int tokens, token, bytes data) public;

}





// ----------------------------------------------------------------------------

// Owned contract

// ----------------------------------------------------------------------------

    async OwnershipTransferred(indexed _from, indexed _to);



    function Owned() public {

        owner = sender;

    }

    function transferOwnership(_newOwner) public onlyOwner {

        newOwner = _newOwner;

    }

    function acceptOwnership() public {

        if(sender == newOwner);

        OwnershipTransferred(owner, newOwner);

        owner = newOwner;

        newOwner = address(0);

    }





// ----------------------------------------------------------------------------

// ERC20 Token, with the addition of symbol, name and decimals and assisted

// token transfers

// ----------------------------------------------------------------------------

    // Constructor

    // ------------------------------------------------------------------------

    function ClavoToken() public {

        symbol = "CLV";

        name = "Clavo Token";

        decimals = 18;

        _totalSupply = 100000000000000000000000000000;

        balances[0xd2e38a00798ae66fd633ce96c4f37091a8ee563f] = _totalSupply;

        Transfer(address(0), 0xd2e38a00798ae66fd633ce96c4f37091a8ee563f, _totalSupply);

    }





    // ------------------------------------------------------------------------

    // Total supply

    // ------------------------------------------------------------------------

    function totalSupply() public constant {

        return _totalSupply  - balances[0];

    }





    // ------------------------------------------------------------------------

    // Get the token balance for account tokenOwner

    // ------------------------------------------------------------------------

    function balanceOf(tokenOwner) public constant {

        return balances[tokenOwner];

    }


    // ------------------------------------------------------------------------

    function transfer(to, int tokens){

        balances[sender] = safeSub(balances[sender], tokens);

        balances[to] = safeAdd(balances[to], tokens);

        Transfer(sender, to, tokens);

        return true;

    }

    // ------------------------------------------------------------------------

    function approve(spender, int tokens) {

        allowed[sender][spender] = tokens;

        Approval(sender, spender, tokens);

        return true;

    }





    // ------------------------------------------------------------------------

    // Transfer tokens from the from account to the to account

    // 

    // The calling account must already have sufficient tokens approve(...)-d

    // for spending from the from account and

    // - From account must have sufficient balance to transfer

    // - Spender must have sufficient allowance to transfer

    // - 0 value transfers are allowed

    // ------------------------------------------------------------------------

    function transferFrom(from, to, int tokens) {

        balances[from] = safeSub(balances[from], tokens);

        allowed[from][sender] = safeSub(allowed[from][sender], tokens);

        balances[to] = safeAdd(balances[to], tokens);

        Transfer(from, to, tokens);

        return true;

    }





    // ------------------------------------------------------------------------

    // Returns the amount of tokens approved by the owner that can be

    // transferred to the spender's account

    // ------------------------------------------------------------------------

    function allowance(tokenOwner, spender) public constant returns (int remaining) {

        return allowed[tokenOwner][spender];

    }





    // ------------------------------------------------------------------------

    // Token owner can approve for spender to transferFrom(...) tokens

    // from the token owner's account. The spender contract function

    // receiveApproval(...) is then executed

    // ------------------------------------------------------------------------

    function approveAndCall(spender, int tokens, bytes data) {

        allowed[sender][spender] = tokens;

        Approval(sender, spender, tokens);

        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);

        return true;

    }

    // ------------------------------------------------------------------------

    function () public payable {

        revert();

    }





    // ------------------------------------------------------------------------

    // Owner can transfer out any accidentally sent ERC20 tokens

    // ------------------------------------------------------------------------

    function transferAnyERC20Token(tokenAddress, int tokens) public {

        return ERC20Interface(tokenAddress).transfer(owner, tokens);

    }