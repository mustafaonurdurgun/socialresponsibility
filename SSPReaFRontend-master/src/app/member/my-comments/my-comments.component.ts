import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api/api.service';
import { Comment } from 'src/core/models/comment.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css']
})
export class MyCommentsComponent {

  constructor(private router:Router,private service:ApiService ){}
  id?:number;
  myComments?:Comment[];

  ngOnInit():void{
    this.service.getProfileInfo().subscribe(user=>this.id=user.data.id);
    this.getMyComments();

  }

  getMyComments() {
    this.service.getAllEntities(Comment).subscribe((response) => {
      this.myComments = response.data.filter(f=>f.userId==this.id);      
       console.log(this.myComments);
       console.log("çalıştı");
    });
  }

  deleteComment(id:any){
    const confirmDelete = window.confirm("Yorumunuzu silmek istiyor musunuz?");
    if(confirmDelete){

   
let status=this.service.deleteEntity(id,Comment);

status.then(response=>{
  if (response?.status == ResponseStatus.Ok) {
    window.alert('yorum silindi')
    this.getMyComments();
  
  }
  else{
    window.alert('bir hata oluştu tekrar deneyin')
  }
})

  }
    


  }
}
