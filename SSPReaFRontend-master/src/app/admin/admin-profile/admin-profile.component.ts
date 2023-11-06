import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/core/models/comment.model';
import { Event } from 'src/core/models/event.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  users: User[] = [];
  resimKimlik!: string;
  resimUrl!: string;
  selectedImage: File | null = null;
  showModal = false;
  currentUser?: User | null;

  userCount?: number;
  eventCount?: number;
  commentCount?: number;

  constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getEvents();
    this.getComments();
    this.apiService.getProfileInfo().subscribe((user) => {
      this.currentUser = user.data;
      // console.log('imagepath:' + this.currentUser.imagePath);
    });
  }
  //Profil düzemleme modalının aç kapa metodları
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    location.reload();
  }
  //Modalda resim seçildiği zaman
  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }
  //Kullancı Pprofil bilgileri güncelleme işlemleri
  async updateUser() {
    this.currentUser!.imagePath =
      'http://localhost:5258/api/Image/GetImage?resimKimlik=' +
      this.currentUser!.email +
      '.jpeg';
    const maleRadioButton = document.querySelector('input[name="IsMale"]:checked') as HTMLInputElement;
    const selectedValue = maleRadioButton.value;

    if (selectedValue == 'true')
      this.currentUser!.isMale = true;
    else if (selectedValue == 'false')
      this.currentUser!.isMale = false;


    let status = await this.apiService.updateEntity(
      this.currentUser!.id,
      this.currentUser,
      User
    );
    if (status?.status == ResponseStatus.Ok) {
      await this.uploadProfileImage();

      window.alert('Güncelleme Başarılı.');
      this.currentUser;
    } else {
      window.alert('Güncelleme Başarısız!');
      this.authService.currentUser.subscribe((user) => {
        this.currentUser = user;
      });
    }

    this.closeModal();
  }

  //apiye seçilen resmi yükleme metodu
  uploadProfileImage() {
    if (this.selectedImage) {
      const selectedImageCopy: File = new File(
        [this.selectedImage],
        this.currentUser!.email + '.jpeg',
        {
          type: this.selectedImage.type,
        }
      );
      this.selectedImage = selectedImageCopy;

      this.apiService.uploadProfileImage(this.selectedImage).subscribe(
        (response) => {
          // Yükleme başarılı
          console.log('Resim yükleme başarılı:', response);
          // Profil resmi ile ilgili başka işlemleri yapabilirsiniz
        },
        (error) => {
          // Yükleme sırasında hata oluştu
          console.error('Resim yükleme hatası!', error);
        }
      );
    } else {
      // Resim seçilmedi
      console.error('Lütfen bir resim seçin...');
    }
  }

  getUsers() {
    this.apiService.getAllEntities(User).subscribe((res) => {
      this.userCount = res.data.length;
    })
  }
  getEvents() {
    this.apiService.getAllEntities(Event).subscribe((res) => {
      this.eventCount = res.data.length;
    })

  } getComments() {
    this.apiService.getAllEntities(Comment).subscribe((res) => {
      this.commentCount = res.data.length;
    })

  }
}
