# Formal Verification

## Overview

Formal verification uses mathematical methods to prove that a program satisfies certain properties, providing the highest level of assurance.

## Tools

### Certora

Certora is a formal verification platform for smart contracts:

```solidity
// Certora specification
rule transferPreservesTotalSupply(uint256 amount) {
    env e;
    uint256 totalBefore = totalSupply();
    transfer(e, amount);
    uint256 totalAfter = totalSupply();
    assert totalBefore == totalAfter;
}
```

### K Framework

K Framework provides formal semantics for programming languages:

```k
syntax Int ::= "totalSupply" "(" ")" [function]
rule totalSupply() => sumOfAllBalances()
```

### Dafny

Dafny is a verification-aware programming language:

```dafny
method Transfer(amount: uint256) 
    ensures totalSupply() == old(totalSupply())
{
    // Implementation with proofs
}
```

## Verification Process

1. **Define specifications**: What properties should hold?
2. **Write invariants**: Properties that always hold
3. **Prove properties**: Use theorem provers
4. **Review proofs**: Verify correctness

## Common Properties

### Invariants

```solidity
// Total supply always equals sum of balances
invariant totalSupply() == sumOfAllBalances();
```

### Safety Properties

```solidity
// Balances never exceed total supply
invariant forall address a: balanceOf(a) <= totalSupply();
```

### Liveness Properties

```solidity
// Withdrawals eventually succeed
invariant canWithdraw() => eventually withdrawn();
```

## Best Practices

1. **Start simple**: Verify basic properties first
2. **Incremental verification**: Build complexity gradually
3. **Document assumptions**: Clearly state what you assume
4. **Review specifications**: Ensure specs match intent
5. **Combine with testing**: Use both formal verification and testing

## Limitations

- **Complexity**: Can be time-consuming for complex contracts
- **Specification errors**: Wrong specs lead to wrong proofs
- **Tool limitations**: Some properties may be unprovable

## References

- [Certora Documentation](https://docs.certora.com/)
- [K Framework](https://kframework.org/)
- [Dafny Documentation](https://dafny.org/)

