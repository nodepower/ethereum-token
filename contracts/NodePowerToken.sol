pragma solidity ^0.4.18;


import './token/BurnableToken.sol';
import './token/MintableToken.sol';
import './token/DetailedERC20.sol';

contract NodePowerToken is BurnableToken, MintableToken, DetailedERC20 {
    string public name = "NodePower";
    string public symbol = "NODE";
    uint8 public decimals = 2;
    function NodePowerToken()
    DetailedERC20(name, symbol, decimals)
    public
    {

    }

}
