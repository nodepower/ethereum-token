pragma solidity ^0.4.18;

import './math/SafeMath.sol';
import './NodeToken.sol';

/**
 * @title Crowdsale
 * @dev Crowdsale is a base contract for managing a token crowdsale.
 * Crowdsales have a start and end timestamps, where investors can make
 * token purchases and the crowdsale will assign them tokens based
 * on a token per ETH rate. Funds collected are forwarded to a wallet
 * as they arrive.
 */
contract NodeCrowdsale {
    using SafeMath for uint256;

    // The token being sold
    NodeToken public token;

    // address where funds are collected
    address public wallet;

    // address where funds are collected
    address public owner;

    // USD cents per ETH exchange rate
    uint256 public rate;

    // PreITO discount is 45%
    uint public constant bonus = 45;

    // PreITO ends on 2018-01-31 23:59:59 UTC
    uint256 public constant endTime = 1517443199;


    // amount of raised money in wei
    uint256 public weiRaised;

    /**
     * event for token purchase logging
     * @param purchaser who paid for the tokens
     * @param beneficiary who got the tokens
     * @param value weis paid for purchase
     * @param amount amount of tokens purchased
     */
    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
    event RateUpdate(uint256 rate);

    function NodeCrowdsale(address _token, uint256 _rate) public {
        require(_token != address(0));
        token = NodeToken(_token);
        rate = _rate;
        wallet = msg.sender;
        owner = msg.sender;
    }


    // fallback function can be used to buy tokens
    function () external payable {
        buyTokens(msg.sender);
    }

    // low level token purchase function
    function buyTokens(address beneficiary) public payable {
        require(beneficiary != address(0));
        require(msg.value != 0);
        require(now <= endTime);

        uint256 weiAmount = msg.value;

        // calculate token amount to be created
        uint256 tokens = weiAmount.mul(rate);

        // update state
        weiRaised = weiRaised.add(weiAmount);

        token.mint(beneficiary, tokens);
        TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

        forwardFunds();
    }

    // set rate
    function setRate(uint256 _rate) public onlyOwner {
        // don't allow to change rate more than 10%
        assert(_rate < rate.mul(110).div(100));
        assert(_rate > rate.mul(90).div(100));
        rate = _rate;
        RateUpdate(rate);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // send ether to the fund collection wallet
    // override to create custom fund forwarding mechanisms
    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }



}
