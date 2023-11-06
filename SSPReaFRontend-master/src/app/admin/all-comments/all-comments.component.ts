import { Component } from '@angular/core';
import { Comment } from 'src/core/models/response/comment-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.css'],
})
export class AllCommentsComponent {
  comments?: Comment[];

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.LoadComments();
  }
  LoadComments() {
    this.apiService.getAllEntities(Comment).subscribe((res) => {
      this.comments = res.data;
    });
  }
  confirmDelete(id: any) {
    const confirmDelete = window.confirm('Silmek istiyor musunuz?');
    if (confirmDelete) {
      let status = this.apiService.deleteEntity(id, Comment);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('Yorum silindi!');
          this.LoadComments();
        } else {
          window.alert('Silme işleminde hata oluştu');
        }
      });
    } else {
      window.alert('Silme işlemi iptal edildi');
    }
  }
}
