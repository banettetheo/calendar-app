import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Event, FeedEvent } from '../../services/event.service';
import { Subscription } from 'rxjs';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvents: boolean;
}

interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  description: string;
  date: Date;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class CalendarComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  days: CalendarDay[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  selectedDate: Date | null = null;
  selectedEvents: CalendarEvent[] = [];

  // Personal events
  personalEvents: CalendarEvent[] = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', description: 'Weekly sync with the team.', date: new Date() },
    { id: 2, title: 'Lunch with Client', time: '12:30 PM', description: 'Discuss project roadmap.', date: new Date() },
    { id: 3, title: 'Code Review', time: '03:00 PM', description: 'Review PR #123.', date: new Date() }
  ];

  // All events (personal + subscribed)
  events: CalendarEvent[] = [];
  private subscription?: Subscription;

  constructor(private eventService: Event, private router: Router) { }

  ngOnInit() {
    this.subscription = this.eventService.events$.subscribe(feedEvents => {
      // Merge personal events with subscribed feed events
      const subscribedEvents = feedEvents
        .filter(e => e.subscribed)
        .map(e => this.convertFeedEventToCalendarEvent(e));

      this.events = [...this.personalEvents, ...subscribedEvents];
      this.generateCalendar();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private convertFeedEventToCalendarEvent(feedEvent: FeedEvent): CalendarEvent {
    return {
      id: feedEvent.id + 1000, // Offset to avoid ID conflicts
      title: feedEvent.title,
      time: 'All Day',
      description: feedEvent.description,
      date: feedEvent.date
    };
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startingDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();

    this.days = [];

    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const date = new Date(year, month, -i);
      this.days.unshift({
        date: date,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: false
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      this.days.push({
        date: date,
        isCurrentMonth: true,
        isToday: this.isSameDate(date, new Date()),
        hasEvents: this.events.some(e => this.isSameDate(e.date, date))
      });
    }

    // Next month days to fill grid (6 rows * 7 days = 42)
    const remainingDays = 42 - this.days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      this.days.push({
        date: date,
        isCurrentMonth: false,
        isToday: false,
        hasEvents: false
      });
    }
  }

  isSameDate(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
    this.selectedDate = null; // Deselect on month change
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
    this.selectedDate = null;
  }

  selectDate(day: CalendarDay) {
    this.selectedDate = day.date;
    this.selectedEvents = this.events.filter(e => this.isSameDate(e.date, day.date));

    // If no events for this day, maybe add a dummy one for demo if it's today
    if (this.selectedEvents.length === 0 && day.isToday) {
      // Keep empty to show "No events" state
    }
  }

  closeDetails() {
    this.selectedDate = null;
  }

  viewEventDetails(event: CalendarEvent) {
    this.router.navigate(['/event', 'calendar', event.id], {
      state: { event }
    });
  }
}
