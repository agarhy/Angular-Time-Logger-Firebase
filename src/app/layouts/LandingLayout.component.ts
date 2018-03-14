import { Component } from "@angular/core";

@Component({
	selector:"layout-landing",
	template:`
	<main>
	<div class="container">

	<router-outlet></router-outlet>
	</div>
	</main>
	`

})

export class LandingComponent{

}

