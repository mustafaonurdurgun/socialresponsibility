import { Component } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-slogan',
  templateUrl: './slogan.component.html',
  styleUrls: ['./slogan.component.css']
})
export class SloganComponent {
  currentUser?:User;
  constructor(private authService:AuthService) {
      this.authService.currentUser.subscribe((user)=>{
       
          this.currentUser=user as User;
      
      } );
   }
}
