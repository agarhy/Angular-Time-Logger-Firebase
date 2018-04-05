import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main/main.component';
import { LogTableComponent } from './log-table/log-table.component';
import { TimmerComponent } from './timmer/timmer.component';

import { LogsService } from './logs.service';
import { DataService } from './data.service';

import { StoreModule } from '@ngrx/store';
import { timerReducer } from './timer.reduce';
@NgModule({
  imports: [
   StoreModule.forFeature('TimerStore',{
   	timer:timerReducer
   }),
    CommonModule,
    FormsModule
  ],
  declarations: [
    MainComponent, 
    LogTableComponent,
    TimmerComponent
  ],
  providers:[
    LogsService,
    DataService
  ]
})
export class TimerModule { }
