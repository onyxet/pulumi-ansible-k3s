import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { InstanceArgs } from "./types"

export class Instance extends pulumi.ComponentResource {
    // TODO: Implement outputs later
    // public readonly instanceId: pulumi.Output<string>
    public readonly instance: aws.ec2.Instance
    constructor(name: string, args: InstanceArgs, opts?: pulumi.ComponentResourceOptions) {
        super("aws:cloud:Instance", name, args, opts)
        this.instance = new aws.ec2.Instance(name, args, { parent: this })
    
        this.registerOutputs({})
    }
}
