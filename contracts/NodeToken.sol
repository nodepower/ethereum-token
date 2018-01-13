pragma solidity ^0.4.18;


import "./token/StandardToken.sol";


contract NodeToken is StandardToken {
    string public name = "NodePower";
    string public symbol = "NODE";
    uint8 public decimals = 2;
    bool public mintingFinished = false;
    mapping (address => bool) owners;
    mapping (address => bool) minters;

    event Mint(address indexed to, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event MintFinished();
    event OwnerAdded(address indexed newOwner);
    event OwnerRemoved(address indexed removedOwner);
    event MinterAdded(address indexed newMinter);
    event MinterRemoved(address indexed removedMinter);
    event Burn(address indexed burner, uint256 value);

    function NodeToken() public {
        owners[msg.sender] = true;
    }

    /**
     * @dev Function to mint tokens
     * @param _to The address that will receive the minted tokens.
     * @param _amount The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address _to, uint256 _amount) onlyMinter public returns (bool) {
        require(!mintingFinished);
        totalSupply = totalSupply.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        Mint(_to, _amount);
        Transfer(address(0), _to, _amount);
        return true;
    }

    /**
     * @dev Function to stop minting new tokens.
     * @return True if the operation was successful.
     */
    function finishMinting() onlyOwner public returns (bool) {
        require(!mintingFinished);
        mintingFinished = true;
        MintFinished();
        return true;
    }

    /**
     * @dev Burns a specific amount of tokens.
     * @param _value The amount of token to be burned.
     */
    function burn(uint256 _value) public {
        require(_value <= balances[msg.sender]);
        // no need to require value <= totalSupply, since that would imply the
        // sender's balance is greater than the totalSupply, which *should* be an assertion failure

        address burner = msg.sender;
        balances[burner] = balances[burner].sub(_value);
        totalSupply = totalSupply.sub(_value);
        Burn(burner, _value);
    }

    function addOwner(address _address) onlyOwner public {
        owners[_address] = true;
        OwnerAdded(_address);
    }

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

    function addMinter(address _address) onlyOwner public {
        minters[_address] = true;
        MinterAdded(_address);
    }

    function delMinter(address _address) onlyOwner public {
        minters[_address] = false;
        MinterRemoved(_address);
    }

    /**
     * @dev Throws if called by any account other than the miner.
     */
    modifier onlyMinter() {
        require(minters[msg.sender]);
        _;
    }
}
