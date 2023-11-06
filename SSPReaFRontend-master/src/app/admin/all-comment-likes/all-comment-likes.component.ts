import { Component } from '@angular/core';
import { CommentLike } from 'src/core/models/commentLike.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-all-comment-likes',
  templateUrl: './all-comment-likes.component.html',
  styleUrls: ['./all-comment-likes.component.css'],
})
export class AllCommentLikesComponent {
  constructor(private apiService: ApiService) {}
  commentLikes: CommentLike[] = [];
  ngOnInit(): void {
    this.LoadComments();
  }
  LoadComments() {
    this.apiService.getAllEntities(CommentLike).subscribe((res) => {
      this.commentLikes = res.data;
    });
  }
  confirmDelete(id: any) {
    const confirmDelete = window.confirm('Silmek istiyor musunuz?');
    if (confirmDelete) {
      let status = this.apiService.deleteEntity(id, CommentLike);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('Beğeni silindi!');
          this.LoadComments();
        } else {
          window.alert('Silme işleminde hata oluştu!');
        }
      });
    } else {
      window.alert('Silme işlemi iptal edildi.');
    }
  }
}
