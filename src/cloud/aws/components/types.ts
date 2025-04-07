export interface InstanceArgs {
    instanceType: string;
    ami: string;
    tags: { [key: string]: string };
    subnetId: string;
    vpcId: string
}
