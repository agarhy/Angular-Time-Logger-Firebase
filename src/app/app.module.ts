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
import { HomeModule } from "./home/home.module";

//Components
import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

//layouts
import { AppLayoutComponent } from './layouts/AppLayout.component';
import { LandingComponent } from './layouts/LandingLayout.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
    	maxAge:10
    }),
    //App modules
    HomeModule,
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
