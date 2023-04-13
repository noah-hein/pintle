import { FileTypes, Pintle } from 'pintle';
import { keycloak } from './KeycloakService';

export function bootstrap() {
  Pintle.create(
    {
      apply: false,
      file: {
        outputDir: 'dist/test',
        singleFile: true,
        type: FileTypes.YAML,
      }
    },
    {
      keycloak,
    }
  );
}
bootstrap()
