export interface InstanceArgs {
    instanceType: string;
    ami: string;
    tags: { [key: string]: string };
    subnetId: string;
    vpcId: string
}

export interface S3BucketArgs {
    bucketName?: string;
    versioning?: boolean;
    encryption?: boolean;
    publicReadAccess?: boolean;
    tags?: { [key: string]: string };
}
