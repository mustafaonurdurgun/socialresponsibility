import { Component } from '@angular/core';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
import { AdminNavService } from './model/adminnavservice.model';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private authService: AuthService, private apiService: ApiService) {
   
   }
  isOpen?: Boolean;
  currentUser: User | null = null;
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.isOpen=JSON.parse(AdminNavService.getIsOpenLocalStorage()!);
    AdminNavService.dashboardNavigationIsOpen=this.isOpen?true:false;
    console.log(AdminNavService.dashboardNavigationIsOpen )
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    this.isOpen ? sidebar.classList.add('active'):null;
   
  }
  
  logout() {
    console.log("logout çalıştı");
    this.authService.logOut();
    console.log(this.currentUser);
  }

  sidebarActive() {

    const sidebar = document.querySelector('.sidebar') as HTMLElement;

    if (AdminNavService.dashboardNavigationIsOpen) {
      AdminNavService.DashboardClose();
      AdminNavService.setIsOpenLocalStorage(false);
      console.log(AdminNavService.dashboardNavigationIsOpen )
      sidebar.classList.remove('active')

    } else {
      AdminNavService.DashboardOpen();
      AdminNavService.setIsOpenLocalStorage(true);
      console.log(AdminNavService.dashboardNavigationIsOpen )
      sidebar.classList.add('active')
    }

  }

}

