import { KeycloakService } from 'keycloak-angular';
import { KeycloakInfoService } from '../services/keycloak-info.service';
import { isDevMode } from '@angular/core';

export function initializer(keycloak: KeycloakService, keycloakInfoService: KeycloakInfoService): () => Promise<void> {
  return (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (isDevMode()) {
          await keycloak.init({
            config: {
              url: 'http://localhost:8080/auth',
              realm: 'iact-realm',
              clientId: 'iact-check-webapp',
            },
            loadUserProfileAtStartUp: true,
            initOptions: {
              checkLoginIframe: false,
              flow: 'implicit',
            },
            bearerExcludedUrls: [],
          });
          resolve();
        } else {
          keycloakInfoService.getKeycloakInfo().subscribe(async (keycloakInfo) => {
            await keycloak.init({
              config: {
                url: keycloakInfo.authServerUrl,
                realm: keycloakInfo.realm,
                clientId: 'iact-check-webapp',
              },
              loadUserProfileAtStartUp: true,
              initOptions: {
                checkLoginIframe: true,
                flow: 'implicit',
              },
              bearerExcludedUrls: [],
            });
            resolve();
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}
