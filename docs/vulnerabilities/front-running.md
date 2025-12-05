# Front Running

## Overview

Front running occurs when an attacker observes a pending transaction and submits their own transaction with a higher gas price to execute first, profiting from the information asymmetry.

## How It Works

1. User submits a transaction (e.g., buying tokens)
2. Attacker sees the transaction in the mempool
3. Attacker submits a transaction with higher gas price
4. Attacker's transaction executes first
5. Attacker profits from the price change

## Example Scenario

```solidity
// Vulnerable DEX
contract DEX {
    function swap(uint256 amountIn) public {
        uint256 amountOut = calculateOutput(amountIn);
        // Attacker can front-run this transaction
        transfer(msg.sender, amountOut);
    }
}
```

## Prevention Strategies

### 1. Commit-Reveal Scheme

Hide transaction details until execution:

```solidity
mapping(bytes32 => bool) public commits;

function commit(bytes32 hash) public {
    commits[hash] = true;
}

function reveal(uint256 amount, bytes32 secret) public {
    bytes32 hash = keccak256(abi.encodePacked(amount, secret, msg.sender));
    require(commits[hash], "Commit not found");
    // Execute transaction
}
```

### 2. Slippage Protection

Allow users to set maximum acceptable slippage:

```solidity
function swap(uint256 amountIn, uint256 minAmountOut) public {
    uint256 amountOut = calculateOutput(amountIn);
    require(amountOut >= minAmountOut, "Slippage too high");
    transfer(msg.sender, amountOut);
}
```

### 3. Private Mempools

Use private transaction pools (e.g., Flashbots):

```solidity
// Submit to private mempool to avoid front-running
```

### 4. Batch Auctions

Execute multiple transactions together:

```solidity
function batchSwap(Swap[] calldata swaps) public {
    // Execute all swaps atomically
    // No front-running possible
}
```

## MEV Protection

Maximal Extractable Value (MEV) is related to front-running:

- **Flashbots**: Private transaction pool
- **MEV-Boost**: MEV protection for validators
- **Time-weighted pricing**: Reduce MEV opportunities

## Best Practices

1. Always include slippage protection
2. Use commit-reveal for sensitive operations
3. Consider private mempools for high-value transactions
4. Design mechanisms to reduce MEV extraction

## References

- [SWC-116: Block values as a proxy for time](https://swcregistry.io/docs/SWC-116)
- [Flashbots Documentation](https://docs.flashbots.net/)

