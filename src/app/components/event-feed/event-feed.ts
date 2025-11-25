import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Event, FeedEvent } from '../../services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-feed',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './event-feed.html',
  styleUrl: './event-feed.scss',
})
export class EventFeedComponent implements OnInit, OnDestroy {
  events: FeedEvent[] = [];
  private subscription?: Subscription;

  constructor(private eventService: Event, private router: Router) { }

  ngOnInit() {
    this.subscription = this.eventService.events$.subscribe(events => {
      this.events = events;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleSubscription(event: FeedEvent) {
    this.eventService.toggleSubscription(event);
  }

  viewEventDetails(event: FeedEvent) {
    this.router.navigate(['/event', 'feed', event.id]);
  }
}
