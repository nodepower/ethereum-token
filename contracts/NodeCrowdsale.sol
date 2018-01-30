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

    // crowdsale administrators
    mapping (address => bool) public owners;

    // Rate updating bots
    mapping (address => bool) public bots;

    // USD cents per ETH exchange rate
    uint256 public rateUSDcETH;

    // PreITO discount is 45%
    uint public constant bonusTokensPercent = 45;

    // PreITO ends on 2018-01-31 23:59:59 UTC
    uint256 public constant endTime = 1517443199;

    // Minimum Deposit in USD cents
    uint256 public constant minContributionUSDc = 1000;


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
    event WalletSet(address indexed wallet);
    event OwnerAdded(address indexed newOwner);
    event OwnerRemoved(address indexed removedOwner);
    event BotAdded(address indexed newBot);
    event BotRemoved(address indexed removedBot);

    function NodeCrowdsale(address _tokenAddress, uint256 _initialRate) public {
        require(_tokenAddress != address(0));
        token = NodeToken(_tokenAddress);
        rateUSDcETH = _initialRate;
        wallet = msg.sender;
        owners[msg.sender] = true;
        bots[msg.sender] = true;
    }

    /**
     * @dev Update collecting wallet address
     * @param _address The address to send collected funds
     */
    function setWallet(address _address) onlyOwner public {
        wallet = _address;
        WalletSet(_address);
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

        require(calculateUSDcValue(weiAmount) >= minContributionUSDc);

        // calculate token amount to be created
        uint256 tokens = calculateTokenAmount(weiAmount);

        // update state
        weiRaised = weiRaised.add(weiAmount);

        token.mint(beneficiary, tokens);
        TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

        forwardFunds();
    }

    // set rate
    function setRate(uint256 _rateUSDcETH) public onlyBot {
        // don't allow to change rate more than 10%
        assert(_rateUSDcETH < rateUSDcETH.mul(110).div(100));
        assert(_rateUSDcETH > rateUSDcETH.mul(90).div(100));
        rateUSDcETH = _rateUSDcETH;
        RateUpdate(rateUSDcETH);
    }

    /**
     * @dev Adds administrative role to address
     * @param _address The address that will get administrative privileges
     */
    function addOwner(address _address) onlyOwner public {
        owners[_address] = true;
        OwnerAdded(_address);
    }

    /**
     * @dev Removes administrative role from address
     * @param _address The address to remove administrative privileges from
     */
    function delOwner(address _address) onlyOwner public {
        owners[_address] = false;
        OwnerRemoved(_address);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owners[msg.sender]);
        _;
    }

    /**
     * @dev Adds rate updating bot
     * @param _address The address of the rate bot
     */
    function addBot(address _address) onlyOwner public {
        bots[_address] = true;
        BotAdded(_address);
    }

    /**
     * @dev Removes rate updating bot address
     * @param _address The address of the rate bot
     */
    function delBot(address _address) onlyOwner public {
        bots[_address] = false;
        BotRemoved(_address);
    }

    /**
     * @dev Throws if called by any account other than the bot.
     */
    modifier onlyBot() {
        require(bots[msg.sender]);
        _;
    }

    // calculate deposit value in USD Cents
    function calculateUSDcValue(uint256 _weiDeposit) public view returns (uint256) {

        // wei per USD cent
        uint256 weiPerUSDc = 1 ether/rateUSDcETH;

        // Deposited value converted to USD cents
        uint256 depositValueInUSDc = _weiDeposit.div(weiPerUSDc);
        return depositValueInUSDc;
    }

    // calculates how much tokens will beneficiary get
    // for given amount of wei
    function calculateTokenAmount(uint256 _weiDeposit) public view returns (uint256) {
        uint256 mainTokens = calculateUSDcValue(_weiDeposit);
        uint256 bonusTokens = mainTokens.mul(bonusTokensPercent).div(100);
        return mainTokens.add(bonusTokens);
    }

    // send ether to the fund collection wallet
    // override to create custom fund forwarding mechanisms
    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }



}
