import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { User } from 'src/core/models/user.model';
import { CommentRequest } from 'src/core/models/request/comment-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { Comment } from 'src/core/models/response/comment-request.model';
import { CommentLikeRequest } from 'src/core/models/request/commentLike-request.model';
import { CommentLike } from 'src/core/models/commentLike.model';



@Component({
  selector: 'app-event-detail-comment',
  templateUrl: './event-detail-comment.component.html',
  styleUrls: ['./event-detail-comment.component.css'],
})
export class EventDetailCommentComponent {
  @Input() eventId?: number;
  comments: Comment[] = [];
  currentUser!: User;
  commentRequest!: CommentRequest;
  commentText: string = '';
  commentLike!: CommentLikeRequest;
  allCommentLikes: CommentLike[] = [];
  countLike: number = 0;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.commentRequest = new CommentRequest();
    this.commentLike = new CommentLikeRequest();
  }

  ngOnInit(): void {
    this.getComments();
    this.getProfileInfo();
    this.getAllCommentLike();
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

  async createComment() {
    // console.log(this.commentText);
    // console.log(this.eventId);
    this.commentRequest.eventId = this.eventId;
    this.commentRequest.userId = this.currentUser.id;

    // Kullanıcının girdiği metni commentRequest içine atayın
    this.commentRequest.description = this.commentText;

    let status = await this.apiService.createEntity<CommentRequest>(
      this.commentRequest!,
      'Comment'
    );
    if (status?.status == ResponseStatus.Ok) {
      window.alert('Yorum ekleme Başarılı.');
      this.getComments();
      this.commentText = '';
    } else {
      window.alert('Yorum ekleme Başarısız!');
    }
  }

  async getComments() {
    await this.apiService
      .getAllEntities(Comment)
      .subscribe(
        (response) =>
          (this.comments = response.data.filter(
            (f) => f.eventId == this.eventId
          ))
      );
  }

  createLike(comment: Comment) {
    const index = this.allCommentLikes.findIndex(
      (a: CommentLike) =>
        a.userId === this.currentUser.id && a.commentId === comment.id
    );
    if (index > -1) {
      let id:any=this.allCommentLikes?.at(index)?.id;
      let status=this.apiService.deleteEntity(id, CommentLike);
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('beğeni geri alındı');
          this.getAllCommentLike();
          
        } else {
          window.alert('silme işleminde hata oluştu');
        }
      });
      
      
      
    } else {
      this.commentLike.commentId = comment.id;
      this.commentLike.userId = this.currentUser.id;
      // console.log(this.commentLike);
      let status = this.apiService.createEntity(
        this.commentLike,
        'CommentLike'
      );
      status.then((response) => {
        if (response?.status == ResponseStatus.Ok) {
          window.alert('Yorum beğenildi.');
          this.getAllCommentLike();
        } else {
          window.alert('Yorum beğenilirken hata oluştu.');
        }
      });
      // console.log(this.commentLike);
    }
  }

  async getAllCommentLike() {
    await this.apiService.getAllEntities(CommentLike).subscribe((response) => {
      this.allCommentLikes = response.data;
    });
  }
  likeCount(comment: Comment): number {
    let x: number;
    x = this.countLike = this.allCommentLikes.filter(
      (a: CommentLike) => a.commentId === comment.id
    ).length;
    return x;
  }
}
