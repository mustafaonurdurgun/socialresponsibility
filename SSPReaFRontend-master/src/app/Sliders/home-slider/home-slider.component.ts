import { Component, OnInit } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';
// JavaScript dosyasını içe aktarın



@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {
constructor(private authService:AuthService) { }
 currentUser?:User;


  ngOnInit() {
    this.authService.currentUser.subscribe(user => {  
      this.currentUser = user as User;
    });
  }

}