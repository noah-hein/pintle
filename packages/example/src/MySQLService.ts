import {Resource, Service} from "@pintle/core";

@Service({
  namespace: "mysql"
})
export class MySQLService {


  @Resource()
  deployment() {

  }

}
