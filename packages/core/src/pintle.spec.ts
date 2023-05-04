import {Pintle} from "./pintle";
import { Templates } from "@pintle/templates";

describe("Pintle", () => {
  test("create", () => {
    const pintle = Pintle.create([
      {
        name: "foobar",
        resources: [Templates.namespace]
      }
    ]);
    console.log(pintle)
    console.log("What the fuck!")
    //expect()
  });
})

