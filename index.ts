import { Instance } from "./src/cloud/aws/components/instance";

const instance = new Instance("veryFirstInstance", {
    instanceType: "t2.micro",
    ami: "ami-09042b2f6d07d164a", // 16.04 LTS
    tags: {
        Name: "ManualProvisionerInstance",
        Environment: "Test",
    },
    subnetId: "subnet-08f9297b6109d74b7",
    vpcId: "vpc-057aa31907a0d6171",
})

export const instanceId = instance.instance.id;
