# Access Control

## Overview

Access control vulnerabilities occur when functions that should be restricted to specific users or roles are accessible to unauthorized parties.

## Common Issues

1. Missing access modifiers
2. Incorrect role checks
3. Centralization risks
4. Privilege escalation

## Examples

### Missing Access Control

```solidity
// VULNERABLE: No access control
function withdrawAll() public {
    uint256 balance = address(this).balance;
    payable(msg.sender).transfer(balance);
}
```

### Weak Access Control

```solidity
// VULNERABLE: Easy to bypass
function adminFunction() public {
    require(msg.sender == owner, "Not owner");
    // But owner can be changed by anyone...
}
```

## Prevention

### 1. Use OpenZeppelin AccessControl

```solidity
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Secure is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    function adminFunction() public onlyRole(ADMIN_ROLE) {
        // Protected function
    }
}
```

### 2. Ownable Pattern

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

contract Secure is Ownable {
    function adminFunction() public onlyOwner {
        // Protected function
    }
}
```

### 3. Multi-Signature Wallets

For critical operations, use multi-sig:

```solidity
contract MultiSig {
    address[] public owners;
    uint256 public required;
    
    function execute() public {
        require(approvals >= required, "Not enough approvals");
        // Execute transaction
    }
}
```

## Best Practices

1. **Principle of Least Privilege**: Grant minimum necessary permissions
2. **Role-Based Access Control**: Use roles instead of single owner
3. **Timelock**: Add delays for critical operations
4. **Multi-sig**: For high-value operations
5. **Zero-address checks**: Verify addresses are not zero

## Testing

```solidity
function testAccessControl() public {
    vm.prank(attacker);
    vm.expectRevert();
    contract.adminFunction(); // Should revert
}
```

## References

- [SWC-105: Unprotected Ether Withdrawal](https://swcregistry.io/docs/SWC-105)
- [SWC-115: Authorization through tx.origin](https://swcregistry.io/docs/SWC-115)
- [OpenZeppelin AccessControl](https://docs.openzeppelin.com/contracts/4.x/access-control)

