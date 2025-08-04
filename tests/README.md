# Testing Framework

This project uses Jest as the unit testing framework for TypeScript code.

## Setup

The testing framework is configured with:
- **Jest**: Test runner and assertion library
- **ts-jest**: TypeScript preprocessor for Jest
- **Pulumi mocks**: Mock Pulumi runtime for testing components

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI (no watch, with coverage)
npm run test:ci
```

## Test Structure

Tests are organized to mirror the source code structure:
```
tests/
├── setup.ts                    # Test setup and Pulumi mocks
├── cloud/
│   └── aws/
│       └── components/
│           ├── instance.test.ts # Tests for Instance component
│           └── types.test.ts    # Tests for type definitions
└── README.md                   # This file
```

## Writing Tests

### Component Tests

When testing Pulumi components, the setup file automatically configures mocks for the Pulumi runtime. This allows you to test component logic without actually creating AWS resources.

Example:
```typescript
import { Instance } from "../../../../src/cloud/aws/components/instance";
import { InstanceArgs } from "../../../../src/cloud/aws/components/types";

describe("Instance Component", () => {
  it("should create an instance", () => {
    const args: InstanceArgs = {
      instanceType: "t2.micro",
      ami: "ami-12345678",
      tags: { Name: "TestInstance" },
      subnetId: "subnet-12345678",
      vpcId: "vpc-12345678"
    };

    const instance = new Instance("test-instance", args);
    expect(instance).toBeDefined();
  });
});
```

### Type Tests

Test type definitions and interfaces to ensure they accept valid data:

```typescript
import { InstanceArgs } from "../../../../src/cloud/aws/components/types";

describe("InstanceArgs Interface", () => {
  it("should accept valid arguments", () => {
    const args: InstanceArgs = {
      instanceType: "t2.micro",
      ami: "ami-12345678",
      tags: { Name: "TestInstance" },
      subnetId: "subnet-12345678",
      vpcId: "vpc-12345678"
    };

    expect(args.instanceType).toBe("t2.micro");
  });
});
```

## Coverage

The test coverage includes:
- All TypeScript files in the `src/` directory
- Excludes type definition files (`.d.ts`)
- Excludes index files that only re-export modules

Coverage reports are generated in the `coverage/` directory with HTML, LCOV, and text formats.