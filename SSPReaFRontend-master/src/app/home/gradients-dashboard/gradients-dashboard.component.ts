import { Component } from '@angular/core';
import { Event } from 'src/core/models/event.model';
import { EventParticipant } from 'src/core/models/eventParticipant.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-gradients-dashboard',
  templateUrl: './gradients-dashboard.component.html',
  styleUrls: ['./gradients-dashboard.component.css'],
})
export class GradientsDashboardComponent {
  events: Event[] = [];
  eventParticipants: EventParticipant[] = [];

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.getAllEventParticipant();
    this.getAllEvents();
  }

  getAllEventParticipant() {
    this.apiService.getAllEntities(EventParticipant).subscribe((response) => {
      this.eventParticipants = response.data;
      // console.log('çıktı');
      // console.log(this.eventParticipants);
    });
  }

  getAllEvents() {
    this.apiService.getAllEntities(Event).subscribe((response) => {
      this.events = response.data;
    });
  }
  participantCount(categoryId: number): number {
    let x: number = 0;
    x = this.eventParticipants.filter(
      (f) => f.event?.categoryId == categoryId
    ).length;
    return x;
  }
  eventCount(categoryId: number): number {
    let x: number = 0;
    x = this.events.filter((f) => f.categoryId == categoryId).length;
    return x;
  }
}
