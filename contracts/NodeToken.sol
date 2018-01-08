pragma solidity ^0.4.18;


import './token/BurnableToken.sol';
import './token/MintableToken.sol';
import './token/DetailedERC20.sol';
import './ownership/Claimable.sol';

contract NodeToken is BurnableToken, MintableToken, DetailedERC20, Claimable {
    string public name = "NodePower";
    string public symbol = "NODE";
    uint8 public decimals = 2;
    function NodeToken()
    DetailedERC20(name, symbol, decimals)
    public
    {

    }

}
