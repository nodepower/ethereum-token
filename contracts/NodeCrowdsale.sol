pragma solidity ^0.4.18;

import './math/SafeMath.sol';
import './NodeToken.sol';

/**
 * @title NodeCrowdsale
 * @dev NodeCrowdsale is a contract for managing a token crowdsale for NodePower project.
 * Crowdsale have 7 phases with start and end timestamps, where investors can make
 * token purchases and the crowdsale will assign them tokens based
 * on a token per ETH rate and bonuses. Collected funds are forwarded to a wallet
 * as they arrive.
 */
contract NodeCrowdsale {
    using SafeMath for uint256;

    // The token being sold
    NodeToken public token;

    // External wallet where funds get forwarded
    address public wallet;

    // Crowdsale administrators
    mapping (address => bool) public owners;

    // External bots updating rates
    mapping (address => bool) public bots;

    // USD cents per ETH exchange rate
    uint256 public rateUSDcETH;

    // Phases list, see schedule in constructor
    mapping (uint => Phase) phases;

    // The total number of phases (0...6)
    uint public totalPhases = 7;

    // Description for each phase
    struct Phase {
        uint256 startTime;
        uint256 endTime;
        uint256 bonusPercent;
    }

    // Time until this contract operational
    uint256 public absEndTime;

    // Minimum Deposit in USD cents
    uint256 public constant minContributionUSDc = 1000;


    // Amount of raised Ethers (in wei).
    uint256 public weiRaised;

    /**
     * event for token purchase logging
     * @param purchaser who paid for the tokens
     * @param beneficiary who got the tokens
     * @param value weis paid for purchase
     * @param bonusPercent free tokens percantage for the phase
     * @param amount amount of tokens purchased
     */
    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 bonusPercent, uint256 amount);

    // event for rate update logging
    event RateUpdate(uint256 rate);

    // event for wallet update
    event WalletSet(address indexed wallet);

    // owners management events
    event OwnerAdded(address indexed newOwner);
    event OwnerRemoved(address indexed removedOwner);

    // bot management events
    event BotAdded(address indexed newBot);
    event BotRemoved(address indexed removedBot);

    function NodeCrowdsale(address _tokenAddress, uint256 _initialRate) public {
        require(_tokenAddress != address(0));
        token = NodeToken(_tokenAddress);
        rateUSDcETH = _initialRate;
        wallet = msg.sender;
        owners[msg.sender] = true;
        bots[msg.sender] = true;
        /*
        ICO SCHEDULE
        Bonus        start time               end time
        45%     2017-12-31 23:59:59 1514764799 2018-01-31 23:59:59 1517443199
        40%     2018-02-01 00:00:00 1517443200 2018-02-14 23:59:59 1518652799
        30%     2018-02-15 00:00:00 1518652800 2018-02-24 23:59:59 1519516799
        20%     2018-02-25 00:00:00 1519516800 2018-03-06 23:59:59 1520380799
        15%     2018-03-07 00:00:00 1520380800 2018-03-16 23:59:59 1521244799
        10%     2018-03-17 00:00:00 1521244800 2018-03-26 23:59:59 1522108799
        00%     2018-03-27 00:00:00 1522108800 2018-04-16 23:59:59 1523923199
        */
        phases[0].bonusPercent = 45;
        phases[0].startTime = 1514764799;
        phases[0].endTime = 1517443199;
        phases[1].bonusPercent = 40;
        phases[1].startTime = 1517443200;
        phases[1].endTime = 1518652799;
        phases[2].bonusPercent = 30;
        phases[2].startTime = 1518652800;
        phases[2].endTime = 1519516799;
        phases[3].bonusPercent = 20;
        phases[3].startTime = 1519516800;
        phases[3].endTime = 1520380799;
        phases[4].bonusPercent = 15;
        phases[4].startTime = 1520380800;
        phases[4].endTime = 1521244799;
        phases[5].bonusPercent = 10;
        phases[5].startTime = 1521244800;
        phases[5].endTime = 1522108799;
        phases[6].bonusPercent = 0;
        phases[6].startTime = 1522108800;
        phases[6].endTime = 1523923199;
        absEndTime = phases[6].endTime;
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
        require(now <= absEndTime);

        uint256 currentBonusPercent = getBonusPercent(now);

        uint256 weiAmount = msg.value;

        require(calculateUSDcValue(weiAmount) >= minContributionUSDc);

        // calculate token amount to be created
        uint256 tokens = calculateTokenAmount(weiAmount, currentBonusPercent);

        // update state
        weiRaised = weiRaised.add(weiAmount);

        token.mint(beneficiary, tokens);
        TokenPurchase(msg.sender, beneficiary, weiAmount, currentBonusPercent, tokens);

        forwardFunds();
    }

    // If phase exists return corresponding bonus for the given date
    // If phase doesn't exist for the given date - revert
    function getBonusPercent(uint256 datetime) public view returns (uint256) {
        for (uint i = 0; i < totalPhases; i++) {
            if (datetime >= phases[i].startTime && datetime <= phases[i].endTime) {
                return phases[i].bonusPercent;
            }
        }
        revert();
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
    function calculateTokenAmount(uint256 _weiDeposit, uint256 _bonusTokensPercent) public view returns (uint256) {
        uint256 mainTokens = calculateUSDcValue(_weiDeposit);
        uint256 bonusTokens = mainTokens.mul(_bonusTokensPercent).div(100);
        return mainTokens.add(bonusTokens);
    }

    // send ether to the fund collection wallet
    // override to create custom fund forwarding mechanisms
    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }



}
