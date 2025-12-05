# Case Studies

## Overview

This section contains real-world case studies of smart contract vulnerabilities, exploits, and their solutions.

## Notable Incidents

### The DAO Hack (2016)

**Vulnerability**: Reentrancy attack

**Impact**: ~$60 million stolen

**Lesson**: Always update state before external calls

### Parity Wallet Bug (2017)

**Vulnerability**: Access control issue

**Impact**: ~$150 million frozen

**Lesson**: Proper access control and multi-sig for critical operations

### BatchOverflow (2018)

**Vulnerability**: Integer overflow

**Impact**: Multiple tokens affected

**Lesson**: Use SafeMath or Solidity 0.8.0+

### bZx Flash Loan Attacks (2020)

**Vulnerability**: Price oracle manipulation

**Impact**: ~$8 million stolen

**Lesson**: Secure price oracles and flash loan protection

## Analysis Framework

When analyzing a case study, consider:

1. **Vulnerability Type**: What was the root cause?
2. **Attack Vector**: How was it exploited?
3. **Impact**: What was the damage?
4. **Prevention**: How could it have been prevented?
5. **Lessons Learned**: What can we learn?

## Contributing

We welcome contributions of case studies. Please include:

- Clear description of the vulnerability
- Code examples (vulnerable and fixed)
- Impact analysis
- Prevention strategies
- References

## References

- [Reentrancy Attacks Database](https://github.com/pcaversaccio/reentrancy-attacks)
- [Smart Contract Exploits](https://github.com/SunWeb3Sec/DeFiHackLabs)

