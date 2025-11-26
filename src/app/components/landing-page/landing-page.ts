import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
    templateUrl: './landing-page.html',
    styleUrl: './landing-page.scss'
})
export class LandingPageComponent {
    features = [
        {
            icon: 'calendar_today',
            title: 'Smart Calendar',
            description: 'Organize your life with our intuitive and beautiful calendar interface.'
        },
        {
            icon: 'event_note',
            title: 'Event Feed',
            description: 'Discover and subscribe to interesting events happening around you.'
        },
        {
            icon: 'chat',
            title: 'Real-time Chat',
            description: 'Connect with other attendees and discuss event details instantly.'
        }
    ];

    constructor(private router: Router) { }

    launchApp() {
        this.router.navigate(['/calendar']);
    }
}
