import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';
import { User } from 'src/core/models/user.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { EventParticipantRequest } from 'src/core/models/request/eventParticipant-request.model';
import { EventParticipant } from 'src/core/models/eventParticipant.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent {
  @Input() cardColor: String = 'light blue';
  cardColors = ['light blue', 'light green', 'light yellow', 'light red'];
  id?: any;
  event?: Event;
  currentUser!: User;
  eventParticipant!: EventParticipantRequest;
  allEventParticipants!: EventParticipant[];
  participantStatus?: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      // Veriyi kullanabilirsiniz
      
    });
    this.eventParticipant = new EventParticipantRequest();
  }

  ngOnInit(): void {
    this.getEventById(this.id);
    this.getProfileInfo();
    this.checkParticipant();
    // this.participantControl();
  }

  getEventById(id: any) {
    this.apiService.getEntityById(id, Event).then((response) => {
      this.event = response?.data;
      console.log(this.event?.imagePath+"image")
    });
  }
  async leavePaticipant() {
    
    if (this.participantStatus == true) {
     var response= await this.apiService
        .deleteEntity(this.allEventParticipants[0].id!, EventParticipant)
        
          if (response?.status == ResponseStatus.Ok) {
            window.alert('Katılım Başarıyla iptal edildi.');
            location.reload();
          } else {
            window.alert('Katılım iptal edilemedi.');
          }
      
    } else {
      window.alert('Katılım iptal edilemedi.');
    }
  }
  checkParticipant() {
    this.apiService.getAllEntities(EventParticipant).subscribe((response) => {
      this.allEventParticipants = response.data.filter(
        (f) => f.userId == this.currentUser.id && f.eventId == this.id
      );
      let i = this.allEventParticipants.length;
      if (i > 0) {
        this.participantStatus = true;
      } else {
        this.participantStatus = false;
      }
    });
  }
  async joinEvent() {
    this.apiService.getAllEntities(EventParticipant).subscribe((response) => {
      this.allEventParticipants = response.data.filter(
        (f) => f.userId == this.currentUser.id && f.eventId == this.id
      );
      let i = this.allEventParticipants.length;
      if (i > 0) {
        this.participantStatus = true;
      } else {
        this.participantStatus = false;
      }
    });
    if (this.participantStatus == true) {
      window.alert('Zaten katıldınız ' + this.currentUser.fullName);
    } else {
      this.eventParticipant!.userId = this.currentUser.id;
      this.eventParticipant!.eventId = this.id;
      console.log(this.eventParticipant + 'join');
      let status = await this.apiService.createEntity(
        this.eventParticipant!,
        'EventParticipant'
      );
      console.log(status);
      if (status?.status == ResponseStatus.Ok) {
        window.alert('Katılım Başarıyla sağlandı.');
      } else {
        window.alert('Katılım Başarısız');
      }
    }
    location.reload();

  }

  getProfileInfo() {
    this.apiService.getProfileInfo().subscribe((user) => {
      this.currentUser = user.data;
      if (this.currentUser.imagePath == null) {
        this.currentUser.imagePath =
          'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg';
      }
    });
  }
}

// TypeScript ile seçilen tabı göster veya gizle
const tabs: NodeListOf<Element> = document.querySelectorAll('.tab-button');
const tabContents: NodeListOf<Element> =
  document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Tüm tabları gizle
    tabContents.forEach((content) => {
      content.classList.add('hidden');
    });

    // Tıklanan tabın içeriğini göster
    const targetId: string | null = tab.getAttribute('data-tabs-target');
    const targetContent: Element | null = document.querySelector(
      targetId || ''
    );
    if (targetContent) {
      targetContent.classList.remove('hidden');
    }
  });
});
