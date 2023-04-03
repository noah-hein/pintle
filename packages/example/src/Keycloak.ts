import {Resource, Service} from "@pintle/core";


@Service({
  namespace: "keycloak",
})
export class Keycloak {


  @Resource()
  deployment = () => ({

  })

}
