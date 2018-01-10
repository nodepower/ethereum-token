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

    /* example arguments for constructor
    [1515441052,1615441052,300,1615441053,1715441052,3000,1715441053,1815441052,656]
    */
    function PreITOCrowdSale(uint256[] _phases) public {
        uint256 phaseID = 0;
        assert (_phases.length % 3 == 0);
        uint256 lastTime = _phases[0]-1;
        for (uint i = 0; i < _phases.length; i+=3) {
            //ToDo add input asserts
            uint256 startTime = _phases[i];
            uint256 endTime = _phases[i+1];
            uint256 bonusPercent = _phases[i+2];
            assert (startTime > lastTime);
            assert (endTime > startTime);
            lastTime = endTime;
            phases[phaseID].startTime = startTime;
            phases[phaseID].endTime = endTime;
            phases[phaseID].bonusPercent = bonusPercent;
            phaseID++;
        }
        totalPhases = phaseID++;
    }

    function getBonusPercentByTime(uint256 _time) public constant returns (uint256) {
        for (uint i = 0; i < totalPhases; i++) {
            if (_time >= phases[i].startTime && _time <= phases[i].endTime) {
                return phases[i].bonusPercent;
            }
        }
        revert();
    }

    /*

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

