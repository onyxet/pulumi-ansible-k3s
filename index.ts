import { Instance } from "./src/cloud/aws/components/instance";
import { S3Bucket } from "./src/cloud/aws/components/s3bucket";

const instance = new Instance("veryFirstInstance", {
    instanceType: "t2.micro",
    ami: "ami-09042b2f6d07d164a", // 16.04 LTS
    tags: {
        Name: "ManualProvisionerInstance",
        Environment: "Test",
        Owner: "Pulumi",
    },
    subnetId: "subnet-08f9297b6109d74b7",
    vpcId: "vpc-057aa31907a0d6171",
})

const s3Bucket = new S3Bucket("k3s-storage-bucket", {
    bucketName: "k3s-cluster-storage",
    versioning: true,
    encryption: true,
    publicReadAccess: false,
    tags: {
        Name: "K3S Cluster Storage",
        Environment: "Test",
        Owner: "Pulumi",
        Project: "K3S",
    },
})

export const instanceId = instance.instance.id;
export const bucketName = s3Bucket.bucket.bucket;
export const bucketArn = s3Bucket.bucket.arn;
