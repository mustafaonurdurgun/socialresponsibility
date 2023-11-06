import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { Router } from '@angular/router';
import { Category } from 'src/core/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowDialogComponent } from '../components/show-dialog/show-dialog.component';
import { DialogData } from '../model/dialogdata';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { CategoryRequest } from 'src/core/models/request/category-request.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(
    private router: Router,
    private service: ApiService,
    private matDialog: MatDialog
  ) {}
  users: User[] = [];
  categories?: Category[];
  showModal = false;
  selectedCategory?: Category;
  categoryRequest?: CategoryRequest = new CategoryRequest();
  openModal(category?: Category) {
    this.selectedCategory = category;
    this.showModal = true;
  }
  openAddModal() {
    this.selectedCategory = undefined;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.getAllCategories();
    this.selectedCategory = undefined;
    this.categoryRequest?.categoryName != undefined;
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.service.getAllEntities(Category).subscribe((response) => {
      this.categories = response.data.sort((a, b) => a.id! - b.id!);
      // console.log(this.categories);
    });
  }
  confirmDelete(id: any) {
    const confirmDelete = window.confirm('Silmek istiyor musunuz?');
    if (confirmDelete) {
      let status = this.service.deleteEntity(id, Category);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('kategori silindi!');
          this.getAllCategories();
        } else {
          window.alert('silme işleminde hata oluştu');
        }
      });
    } else {
      window.alert('Silme işlemi iptal edildi');
    }
  }
  async addCategory() {
    if (this.categoryRequest?.categoryName != undefined) {
      let status = await this.service.createEntity<CategoryRequest>(
        this.categoryRequest!,
        'Category'
      );
      if (status?.status == ResponseStatus.Ok) {
        alert('Ekleme Başarılı');
        this.showModal = false;
        this.getAllCategories();
      } else {
        alert('Ekleme Başarısız');
      }
    } else {
      alert('Ekleme Başarısız');
    }
    this.categoryRequest?.categoryName != undefined;
  }
  async updateCategory() {
    let status = await this.service.updateEntity(
      this.selectedCategory!.id!,
      this.selectedCategory,
      Category
    );
    if (status?.status == ResponseStatus.Ok) {
      alert('Güncelleme Başarılı');
      this.showModal = false;
      this.getAllCategories();
    } else {
      alert('Güncelleme Başarısız');
    }
    this.selectedCategory = undefined;
  }
}
