import { Component } from '@angular/core';
import { EventParticipant } from 'src/core/models/eventParticipant.model';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-all-event-participant',
  templateUrl: './all-event-participant.component.html',
  styleUrls: ['./all-event-participant.component.css'],
})
export class AllEventParticipantComponent {
  eventParticipants?: EventParticipant[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.LoadEventParticipants();
  }

  LoadEventParticipants() {
    this.apiService.getAllEntities(EventParticipant).subscribe((res) => {
      this.eventParticipants = res.data;
    });
  }
  confirmDelete(id: any) {
    const confirmDelete = window.confirm('Silmek istiyor musunuz?');
    if (confirmDelete) {
      let status = this.apiService.deleteEntity(id, EventParticipant);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('Silme işlemi başarılı!');
          this.LoadEventParticipants();
        } else {
          window.alert('Silme işleminde hata oluştu');
        }
      });
    } else {
      window.alert('Silme işlemi iptal edildi');
    }
  }
}
