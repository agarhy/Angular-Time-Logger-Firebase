//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//App Moudles
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./modules/core/core.module";
import { SharedModule } from "./modules/shared/shared.module";
import { TimerModule } from "./modules/timer/timer.module";
import { UserModule } from "./modules/user/user.module";
import { ProjectsModule } from "./modules/projects/projects.module";

//Components
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    //App modules
    CoreModule,
    SharedModule,
    TimerModule,
    UserModule,
    ProjectsModule
  ],
  providers: [    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
