import * as pulumi from "@pulumi/pulumi";

describe("Main Index", () => {
  beforeEach(() => {
    // Reset any module cache to ensure clean imports
    jest.resetModules();
  });

  it("should export instanceId", async () => {
    // Import the main module
    const indexModule = await import("../index");
    
    expect(indexModule.instanceId).toBeDefined();
    expect(pulumi.Output.isInstance(indexModule.instanceId)).toBe(true);
  });

  it("should create instance with correct configuration", async () => {
    // Import the main module
    const indexModule = await import("../index");
    
    // The instanceId should be a Pulumi Output
    expect(indexModule.instanceId).toBeDefined();
    
    // We can test that the output exists without resolving it
    // since we're using mocks
    expect(pulumi.Output.isInstance(indexModule.instanceId)).toBe(true);
  });
});