import { FileTypes, Pintle } from 'pintle';
import { keycloak } from './KeycloakService';

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
