import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { KeycloakService } from 'keycloak-angular';
import { BusinessUser, MOCK_USER } from '../../models/business-user.model';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatTabsModule
    ],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.scss'
})
export class UserProfileComponent implements OnInit {
    user: BusinessUser = MOCK_USER;
    isLoading = true;

    constructor(private keycloak: KeycloakService) { }

    async ngOnInit() {
        // Simulate API call
        setTimeout(async () => {
            // In a real app, we would fetch the business user data here
            // For now, we mix Keycloak profile with our mock data
            try {
                const keycloakProfile = await this.keycloak.loadUserProfile();
                this.user = {
                    ...this.user,
                    firstName: keycloakProfile.firstName || this.user.firstName,
                    lastName: keycloakProfile.lastName || this.user.lastName,
                    email: keycloakProfile.email || this.user.email
                };
            } catch (e) {
                console.error('Failed to load keycloak profile', e);
            }
            this.isLoading = false;
        }, 500);
    }

    getInitials(): string {
        return (this.user.firstName[0] + this.user.lastName[0]).toUpperCase();
    }
}
