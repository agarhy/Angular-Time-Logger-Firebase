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



//Services
import { LogsService } from './services/logs.service';
import { DataService } from './services/data.service';


//Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoggerComponent } from './components/logger/logger.component';
import { LogTableComponent } from './components/log-table/log-table.component';

export const appRoutes: Routes =[
  {
    path:'',
    component: MainComponent
  }
]

export const firebaseConfig=environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    LoggerComponent,
    LogTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    //Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    LogsService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
