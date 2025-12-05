# Testing Frameworks

## Overview

Testing frameworks provide the infrastructure and tools needed to write, run, and manage tests for smart contracts.

## Foundry

### Features

- **Fast execution**: Written in Rust
- **Fuzz testing**: Built-in fuzzing support
- **Invariant testing**: Test system invariants
- **Gas snapshots**: Track gas usage
- **Fork testing**: Test against mainnet state

### Installation

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Token.sol";

contract TokenTest is Test {
    Token token;
    
    function setUp() public {
        token = new Token();
    }
    
    function testTransfer() public {
        token.transfer(alice, 100);
        assertEq(token.balanceOf(alice), 100);
    }
    
    function testFuzzTransfer(uint256 amount) public {
        vm.assume(amount <= token.totalSupply());
        token.transfer(alice, amount);
        assertEq(token.balanceOf(alice), amount);
    }
}
```

### Running Tests

```bash
forge test
forge test --fuzz-runs 10000
forge snapshot
```

## Hardhat

### Features

- **JavaScript/TypeScript**: Write tests in JS/TS
- **Plugin ecosystem**: Extensive plugins
- **Network management**: Easy network configuration
- **Debugging**: Built-in debugging tools

### Installation

```bash
npm install --save-dev hardhat
npx hardhat init
```

### Example

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  it("Should transfer tokens", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    
    await token.transfer(alice.address, 100);
    expect(await token.balanceOf(alice.address)).to.equal(100);
  });
});
```

### Running Tests

```bash
npx hardhat test
npx hardhat test --grep "transfer"
```

## Truffle

### Features

- **Mature ecosystem**: Well-established framework
- **Migration system**: Contract deployment management
- **Console**: Interactive console
- **Debugger**: Built-in debugger

### Installation

```bash
npm install -g truffle
truffle init
```

### Example

```javascript
const Token = artifacts.require("Token");

contract("Token", (accounts) => {
  it("should transfer tokens", async () => {
    const token = await Token.deployed();
    await token.transfer(accounts[1], 100);
    const balance = await token.balanceOf(accounts[1]);
    assert.equal(balance, 100);
  });
});
```

### Running Tests

```bash
truffle test
truffle test --network testnet
```

## Comparison

| Framework | Language | Speed | Fuzzing | Mainnet Fork |
|-----------|----------|-------|---------|--------------|
| Foundry | Solidity | Very Fast | ✅ | ✅ |
| Hardhat | JavaScript | Fast | ❌ | ✅ |
| Truffle | JavaScript | Medium | ❌ | Limited |

## Best Practices

1. **High coverage**: Aim for >90% code coverage
2. **Test edge cases**: Zero, max, boundary values
3. **Test failures**: Verify revert conditions
4. **Integration tests**: Test contract interactions
5. **Gas optimization**: Measure and optimize gas

## References

- [Foundry Book](https://book.getfoundry.sh/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Truffle Documentation](https://trufflesuite.com/docs)

