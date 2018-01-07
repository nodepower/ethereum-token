pragma solidity ^0.4.18;


import './token/StandardToken.sol';
import './token/CappedToken.sol';
import './token/DetailedERC20.sol';
import './token/BurnableToken.sol';
import './token/BasicToken.sol';

contract NodePowerToken is DetailedERC20 {

    function NodePowerToken() public {
        name = "NodePower";
        symbol = "NODE";
        decimals = 2;
    }

}
