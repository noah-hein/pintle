import { Pintle } from "./pintle";
import { Templates } from "@pintle/templates";

describe("pintle", () => {
  test("create", () => {
    Pintle.create([
      {
        name: "foobar",
        resources: [
          Templates.namespace("foobar"),
          Templates.namespace("what"),
          Templates.namespace("the")
        ],
        modules: [
          {
            name: "ark-server",
            resources: [
              Templates.namespace("ark-server")
            ],
          }
        ]
      }
    ]);
  });
})
