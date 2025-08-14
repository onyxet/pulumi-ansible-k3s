import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { S3BucketArgs } from "./types"

export class S3Bucket extends pulumi.ComponentResource {
    public readonly bucket: aws.s3.Bucket;
    public readonly bucketVersioning?: aws.s3.BucketVersioningV2;
    public readonly bucketEncryption?: aws.s3.BucketServerSideEncryptionConfigurationV2;
    public readonly bucketPublicAccessBlock?: aws.s3.BucketPublicAccessBlock;

    constructor(name: string, args: S3BucketArgs = {}, opts?: pulumi.ComponentResourceOptions) {
        super("aws:cloud:S3Bucket", name, args, opts);

        // Create the S3 bucket
        this.bucket = new aws.s3.Bucket(name, {
            bucket: args.bucketName,
            tags: args.tags || {},
        }, { parent: this });

        // Configure versioning if requested
        if (args.versioning) {
            this.bucketVersioning = new aws.s3.BucketVersioningV2(`${name}-versioning`, {
                bucket: this.bucket.id,
                versioningConfiguration: {
                    status: "Enabled",
                },
            }, { parent: this });
        }

        // Configure encryption if requested
        if (args.encryption) {
            this.bucketEncryption = new aws.s3.BucketServerSideEncryptionConfigurationV2(`${name}-encryption`, {
                bucket: this.bucket.id,
                rules: [{
                    applyServerSideEncryptionByDefault: {
                        sseAlgorithm: "AES256",
                    },
                }],
            }, { parent: this });
        }

        // Block public access unless explicitly allowed
        if (!args.publicReadAccess) {
            this.bucketPublicAccessBlock = new aws.s3.BucketPublicAccessBlock(`${name}-public-access-block`, {
                bucket: this.bucket.id,
                blockPublicAcls: true,
                blockPublicPolicy: true,
                ignorePublicAcls: true,
                restrictPublicBuckets: true,
            }, { parent: this });
        }

        this.registerOutputs({
            bucketName: this.bucket.bucket,
            bucketArn: this.bucket.arn,
        });
    }
}