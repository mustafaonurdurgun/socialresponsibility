import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { ShowDialogComponent } from '../components/show-dialog/show-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../model/dialogdata';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent {
  constructor(private service: ApiService, private matDialog: MatDialog) {}
  selectedImage: File | null = null;
  showModal = false;
  searchFilter?: number = 0;
  chooseRole?: number;
  roleFilter?: number = 3;
  users?: User[];
  tempUsers?: User[];
  selectedEditUser?: User;
  searchItem?: string;
  ngOnInit(): void {
    this.roleFilterSelectedItem();
    this.searchFilterSelectedItem();

    this.LoadUsers();
  }

  LoadUsers() {
    this.service.getAllEntities(User).subscribe((res) => {
      switch (this.searchFilter) {
        case 0:
          this.tempUsers = res.data;
          break;
        case 1:
          this.tempUsers =
            this.searchItem == undefined
              ? res.data
              : res.data.filter((x: User) =>
                  x.id
                    ?.toString()
                    .toLowerCase()
                    .includes(this.searchItem?.toLowerCase() as string)
                );
          break;
        case 2:
          this.tempUsers =
            this.searchItem == undefined
              ? res.data
              : res.data.filter((x: User) =>
                  x.fullName
                    ?.toString()
                    .toLowerCase()
                    .includes(this.searchItem?.toLowerCase() as string)
                );
          break;
        case 3:
          this.tempUsers =
            this.searchItem == undefined
              ? res.data
              : res.data.filter((x: User) =>
                  x.email
                    ?.toString()
                    .toLowerCase()
                    .includes(this.searchItem?.toLowerCase() as string)
                );
          break;
      }
      this.users =
        this.roleFilter == 3
          ? this.tempUsers
          : this.tempUsers?.filter((x: User) => x.userType == this.roleFilter);
      this.users?.sort((a, b) => a.id! - b.id!);

      console.log(this.users);
    });
  }
  openDialog(id?: number) {
    if (id != null) {
     this.matDialog.open(ShowDialogComponent, {
    
      
        
        width: '300px',
        
       
        data: new DialogData(
          'Kullanıcı Silme',
          'Kullanıcı silinecek emin misiniz?',
          id,
          User
        ),
      });
     
      this.matDialog.afterAllClosed.subscribe((res) => {
        this.LoadUsers();
      });
    }
  }
  RefleshUsers() {
    this.LoadUsers();
  }
  roleFilterSelectedItem() {
    document
      .getElementById('roleFilter')
      ?.addEventListener('click', (event) => {
        this.roleFilter = Number((event.target as HTMLInputElement).value);
        this.LoadUsers();
        console.log(this.roleFilter);
      });
  }
  searchFilterSelectedItem() {
    document
      .getElementById('searchFilter')
      ?.addEventListener('click', (event) => {
        console.log('searchFilter:' + this.searchFilter);
        this.searchFilter = Number((event.target as HTMLInputElement).value);
        this.searchItem = undefined;
        this.LoadUsers();
      });
  }
  openModal(user?: User) {
    this.selectedEditUser = user;
    this.selectedEditUser!.id = user!.id;
    this.showModal = true;
    this.chooseRole = this.selectedEditUser?.userType;
    this.chooseRoleForUsers();
  }
  closeModal() {
    this.showModal = false;
    location.reload();
  }
  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }
  async updateUser() {
    console.log(this.selectedEditUser);
    console.log(this.chooseRole);
    if (this.selectedEditUser != undefined && this.chooseRole != 3) {
      switch (this.chooseRole) {
        case 0:
          this.selectedEditUser.userType = 0;
          break;
        case 1:
          this.selectedEditUser.userType = 1;
          break;
        case 2:
          this.selectedEditUser.userType = 2;
          break;
      }

      console.log(this.selectedEditUser);
      await this.service
        .updateEntity(this.selectedEditUser!.id, this.selectedEditUser, User)
        .then((response) => {
          if (response?.status == ResponseStatus.Ok) {
            alert('Güncelleme Başarılı');
            this.closeModal();
          } else {
            alert('Güncelleme Başarısız Role seçiniz');
          }
        });
      this.LoadUsers();
    }
  }
  uploadProfileImage() {
    if (this.selectedImage) {
      const selectedImageCopy: File = new File(
        [this.selectedImage],
        this.selectedEditUser!.email + '.jpeg',
        {
          type: this.selectedImage.type,
        }
      );
      this.selectedImage = selectedImageCopy;

      this.service.uploadProfileImage(this.selectedImage).subscribe(
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
  chooseRoleForUsers() {
    document
      .getElementById('chooseRole')
      ?.addEventListener('click', (event) => {
        this.chooseRole = Number((event.target as HTMLInputElement).value);
        console.log('selectedRole:' + this.chooseRole);
      });
  }
}
