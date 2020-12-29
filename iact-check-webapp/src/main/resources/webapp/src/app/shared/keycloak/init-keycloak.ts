import { KeycloakService } from 'keycloak-angular';
import { KeycloakInfoService } from '../services/keycloak-info.service';

export function initializer(
  keycloak: KeycloakService,
  keycloakInfoService: KeycloakInfoService
): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        keycloakInfoService
          .getKeycloakInfo()
          .subscribe(async (keycloakInfo) => {
            await keycloak.init({
              config: {
                url: keycloakInfo.authServerUrl,
                realm: keycloakInfo.realm,
                clientId: 'iact-check-webapp',
              },
              loadUserProfileAtStartUp: false,
              initOptions: {
                checkLoginIframe: true,
              },
              bearerExcludedUrls: [],
            });
            resolve();
          });
      } catch (error) {
        reject(error);
      }
    });
  };
}
