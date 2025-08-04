import { Instance } from "../../../../src/cloud/aws/components/instance";
import { InstanceArgs } from "../../../../src/cloud/aws/components/types";

describe("Instance Component", () => {
  let instance: Instance;
  const mockArgs: InstanceArgs = {
    instanceType: "t2.micro",
    ami: "ami-12345678",
    tags: {
      Name: "TestInstance",
      Environment: "Test"
    },
    subnetId: "subnet-12345678",
    vpcId: "vpc-12345678"
  };

  beforeEach(() => {
    instance = new Instance("test-instance", mockArgs);
  });

  afterEach(() => {
    // Clean up any resources if needed
  });

  it("should create an instance with correct name", () => {
    expect(instance).toBeDefined();
    expect(instance.instance).toBeDefined();
  });

  it("should have the correct resource type", () => {
    expect(instance.urn).toBeDefined();
  });

  it("should accept valid instance arguments", () => {
    const validArgs: InstanceArgs = {
      instanceType: "t3.medium",
      ami: "ami-87654321",
      tags: {
        Name: "ValidInstance",
        Owner: "TestUser"
      },
      subnetId: "subnet-87654321",
      vpcId: "vpc-87654321"
    };

    const validInstance = new Instance("valid-instance", validArgs);
    expect(validInstance).toBeDefined();
    expect(validInstance.instance).toBeDefined();
  });

  it("should handle empty tags", () => {
    const argsWithEmptyTags: InstanceArgs = {
      ...mockArgs,
      tags: {}
    };

    const instanceWithEmptyTags = new Instance("empty-tags-instance", argsWithEmptyTags);
    expect(instanceWithEmptyTags).toBeDefined();
  });

  it("should handle multiple tags", () => {
    const argsWithMultipleTags: InstanceArgs = {
      ...mockArgs,
      tags: {
        Name: "MultiTagInstance",
        Environment: "Production",
        Owner: "DevOps",
        Project: "K3S",
        CostCenter: "Engineering"
      }
    };

    const instanceWithMultipleTags = new Instance("multi-tags-instance", argsWithMultipleTags);
    expect(instanceWithMultipleTags).toBeDefined();
  });
});