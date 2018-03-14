import { Component } from "@angular/core";

@Component({
	selector:"layout-app",
	template:`
	<app-navbar></app-navbar>

	<app-sidebar></app-sidebar>

	<main>
	<div class="container">
	<flash-messages></flash-messages>
	<router-outlet></router-outlet>
	</div>
	</main>
	`

})

export class AppLayoutComponent{

}

