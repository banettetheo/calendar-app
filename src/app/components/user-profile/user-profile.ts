import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { UnifiedUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { KEYCLOAK_CONFIG } from '../../core/auth/keycloak.config';

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
    user!: UnifiedUser;
    isLoading = true;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getMe().subscribe({
            next: (user) => {
                this.user = user;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to load user profile', err);
                this.isLoading = false;
            }
        });
    }

    getInitials(): string {
        return (this.user.firstName[0] + this.user.lastName[0]).toUpperCase();
    }

    editAccount(): void {
        const accountUrl = `${KEYCLOAK_CONFIG.url}/realms/${KEYCLOAK_CONFIG.realm}/account`;
        window.open(accountUrl, '_blank');
    }
}
