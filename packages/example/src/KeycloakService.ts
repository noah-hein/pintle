import {Resource, Service} from "@pintle/core";


@Service({
  namespace: "keycloak",
})
export class KeycloakService {


  @Resource()
  deployment = () => ({

  })

}
