import { Pintle } from "./pintle";
import { DefaultTemplates } from "@pintle/templates";

describe("pintle", () => {
  test("create", () => {
    Pintle.create([
      {
        name: "foobar",
        resources: [
          DefaultTemplates.namespace("foobar"),
          DefaultTemplates.namespace("what"),
          DefaultTemplates.namespace("the"),
        ],
        modules: [
          {
            name: "ark-server",
            resources: [DefaultTemplates.namespace("ark-server")],
          },
        ],
      },
    ]);
  });
});
