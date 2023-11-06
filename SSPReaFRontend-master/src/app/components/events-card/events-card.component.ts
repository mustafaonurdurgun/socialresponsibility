import { Component, Input } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-card',
  templateUrl: './events-card.component.html',
  styleUrls: ['./events-card.component.css']
})
export class EventsCardComponent {
  @Input() cardColor: String = "light blue";
  cardColors = ["light blue", "light green", "light yellow", "light red"];
  pageCount: number = 0;

  constructor(private service: ApiService, private router: Router) { }

  events?: Event[];
  currentPage: number = 1;
  pageCardCount:number=2;

  ngOnInit(): void {
    this.getAllEvents();
    this.getDisplayedEvents();



  }


  getAllEvents() {
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data;

    });
  }

  eventDetail(id1: any) {
    this.router.navigate(['/event-detail'], { queryParams: { id: id1 } });

  }

  getDisplayedEvents(): Event[] {
    const startIndex = (this.currentPage - 1) * this.pageCardCount;
    const endIndex = Math.min(startIndex + this.pageCardCount, this.events!.length);
    console.log(this.events!.slice(startIndex, endIndex));
    this.pageCount = Math.round(this.events!.length / this.pageCardCount)
    return this.events!.slice(startIndex, endIndex);

  }
  nextPage() {
    if (this.currentPage < Math.ceil(this.events!.length / this.pageCardCount)) {
      this.currentPage++;
    }
    this.getDisplayedEvents();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.getDisplayedEvents();
  }

  generateNumbers(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  goThatPage(num: number) {
    this.currentPage = num;
    this.getDisplayedEvents();
  }



}



