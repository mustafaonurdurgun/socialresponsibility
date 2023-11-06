
import { Component} from '@angular/core';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  users:User[]=[];
  selectedUser?:User;
  currentUser?:User;
  constructor(private apiService:ApiService,private authService:AuthService){}
  title = 'SSPRea';
 init() {
  let isDragging=false;
  let offsetX=0, offsetY=0;
 let messageButton = document.getElementById('messageButton') as HTMLElement;
  document.addEventListener('mouseup', () => {
    isDragging = false;
    messageButton.style.cursor = 'grab';
});
document.addEventListener('mousemove', (e: MouseEvent) => {
  if (isDragging) {
      messageButton.style.left = (e.clientX - offsetX) + 'px';
      messageButton.style.top = (e.clientY - offsetY) + 'px';
  }
});
messageButton.addEventListener('mousedown', (e: MouseEvent) => {
isDragging = true;
offsetX = e.clientX - messageButton.getBoundingClientRect().left;
offsetY = e.clientY - messageButton.getBoundingClientRect().top;
messageButton.style.cursor = 'grabbing';
});
 }

  
 handleDoubleClick(event: MouseEvent) {
 this.openModal();
  // Çift tıklamayı engellemek için aşağıdaki satırı kullanabilirsiniz.
  event.preventDefault();
}
   

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user=>{
        this.currentUser=user as User;
    });
   
    this.getUsers();
    window.addEventListener('load', this.init);
    
  }

 

  showModal:boolean=false;  
  openModal(){
    this.showModal=true;
  }
  closeModal(){ 
    this.showModal=false;
  }
  getUsers(){
    this.apiService.getAllEntities(User).subscribe(data=>{
      this.users=data.data.filter(x=>x.id!=this.currentUser?.id);
      //console.log(this.users);
    });
  }
  selectUser(user:User){
    this.selectedUser=user;

    //console.log(this.selectedUser);
  }

  
 

 
}