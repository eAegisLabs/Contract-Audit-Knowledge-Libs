# Integer Overflow/Underflow

## Overview

Integer overflow and underflow occur when arithmetic operations exceed the maximum or minimum value that can be stored in a variable type.

## Historical Context

Before Solidity 0.8.0, integer overflow/underflow was a critical vulnerability. Since Solidity 0.8.0, arithmetic operations automatically revert on overflow/underflow, but understanding this vulnerability remains important for auditing older contracts.

## How It Works

### Overflow Example

```solidity
// Solidity < 0.8.0 - Vulnerable
uint8 public max = 255;
max = max + 1; // Wraps to 0 instead of reverting
```

### Underflow Example

```solidity
// Solidity < 0.8.0 - Vulnerable
uint256 public balance = 0;
balance = balance - 1; // Wraps to 2^256 - 1
```

## Modern Solidity (0.8.0+)

Solidity 0.8.0+ automatically checks for overflow/underflow:

```solidity
// Solidity >= 0.8.0 - Safe
uint8 public max = 255;
max = max + 1; // Reverts with panic error
```

## Unchecked Blocks

Be careful with `unchecked` blocks:

```solidity
unchecked {
    // Overflow/underflow allowed here
    uint256 result = a + b; // No automatic check
}
```

## Prevention

1. **Use Solidity 0.8.0+**: Automatic overflow protection
2. **Avoid unchecked blocks**: Unless absolutely necessary
3. **Use SafeMath library**: For older contracts (pre-0.8.0)
4. **Validate inputs**: Check bounds before arithmetic operations

## SafeMath Pattern (Legacy)

For contracts using Solidity < 0.8.0:

```solidity
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

using SafeMath for uint256;

function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a.add(b); // Safe addition
}
```

## Testing

```solidity
function testOverflow() public {
    uint8 max = 255;
    vm.expectRevert();
    max = max + 1; // Should revert in Solidity 0.8.0+
}
```

## References

- [SWC-101: Integer Overflow and Underflow](https://swcregistry.io/docs/SWC-101)
- [Solidity 0.8.0 Release Notes](https://github.com/ethereum/solidity/releases/tag/v0.8.0)

