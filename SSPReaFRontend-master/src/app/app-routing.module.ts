import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

//Componentler
import { AboutComponent } from './about/about.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AllCommentLikesComponent } from './admin/all-comment-likes/all-comment-likes.component';
import { AllCommentsComponent } from './admin/all-comments/all-comments.component';
import { AllEventParticipantComponent } from './admin/all-event-participant/all-event-participant.component';
import { AllEventsComponent } from './admin/all-events/all-events.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AttendedEventsComponent } from './member/attended-events/attended-events.component';
import { BlogComponent } from './blog/blog.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyCommentsComponent } from './member/my-comments/my-comments.component';
import { MyLikesComponent } from './member/my-likes/my-likes.component';
import { ChatComponent } from './chat/chat.component';
import { RefleshPage } from './refleshPage';
import { adminControl, loginControl, organizatorMemberControl } from './admin-control';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CustomerSupportComponent } from './admin/customer-support/customer-support.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page
  { path: 'about', component: AboutComponent },
  { path: "admin-allcategories", component: CategoriesComponent, canActivate: [adminControl] },
  { path: 'admin-allevents', component: AllEventsComponent, canActivate: [adminControl] },
  { path: 'admin-allcomments', component: AllCommentsComponent, canActivate: [adminControl] },
  { path: 'admin-allcommentlikes', component: AllCommentLikesComponent, canActivate: [adminControl] },
  { path: 'admin-alleventparticipant', component: AllEventParticipantComponent, canActivate: [adminControl] },
  { path: 'admin-allusers', component: AllUsersComponent, canActivate: [adminControl] },
  { path: 'events', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'event-detail', component: EventDetailComponent },
  { path:"chat",component:ChatComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'member-attendentevents', component: AttendedEventsComponent, canActivate: [organizatorMemberControl] },
  { path: 'member-mycomments', component: MyCommentsComponent, canActivate: [organizatorMemberControl] },
  { path: 'member-mylikes', component: MyLikesComponent, canActivate: [organizatorMemberControl] },
  { path: 'profile', component: AdminProfileComponent, canActivate: [loginControl] },
  {path:'chatbot',component:CustomerSupportComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: RefleshPage }],
})
export class AppRoutingModule {
  constructor() { }
}
