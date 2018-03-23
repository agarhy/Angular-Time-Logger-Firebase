import { Component } from "@angular/core";

@Component({
	selector:"layout-landing",
	template:`
	<body id="home">
    	  <flash-messages></flash-messages>
	  <router-outlet></router-outlet>

	</body>
	`

})

export class LandingComponent{

}

