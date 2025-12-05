# Logic Errors

## Overview

Logic errors are bugs in the contract's business logic that can lead to unexpected behavior, incorrect calculations, or security vulnerabilities.

## Common Types

1. **Incorrect calculations**
2. **Wrong conditional logic**
3. **State inconsistencies**
4. **Race conditions**
5. **Off-by-one errors**

## Examples

### Incorrect Calculation

```solidity
// VULNERABLE: Wrong fee calculation
function calculateFee(uint256 amount) public pure returns (uint256) {
    return amount * 5 / 100; // Should be amount * 5 / 1000 for 0.5%
}
```

### Wrong Conditional Logic

```solidity
// VULNERABLE: Logic error
function canWithdraw(address user) public view returns (bool) {
    return balances[user] > 0 || balances[user] == 0; // Always true!
}
```

### State Inconsistency

```solidity
// VULNERABLE: State not updated consistently
mapping(address => uint256) public balances;
uint256 public totalSupply;

function mint(address to, uint256 amount) public {
    balances[to] += amount;
    // Missing: totalSupply += amount;
}
```

## Prevention

### 1. Use Invariants

Define and check invariants:

```solidity
function invariant() internal view {
    assert(totalSupply == sumOfAllBalances());
}
```

### 2. Comprehensive Testing

Test edge cases and boundary conditions:

```solidity
function testEdgeCases() public {
    // Test zero values
    // Test maximum values
    // Test boundary conditions
}
```

### 3. Formal Verification

Use formal verification tools to prove correctness:

```solidity
// Spec: totalSupply always equals sum of balances
```

### 4. Code Review

Thorough code review focusing on:
- Business logic correctness
- Edge cases
- State consistency
- Mathematical operations

## Testing Strategies

1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test function interactions
3. **Fuzz Testing**: Random input testing
4. **Invariant Testing**: Check invariants hold

## Tools

- **Foundry**: Fuzz testing and invariant testing
- **Slither**: Static analysis for logic errors
- **Certora**: Formal verification

## References

- [Foundry Fuzz Testing](https://book.getfoundry.sh/forge/fuzz-testing)
- [Invariant Testing](https://book.getfoundry.sh/forge/invariant-testing)

