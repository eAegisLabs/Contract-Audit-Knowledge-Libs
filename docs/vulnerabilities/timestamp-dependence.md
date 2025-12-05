# Timestamp Dependence

## Overview

Timestamp dependence vulnerabilities occur when contract logic relies on block timestamps, which can be manipulated by miners/validators within a small range.

## How It Works

Block timestamps (`block.timestamp` or `now`) can be manipulated by:
- Miners (PoW): ±15 seconds
- Validators (PoS): ±1-2 seconds

## Vulnerable Patterns

### Random Number Generation

```solidity
// VULNERABLE: Predictable randomness
function random() public view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(block.timestamp)));
}
```

### Time-Based Conditions

```solidity
// VULNERABLE: Can be manipulated
function claimReward() public {
    require(block.timestamp >= unlockTime, "Not unlocked");
    // Attacker can manipulate timestamp slightly
}
```

### Auction Deadlines

```solidity
// VULNERABLE: Timestamp manipulation
function bid() public {
    require(block.timestamp < auctionEnd, "Auction ended");
    // Miner can extend auction by manipulating timestamp
}
```

## Prevention

### 1. Use Block Numbers

For longer time periods, use block numbers:

```solidity
uint256 public constant BLOCKS_PER_DAY = 7200; // ~12 seconds per block
uint256 public unlockBlock = block.number + (30 * BLOCKS_PER_DAY);
```

### 2. Accept Range

Allow reasonable timestamp variance:

```solidity
function claimReward() public {
    require(block.timestamp >= unlockTime - 1 minutes, "Too early");
    require(block.timestamp <= unlockTime + 1 minutes, "Too late");
}
```

### 3. Commit-Reveal for Randomness

```solidity
function commit(bytes32 hash) public {
    commits[msg.sender] = hash;
}

function reveal(uint256 random, bytes32 secret) public {
    bytes32 hash = keccak256(abi.encodePacked(random, secret));
    require(commits[msg.sender] == hash, "Invalid commit");
    // Use revealed random value
}
```

### 4. Chainlink VRF

For true randomness:

```solidity
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Random is VRFConsumerBase {
    function requestRandomness() public returns (bytes32 requestId) {
        return requestRandomness(keyHash, fee);
    }
}
```

## Best Practices

1. **Avoid timestamp for randomness**: Never use `block.timestamp` alone for randomness
2. **Use block numbers**: For longer time periods (>1 hour)
3. **Accept variance**: Allow reasonable manipulation range
4. **Use oracles**: For critical time-dependent operations
5. **Chainlink VRF**: For true randomness

## Testing

```solidity
function testTimestampManipulation() public {
    vm.warp(unlockTime - 1);
    vm.expectRevert();
    contract.claimReward(); // Should fail
    
    vm.warp(unlockTime + 1);
    contract.claimReward(); // Should succeed
}
```

## References

- [SWC-116: Block values as a proxy for time](https://swcregistry.io/docs/SWC-116)
- [Chainlink VRF](https://docs.chain.link/vrf/v2/introduction)

