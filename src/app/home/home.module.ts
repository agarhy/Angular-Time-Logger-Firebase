import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    MainComponent,
    DemoComponent
  ],
  exports: [MainComponent,DemoComponent]
})
export class HomeModule { }
