import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RouterModule } from "@angular/router";

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
	imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlashMessagesModule.forRoot()
	],
	declarations: [
	  NavbarComponent,
	  SidebarComponent
	],
	exports:[	  
	  NavbarComponent,
	  SidebarComponent,
	  FlashMessagesModule
	]
})
export class SharedModule { }
