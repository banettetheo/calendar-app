import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FeedEvent {
  id: number;
  title: string;
  organizer: string;
  date: Date;
  location: string;
  image: string;
  description: string;
  subscribed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Event {
  private events: FeedEvent[] = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      organizer: 'TechWorld',
      date: new Date(2025, 10, 15),
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      description: 'Join us for the biggest tech conference of the year featuring top speakers from around the globe.',
      subscribed: false
    },
    {
      id: 2,
      title: 'Art Exhibition Opening',
      organizer: 'Modern Art Gallery',
      date: new Date(2025, 10, 20),
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80',
      description: 'Experience the latest works from emerging artists in our new collection.',
      subscribed: true
    },
    {
      id: 3,
      title: 'Music Festival',
      organizer: 'SoundWave',
      date: new Date(2025, 11, 5),
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1459749411177-8c275341e5dd?auto=format&fit=crop&w=800&q=80',
      description: 'Three days of music, food, and fun under the stars.',
      subscribed: false
    },
    {
      id: 4,
      title: 'Startup Pitch Night',
      organizer: 'VentureHub',
      date: new Date(2025, 11, 12),
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      description: 'Watch 10 startups pitch their ideas to a panel of investors.',
      subscribed: false
    }
  ];

  private eventsSubject = new BehaviorSubject<FeedEvent[]>(this.events);
  events$ = this.eventsSubject.asObservable();

  toggleSubscription(event: FeedEvent) {
    event.subscribed = !event.subscribed;
    this.eventsSubject.next([...this.events]);
  }
}
