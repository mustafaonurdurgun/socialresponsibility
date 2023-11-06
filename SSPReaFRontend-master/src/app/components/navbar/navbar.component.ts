import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService,private route:ActivatedRoute) { }
  currentUser: User | null = null;
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.route.params.subscribe((params) => {
      console.log("çalıştı")
       const methodName = params;

      // Metodu çağırın (örneğin, 'methodName' bir işlem adı olsun)
      if (methodName.toString() === 'logout') {
        this.logout();
      }
    });

  }
  logout():void {
    console.log("logout çalıştı");
    this.authService.logOut();

    //console.log(this.currentUser);
  }
  

 
 
}
