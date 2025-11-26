import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = async (route, state) => {
    const keycloak = inject(KeycloakService);
    const router = inject(Router);

    const isLoggedIn = await keycloak.isLoggedIn();

    if (!isLoggedIn) {
        await keycloak.login({
            redirectUri: window.location.origin + state.url
        });
        return false;
    }

    return true;
};
