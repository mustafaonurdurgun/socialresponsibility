import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommentLike } from 'src/core/models/commentLike.model';
import { ApiService } from 'src/core/services/api/api.service';
import { Event } from 'src/core/models/event.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';


@Component({
  selector: 'app-my-likes',
  templateUrl: './my-likes.component.html',
  styleUrls: ['./my-likes.component.css']
})
export class MyLikesComponent {

  constructor(private router:Router,private service:ApiService ){}

  myCommentLikes?:CommentLike[];
  id?:number
  events?:Event[];

  ngOnInit():void{
    this.service.getProfileInfo().subscribe(user=>this.id=user.data.id);
    this.getMyLikes();
    this.getAllEvent();

  }
findEventName(id?:number){
  return this.events?.find(e=>e.id==id)?.title;

}
  getMyLikes() {
    this.service.getAllEntities(CommentLike).subscribe((response) => {
      this.myCommentLikes = response.data.filter(f=>f.userId==this.id);
            
       console.log(this.myCommentLikes);
       console.log("çalıştı");
    });
  }

  getAllEvent(){
    this.service.getAllEntities(Event).subscribe((response) => {
      this.events = response.data;
            
       console.log(this.events);
       console.log("çalıştı");
    });
  }
  cancelLike(id:any){
    const confirmDelete = window.confirm("Beğeninizi geri almak istiyor musunuz?");
    if(confirmDelete){

   
let status=this.service.deleteEntity(id,CommentLike);

status.then(response=>{
  if (response?.status == ResponseStatus.Ok) {
    window.alert('beğeni geri alındı')
    this.getMyLikes();
  this.getAllEvent();
  
  }
  else{
    window.alert('bir hata oluştu tekrar deneyin')
  }
})

  }
  }

}

