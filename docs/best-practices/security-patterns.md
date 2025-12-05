# Security Patterns

## Overview

Security patterns are proven design solutions to common security problems in smart contracts.

## Access Control Patterns

### Role-Based Access Control

```solidity
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Secure is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function adminFunction() public onlyRole(ADMIN_ROLE) {
        // Admin-only function
    }
}
```

### Multi-Signature Pattern

```solidity
contract MultiSig {
    address[] public owners;
    uint256 public required;
    mapping(bytes32 => uint256) public approvals;
    
    function execute(
        address to,
        uint256 value,
        bytes calldata data
    ) public returns (bytes32) {
        bytes32 txHash = keccak256(abi.encodePacked(to, value, data));
        approvals[txHash]++;
        
        if (approvals[txHash] >= required) {
            (bool success, ) = to.call{value: value}(data);
            require(success, "Execution failed");
        }
        
        return txHash;
    }
}
```

## Reentrancy Protection Patterns

### Checks-Effects-Interactions

```solidity
function withdraw(uint256 amount) public {
    // Check
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    // Effects
    balances[msg.sender] -= amount;
    
    // Interactions
    payable(msg.sender).transfer(amount);
}
```

### ReentrancyGuard

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Secure is ReentrancyGuard {
    function withdraw(uint256 amount) public nonReentrant {
        // Safe withdrawal
    }
}
```

### Pull Payment Pattern

```solidity
mapping(address => uint256) public pendingWithdrawals;

function withdraw() public {
    uint256 amount = pendingWithdrawals[msg.sender];
    require(amount > 0, "No pending withdrawal");
    
    pendingWithdrawals[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
}
```

## Upgradeability Patterns

### Proxy Pattern

```solidity
contract Proxy {
    address public implementation;
    
    function upgrade(address newImplementation) public onlyOwner {
        implementation = newImplementation;
    }
    
    fallback() external {
        address impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
```

## Input Validation Patterns

### Zero Address Check

```solidity
modifier notZeroAddress(address addr) {
    require(addr != address(0), "Zero address");
    _;
}

function transfer(address to, uint256 amount) 
    public 
    notZeroAddress(to) 
{
    // Transfer logic
}
```

### Bounds Checking

```solidity
modifier validAmount(uint256 amount) {
    require(amount > 0, "Amount must be positive");
    require(amount <= maxAmount, "Amount exceeds maximum");
    _;
}
```

## State Management Patterns

### State Machine

```solidity
enum State { Created, Active, Paused, Closed }

contract StateMachine {
    State public state;
    
    modifier inState(State _state) {
        require(state == _state, "Invalid state");
        _;
    }
    
    function activate() public inState(State.Created) {
        state = State.Active;
    }
}
```

## References

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Consensys Best Practices](https://consensys.github.io/smart-contract-best-practices/)

