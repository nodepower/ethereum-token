pragma solidity ^0.4.18;


import './NodeToken.sol';
import './math/SafeMath.sol';

contract PreITOCrowdSale {
    using SafeMath for uint256;

    struct Phase {
        uint256 startTime;
        uint256 endTime;
        uint256 bonusPercent;
    }

    uint public totalPhases;

    // The token being sold
    NodeToken public token;

    // address where funds are collected
    address public wallet;

    mapping (uint => Phase) phases;

    // USD per ETH exchange rate
    // updated regularly
    uint256 public rateUSDETH;

    // minimal allowed investment USD
    uint256 public minInvestUSD;

    // minimal allowed investment, wei
    // updated regularly by oracle
    uint256 public minInvest;

    uint256 public raisedTotal;
    uint256 public raisedFirstPhasePreITO;
    uint256 public raisedCurrentPhasePreITO;

    /**
    * event for token purchase logging
    * @param purchaser who paid for the tokens
    * @param beneficiary who got the tokens
    * @param value weis paid for purchase
    * @param amount amount of tokens purchased
    */
    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    /* example arguments for cunstructor
    [1515441052,1615441052,300,1615441053,1715441052,3000,1715441053,1815441052,656]
    */
    function PreITOCrowdSale(uint256[] _phases) public {
        uint256 phaseID = 0;
        uint256 startTime;
        uint256 endTime;
        assert (_phases.length % 3 == 0);
        uint256 lastTime = _phases[0]-1;
        for (uint i = 0; i < _phases.length; i+=3) {
            //ToDo add input asserts
            startTime = _phases[i];
            endTime = _phases[i+1];
            assert (startTime > lastTime);
            assert (endTime > startTime);
            phases[phaseID].startTime = startTime;
            phases[phaseID].endTime = endTime;
            phases[phaseID].bonusPercent = _phases[i+2];
            phaseID++;
        }
        totalPhases = phaseID++;
    }
    /*

    function getPhaseByTime() public constant returns (uint256) {
        return phases[2].startTime;
        //Phases[] storage phases;
        //return phases[2].bonusPercent;
        //Phase[3] storage phases = [phase45, phase30, phase40];
        //return phases.length;
        //uint phasesCount = phases.length;

        for (uint i = 0; i < phases.length; i++) {
            if (_time > phases[i].startTime) {
                return phases[i].bonusPercent;
            }
        }

    }


    // fallback function can be used to buy tokens
    function () external payable {
        buyTokens(msg.sender);
    }


    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }

    // low level token purchase function
    function buyTokens(address beneficiary) public payable {
        require(beneficiary != address(0));
        //require(validPurchase());

        //uint256 weiAmount = msg.value;

        // calculate token amount to be created
        //uint256 tokens = weiAmount.mul(rate);

        // update state
        //weiRaised = weiRaised.add(weiAmount);

        //token.mint(beneficiary, tokens);
        //TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

        forwardFunds();
    }
    */
}

