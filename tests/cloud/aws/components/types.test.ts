import { InstanceArgs } from "../../../../src/cloud/aws/components/types";

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