# Pulumi package for installing K3S

## This is super experimental repository for testing the things

## Development

### Testing

This project uses Jest for unit testing. The testing framework is configured to work with TypeScript and Pulumi components.

#### Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI (no watch, with coverage)
npm run test:ci
```

#### Test Structure

Tests are located in the `tests/` directory and mirror the source code structure. The testing setup includes:

- **Jest**: Test runner and assertion library
- **ts-jest**: TypeScript preprocessor for Jest
- **Pulumi mocks**: Mock Pulumi runtime for testing components without creating actual AWS resources

See `tests/README.md` for detailed information about writing and organizing tests.
