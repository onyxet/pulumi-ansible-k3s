import { InstanceArgs, S3BucketArgs } from "../../../../src/cloud/aws/components/types";

describe("InstanceArgs Interface", () => {
  it("should accept valid instance arguments", () => {
    const validArgs: InstanceArgs = {
      instanceType: "t2.micro",
      ami: "ami-12345678",
      tags: {
        Name: "TestInstance",
        Environment: "Test"
      },
      subnetId: "subnet-12345678",
      vpcId: "vpc-12345678"
    };

    expect(validArgs.instanceType).toBe("t2.micro");
    expect(validArgs.ami).toBe("ami-12345678");
    expect(validArgs.tags.Name).toBe("TestInstance");
    expect(validArgs.subnetId).toBe("subnet-12345678");
    expect(validArgs.vpcId).toBe("vpc-12345678");
  });

  it("should handle different instance types", () => {
    const instanceTypes = ["t2.micro", "t2.small", "t3.medium", "m5.large"];
    
    instanceTypes.forEach(instanceType => {
      const args: InstanceArgs = {
        instanceType,
        ami: "ami-12345678",
        tags: { Name: "TestInstance" },
        subnetId: "subnet-12345678",
        vpcId: "vpc-12345678"
      };
      
      expect(args.instanceType).toBe(instanceType);
    });
  });

  it("should handle empty tags object", () => {
    const argsWithEmptyTags: InstanceArgs = {
      instanceType: "t2.micro",
      ami: "ami-12345678",
      tags: {},
      subnetId: "subnet-12345678",
      vpcId: "vpc-12345678"
    };

    expect(Object.keys(argsWithEmptyTags.tags)).toHaveLength(0);
  });

  it("should handle multiple tags", () => {
    const multipleTagsArgs: InstanceArgs = {
      instanceType: "t2.micro",
      ami: "ami-12345678",
      tags: {
        Name: "TestInstance",
        Environment: "Production",
        Owner: "DevOps",
        Project: "K3S"
      },
      subnetId: "subnet-12345678",
      vpcId: "vpc-12345678"
    };

    expect(Object.keys(multipleTagsArgs.tags)).toHaveLength(4);
    expect(multipleTagsArgs.tags.Environment).toBe("Production");
    expect(multipleTagsArgs.tags.Owner).toBe("DevOps");
  });
});

describe("S3BucketArgs Interface", () => {
  it("should accept valid S3 bucket arguments", () => {
    const validArgs: S3BucketArgs = {
      bucketName: "my-test-bucket",
      versioning: true,
      encryption: true,
      publicReadAccess: false,
      tags: {
        Environment: "Test",
        Project: "K3S"
      }
    };

    expect(validArgs.bucketName).toBe("my-test-bucket");
    expect(validArgs.versioning).toBe(true);
    expect(validArgs.encryption).toBe(true);
    expect(validArgs.publicReadAccess).toBe(false);
    expect(validArgs.tags?.Environment).toBe("Test");
    expect(validArgs.tags?.Project).toBe("K3S");
  });

  it("should handle optional properties", () => {
    const minimalArgs: S3BucketArgs = {};
    
    expect(minimalArgs.bucketName).toBeUndefined();
    expect(minimalArgs.versioning).toBeUndefined();
    expect(minimalArgs.encryption).toBeUndefined();
    expect(minimalArgs.publicReadAccess).toBeUndefined();
    expect(minimalArgs.tags).toBeUndefined();
  });

  it("should handle partial arguments", () => {
    const partialArgs: S3BucketArgs = {
      bucketName: "partial-bucket",
      versioning: true
    };
    
    expect(partialArgs.bucketName).toBe("partial-bucket");
    expect(partialArgs.versioning).toBe(true);
    expect(partialArgs.encryption).toBeUndefined();
    expect(partialArgs.publicReadAccess).toBeUndefined();
    expect(partialArgs.tags).toBeUndefined();
  });

  it("should handle boolean flags correctly", () => {
    const booleanTestCases = [
      { versioning: true, encryption: false, publicReadAccess: true },
      { versioning: false, encryption: true, publicReadAccess: false },
      { versioning: true, encryption: true, publicReadAccess: true },
      { versioning: false, encryption: false, publicReadAccess: false }
    ];

    booleanTestCases.forEach((testCase, index) => {
      const args: S3BucketArgs = {
        bucketName: `test-bucket-${index}`,
        ...testCase
      };

      expect(args.versioning).toBe(testCase.versioning);
      expect(args.encryption).toBe(testCase.encryption);
      expect(args.publicReadAccess).toBe(testCase.publicReadAccess);
    });
  });

  it("should handle empty and populated tags", () => {
    const emptyTagsArgs: S3BucketArgs = {
      tags: {}
    };

    const populatedTagsArgs: S3BucketArgs = {
      tags: {
        Environment: "Production",
        Owner: "DevOps",
        Project: "K3S",
        CostCenter: "Engineering",
        Application: "Storage"
      }
    };

    expect(Object.keys(emptyTagsArgs.tags || {})).toHaveLength(0);
    expect(Object.keys(populatedTagsArgs.tags || {})).toHaveLength(5);
    expect(populatedTagsArgs.tags?.Application).toBe("Storage");
  });
});