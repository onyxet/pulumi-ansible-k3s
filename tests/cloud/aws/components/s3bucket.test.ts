import { S3Bucket } from "../../../../src/cloud/aws/components/s3bucket";
import { S3BucketArgs } from "../../../../src/cloud/aws/components/types";

describe("S3Bucket Component", () => {
  let bucket: S3Bucket;

  afterEach(() => {
    // Clean up any resources if needed
  });

  it("should create a basic S3 bucket with default settings", () => {
    bucket = new S3Bucket("test-bucket");
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketVersioning).toBeUndefined();
    expect(bucket.bucketEncryption).toBeUndefined();
    expect(bucket.bucketPublicAccessBlock).toBeDefined(); // Should be created by default
  });

  it("should create a bucket with custom name", () => {
    const args: S3BucketArgs = {
      bucketName: "my-custom-bucket-name"
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
  });

  it("should create a bucket with versioning enabled", () => {
    const args: S3BucketArgs = {
      versioning: true
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketVersioning).toBeDefined();
  });

  it("should create a bucket with encryption enabled", () => {
    const args: S3BucketArgs = {
      encryption: true
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketEncryption).toBeDefined();
  });

  it("should create a bucket with public read access", () => {
    const args: S3BucketArgs = {
      publicReadAccess: true
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketPublicAccessBlock).toBeUndefined(); // Should not be created when public access is allowed
  });

  it("should create a bucket with tags", () => {
    const args: S3BucketArgs = {
      tags: {
        Environment: "Test",
        Project: "K3S",
        Owner: "DevOps"
      }
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
  });

  it("should create a bucket with all features enabled", () => {
    const args: S3BucketArgs = {
      bucketName: "full-featured-bucket",
      versioning: true,
      encryption: true,
      publicReadAccess: false,
      tags: {
        Environment: "Production",
        Project: "K3S",
        Owner: "DevOps",
        CostCenter: "Engineering"
      }
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketVersioning).toBeDefined();
    expect(bucket.bucketEncryption).toBeDefined();
    expect(bucket.bucketPublicAccessBlock).toBeDefined();
  });

  it("should handle empty args object", () => {
    bucket = new S3Bucket("test-bucket", {});
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketVersioning).toBeUndefined();
    expect(bucket.bucketEncryption).toBeUndefined();
    expect(bucket.bucketPublicAccessBlock).toBeDefined();
  });

  it("should have the correct resource type", () => {
    bucket = new S3Bucket("test-bucket");
    expect(bucket.urn).toBeDefined();
  });

  it("should handle versioning disabled explicitly", () => {
    const args: S3BucketArgs = {
      versioning: false
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketVersioning).toBeUndefined();
  });

  it("should handle encryption disabled explicitly", () => {
    const args: S3BucketArgs = {
      encryption: false
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
    expect(bucket.bucketEncryption).toBeUndefined();
  });

  it("should handle empty tags", () => {
    const args: S3BucketArgs = {
      tags: {}
    };

    bucket = new S3Bucket("test-bucket", args);
    
    expect(bucket).toBeDefined();
    expect(bucket.bucket).toBeDefined();
  });
});