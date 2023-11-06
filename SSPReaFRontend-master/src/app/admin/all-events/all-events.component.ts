import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Event } from 'src/core/models/event.model';
import { Category } from 'src/core/models/category.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { EventRequest } from 'src/core/models/request/event-request.model';
import { CharacterService } from 'src/core/services/characterService';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'],
})
export class AllEventsComponent implements OnInit {
  constructor(private router: Router, private service: ApiService) {
    this.selectedEditEvent = new Event();
    this.eventRequest = new EventRequest();
  }
  showModal = false;
  selectedEditEvent?: Event;
  selectedCategory?: number;
  events?: Event[];
  categories?: Category[];
  isCreate?: boolean = false;
  selectedImage: File | null = null;
  text?: string;
  info?: string;
  eventRequest!: EventRequest;

  ngOnInit(): void {
    this.getAllEvents();
    this.getAllCategories();
    this.createEvent();
  }

  async uploadProfileImage(text?: string) {
    if (this.selectedImage) {
      const selectedImageCopy: File = new File(
        [this.selectedImage],
        this.text + '.jpeg',
        {
          type: this.selectedImage.type,
        }
      );
      this.selectedImage = selectedImageCopy;

      await this.service.uploadProfileImage(this.selectedImage).subscribe(
        (response) => {
          // Yükleme başarılı
          console.log('Resim yükleme başarılı:', response);
          // Profil resmi ile ilgili başka işlemleri yapabilirsiniz
        },
        (error) => {
          // Yükleme sırasında hata oluştu
          console.error('Resim yükleme hatası:', error);
        }
      );
    } else {
      // Resim seçilmedi
      console.error('Lütfen bir resim seçin.');
    }
  }

  getAllEvents() {
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data.sort((a, b) => a.id! - b.id!);
    });
  }
  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }

  selectCategoryOnModal() {
    document
      .getElementById('selectCategory')
      ?.addEventListener('click', (event) => {
        this.selectedCategory = Number(
          (event.target as HTMLInputElement).value
        );

        //console.log(this.selectedCategory);
      });
  }
  getAllCategories() {
    this.service.getAllEntities(Category).subscribe((response) => {
      this.categories = response.data.sort((a, b) => a.id! - b.id!);
      // console.log(this.categories);
    });
  }

  //Modal Aç-Kapa
  openAddModal() {
    this.selectedEditEvent = new Event();
    this.showModal = true;
    this.getAllCategories();
    this.isCreate = true;
    this.selectedCategory = 0;
    this.info = 'Etkinlik Ekle';
    this.createEvent();
  }

  openModal(event?: Event) {
    this.info = 'Etkinlik Güncelle';
    this.isCreate = false;
    this.showModal = true;
    this.selectedEditEvent = event;
    this.selectedCategory = event?.categoryId;
    this.getAllCategories();
    this.selectCategoryOnModal();
  }

  closeModal() {
    this.showModal = false;
    this.getAllEvents();
    this.categories = [];
    this.selectedCategory = undefined;
    this.selectedEditEvent = undefined;
  }

  //Etkinlik Ekle-Sil-Güncelle metodları
  confirmDelete(id: any,path:string) {

    const confirmDelete = window.confirm('Silmek istiyor musunuz?');
    if (confirmDelete) {
     this.service.deleteImage(path);
     console.log("silme çalıştı")
     
      let status = this.service.deleteEntity(id, Event);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('etkinlik silindi!');
          this.getAllEvents();
        } else {
          window.alert('silme işleminde hata oluştu');
        }
      });
    } else {
      window.alert('Silme işlemi iptal edildi');
    }
  }
  createEvent() {
    // console.log('ekleme çalıştı');
    this.selectedEditEvent!.categoryId = this.selectedCategory;
    this.text =
      this.selectedEditEvent?.categoryId +
      '_' +
      this.selectedEditEvent?.creatorId +
      '_' +
      this.selectedEditEvent?.title?.substring(0, 20);
      this.text=CharacterService.TurkishCharacterFix(this.text);
    this.uploadProfileImage(this.text);
    this.selectedEditEvent!.imagePath =
      'http://localhost:5258/api/Image/GetImage?resimKimlik=' +
      this.text +
      '.jpeg';
    // console.log(this.selectedEditEvent);
    this.service
      .getProfileInfo()
      .subscribe((user) => (this.selectedEditEvent!.creatorId = user.data.id));

    //ng modeldan gelen verileri event Requeste aktardık
    this.eventRequest!.creatorId = this.selectedEditEvent?.creatorId;
    this.eventRequest!.startDate = new Date(this.selectedEditEvent?.startDate?.toString()+':00.000Z');
    this.eventRequest!.finishDate = new Date(this.selectedEditEvent?.finishDate?.toString()+':00.000Z');
    this.eventRequest!.description = this.selectedEditEvent?.description;
    this.eventRequest!.imagePath = this.selectedEditEvent?.imagePath;
    this.eventRequest!.title = this.selectedEditEvent?.title;
    this.eventRequest!.limit = this.selectedEditEvent?.limit;
    this.eventRequest!.categoryId = this.selectedCategory;
    this.eventRequest != this.selectedCategory;
    // console.log(this.eventRequest.categoryId)
    //console.log(this.eventRequest)
    let status = this.service.createEntity(this.eventRequest!, 'Event');
    status.then((response) => {
      if (response?.status == ResponseStatus.Ok) {
        window.alert('etkinlik eklendi');
        this.getAllCategories();
      } else {
        window.alert('etkinlik eklerken bir hata oluştu');
      }
    });
  }
  async updateEvent() {
    console.log("güncelleme çalıştı");

    this.selectedEditEvent!.categoryId = this.selectedCategory;
    this.selectedEditEvent!.finishDate=new Date(this.selectedEditEvent?.finishDate?.toString()+':00.000Z');
    this.selectedEditEvent!.startDate=new Date(this.selectedEditEvent?.startDate?.toString()+':00.000Z');
     console.log(this.selectedEditEvent);
    if (this.selectedImage != null) {
      this.text =
        this.selectedEditEvent?.categoryId +
        '_' +
        this.selectedEditEvent?.creatorId +
        '_' +
        this.selectedEditEvent?.title?.substring(0, 20);
        this.text=CharacterService.TurkishCharacterFix(this.text);
      this.uploadProfileImage(this.text);
      this.selectedEditEvent!.imagePath =
        'http://localhost:5258/api/Image/GetImage?resimKimlik=' +
        this.text +
        '.jpeg';
    }
    let status = await this.service.updateEntity(
      this.selectedEditEvent!.id!,
      this.selectedEditEvent,
      Event
    );
    if (status?.status == ResponseStatus.Ok) {
      alert('Güncelleme Başarılı');
      this.showModal = false;
      this.closeModal();
    } else {
      alert('Güncelleme Başarısız');
    }
  }
}
