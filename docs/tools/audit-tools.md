# Audit Tools

## Static Analysis Tools

### Slither

**Description**: Static analysis framework for Solidity

**Installation**:
```bash
pip install slither-analyzer
```

**Usage**:
```bash
slither contract.sol
```

**Website**: https://github.com/crytic/slither

### Mythril

**Description**: Security analysis tool for EVM bytecode

**Installation**:
```bash
pip install mythril
```

**Usage**:
```bash
myth analyze contract.sol
```

**Website**: https://github.com/ConsenSys/mythril

### Semgrep

**Description**: Fast, lightweight static analysis

**Installation**:
```bash
pip install semgrep
```

**Usage**:
```bash
semgrep --config=auto .
```

**Website**: https://semgrep.dev/

## Dynamic Analysis Tools

### Foundry

**Description**: Fast, portable toolkit for Ethereum

**Installation**:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

**Website**: https://getfoundry.sh/

### Hardhat

**Description**: Development environment for Ethereum

**Installation**:
```bash
npm install --save-dev hardhat
```

**Website**: https://hardhat.org/

### Echidna

**Description**: Fuzzer for Ethereum smart contracts

**Installation**:
```bash
docker pull trailofbits/echidna
```

**Website**: https://github.com/crytic/echidna

## Formal Verification Tools

### Certora

**Description**: Formal verification platform

**Website**: https://www.certora.com/

### K Framework

**Description**: Framework for defining formal semantics

**Website**: https://kframework.org/

## Other Tools

### Manticore

**Description**: Symbolic execution tool

**Installation**:
```bash
pip install manticore
```

**Website**: https://github.com/trailofbits/manticore

### Securify

**Description**: Security scanner for Ethereum smart contracts

**Website**: https://securify.ch/

### Oyente

**Description**: Static analysis tool (legacy)

**Website**: https://github.com/melonproject/oyente

## Tool Comparison

| Tool | Type | Strengths | Weaknesses |
|------|------|-----------|------------|
| Slither | Static | Fast, comprehensive | False positives |
| Mythril | Static | Deep analysis | Slower |
| Foundry | Testing | Fast, fuzzing | Learning curve |
| Certora | Formal | Mathematical proofs | Cost, complexity |

## Best Practices

1. **Use multiple tools**: Different tools catch different issues
2. **Understand limitations**: Know what each tool can/can't do
3. **Review findings**: Not all findings are vulnerabilities
4. **Keep updated**: Use latest versions
5. **Customize**: Configure tools for your needs

## References

- [Awesome Ethereum Security](https://github.com/crytic/awesome-ethereum-security)
- [Ethereum Security Tooling](https://ethereum.org/en/developers/tools/)

