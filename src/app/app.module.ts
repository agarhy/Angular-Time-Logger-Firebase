//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
//FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FlashMessagesModule } from 'angular2-flash-messages';

//Services
import { LogsService } from './services/logs.service';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';



//Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimmerComponent } from './components/timmer/timmer.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { SettingsComponent } from './components/settings/settings.comoponent';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

export const appRoutes: Routes =[
  {
    path:'',
    component: TimmerComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'timer',
    component: TimmerComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'settings',
    component: SettingsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path:'signin',
    component: SigninComponent,
  },
  {
    path:'signout',
    component: SignupComponent,
    canActivate:[AuthGuard]
  }
]

export const firebaseConfig=environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    TimmerComponent,
    LogTableComponent,
    SettingsComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    //Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthGuard,
    LogsService,
    DataService,
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
