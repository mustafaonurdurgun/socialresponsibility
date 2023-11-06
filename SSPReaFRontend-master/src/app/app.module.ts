// Angular Modülleri
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';

// HTTP İnterceptorları
import { JwtInterceptor } from 'src/core/services/interceptor/jwt.interceptor';

// Bileşenler
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { SliderComponent } from './Sliders/slider/slider.component';
import { HomeSliderComponent } from './Sliders/home-slider/home-slider.component';
import { HomeCards1Component } from './Cards/home-cards1/home-cards1.component';
import { LatestCausesComponent } from './latest-causes/latest-causes.component';
import { WhyChooseUsComponent } from './home/why-choose-us/why-choose-us.component';
import { LatestEventsComponent } from './home/latest-events/latest-events.component';
import { DonateNowComponent } from './home/donate-now/donate-now.component';
import { SloganComponent } from './slogan/slogan.component';
import { OurMissionComponent } from './about/our-mission/our-mission.component';
import { OurTeamComponent } from './about/our-team/our-team.component';
import { LatestBlogsComponent } from './blog/latest-blogs/latest-blogs.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { EventsCardComponent } from './components/events-card/events-card.component';
import { GradientsDashboardComponent } from './home/gradients-dashboard/gradients-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about/about-us/about-us.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AllEventsComponent } from './admin/all-events/all-events.component';
import { AllCommentsComponent } from './admin/all-comments/all-comments.component';
import { AllEventParticipantComponent } from './admin/all-event-participant/all-event-participant.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { ShowDialogComponent } from './admin/components/show-dialog/show-dialog.component';
import { ErrorComponent } from './error/error.component';
import { AllCommentLikesComponent } from './admin/all-comment-likes/all-comment-likes.component';
import { AttendedEventsComponent } from './member/attended-events/attended-events.component';
import { MyCommentsComponent } from './member/my-comments/my-comments.component';
import { MyLikesComponent } from './member/my-likes/my-likes.component';
import { EventDetailCommentComponent } from './event-detail/event-detail-comment/event-detail-comment.component';
import { ChatComponent } from './chat/chat.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerSupportComponent } from './admin/customer-support/customer-support.component';


@NgModule({
  declarations: [
    AboutComponent,
    AboutUsComponent,
    AdminComponent,
    AdminProfileComponent,
    AllCommentLikesComponent,
    AllCommentsComponent,
    AllEventParticipantComponent,
    AllEventsComponent,
    AllUsersComponent,
    AppComponent,
    AttendedEventsComponent,
    BlogComponent,
    CategoriesComponent,
    ContactComponent,
    ContactFormComponent,
    DonateNowComponent,
    ErrorComponent,
    EventDetailComponent,
    EventDetailCommentComponent,
    EventsCardComponent,
    FooterComponent,
    GradientsDashboardComponent,
    HomeComponent,
    HomeCards1Component,
    HomeSliderComponent,
    LatestBlogsComponent,
    LatestCausesComponent,
    LatestEventsComponent,
    LoginComponent,
    MyCommentsComponent,
    MyLikesComponent,
    EventDetailCommentComponent,
    ChatComponent,
    NavbarComponent,
    OurMissionComponent,
    OurTeamComponent,
    ShowDialogComponent,
    SloganComponent,
    SliderComponent,
    WhyChooseUsComponent,
    CustomerSupportComponent,
    
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
function providerFirebaseApp(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

