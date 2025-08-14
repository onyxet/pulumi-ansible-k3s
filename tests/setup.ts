import * as pulumi from "@pulumi/pulumi";

// Mock Pulumi runtime for testing
pulumi.runtime.setMocks({
  newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: Record<string, unknown>} {
    return {
      id: args.inputs.name + "_id",
      state: args.inputs,
    };
  },
  call: function(args: pulumi.runtime.MockCallArgs) {
    return args.inputs;
  },
});