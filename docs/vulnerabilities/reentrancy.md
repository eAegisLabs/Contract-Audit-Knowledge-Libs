# Reentrancy Attacks

## Overview

Reentrancy is one of the most dangerous vulnerabilities in smart contracts. It occurs when a contract makes an external call to another untrusted contract before resolving its own state changes.

## How It Works

A reentrancy attack happens when:

1. Contract A calls an external function in Contract B
2. Contract B calls back into Contract A before the first call completes
3. Contract A's state hasn't been updated yet, allowing Contract B to exploit the original state

## Example

```solidity
// Vulnerable Contract
contract Vulnerable {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // External call before state update - VULNERABLE!
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        balances[msg.sender] -= amount;
    }
}
```

## Attack Scenario

```solidity
contract Attacker {
    Vulnerable public target;
    
    function attack() public {
        target.withdraw(target.balances(address(this)));
    }
    
    receive() external payable {
        if (address(target).balance > 0) {
            target.withdraw(target.balances(address(this)));
        }
    }
}
```

## Prevention

### 1. Checks-Effects-Interactions Pattern

Always update state before making external calls:

```solidity
function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    
    // Update state first
    balances[msg.sender] -= amount;
    
    // Then make external call
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}
```

### 2. ReentrancyGuard

Use OpenZeppelin's ReentrancyGuard:

```solidity
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Secure is ReentrancyGuard {
    function withdraw(uint256 amount) public nonReentrant {
        // Safe withdrawal logic
    }
}
```

### 3. Pull Payment Pattern

Instead of pushing payments, let users pull their funds:

```solidity
mapping(address => uint256) public pendingWithdrawals;

function withdraw() public {
    uint256 amount = pendingWithdrawals[msg.sender];
    pendingWithdrawals[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
}
```

## Testing

Test for reentrancy vulnerabilities:

```solidity
function testReentrancy() public {
    // Setup
    // Attempt reentrancy attack
    // Verify state integrity
}
```

## References

- [SWC-107: Reentrancy](https://swcregistry.io/docs/SWC-107)
- [OpenZeppelin ReentrancyGuard](https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard)

