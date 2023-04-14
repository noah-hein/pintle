import { FileTypes, Pintle } from 'pintle';
import { keycloak } from './KeycloakService';

export function bootstrap() {
  Pintle.create(
    {
      file: {
        outputDir: 'dist/test',
        singleFile: false,
        type: FileTypes.YAML,
      }
    },
    [
      {
        name: "keycloak",
        children: [
          {
            name: "test",
            children: [],
            resources: keycloak
          }
        ],
        resources: keycloak
      }
    ]
  );
}
bootstrap()
