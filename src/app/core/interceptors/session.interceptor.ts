import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
    constructor(private keycloak: KeycloakService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // Si l'erreur est 401 (Non autorisé), cela signifie probablement que le token est expiré
                if (error.status === 401) {
                    return of(this.keycloak.isLoggedIn()).pipe(
                        switchMap(isLoggedIn => {
                            if (!isLoggedIn) {
                                // Session expirée complètement, on renvoie vers le login
                                from(this.keycloak.login());
                                return throwError(() => error);
                            } else {
                                // On tente de rafraîchir le token
                                return from(this.keycloak.updateToken(20)).pipe(
                                    switchMap(() => {
                                        // On renvoie l'erreur originale, KeycloakBearerInterceptor 
                                        // devrait normalement gérer le retry si configuré, 
                                        // sinon l'utilisateur verra l'erreur et devra recharger.
                                        return throwError(() => error);
                                    }),
                                    catchError(() => {
                                        this.keycloak.login();
                                        return throwError(() => error);
                                    })
                                );
                            }
                        })
                    );
                }
                return throwError(() => error);
            })
        );
    }
}
