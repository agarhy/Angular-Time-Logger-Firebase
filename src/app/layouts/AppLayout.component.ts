import { Component } from "@angular/core";

@Component({
	selector:"layout-app",
	template:`
	<body id="app">


	  <app-sidebar></app-sidebar>

	  <main>
	  <app-navbar></app-navbar>
	  <div class="container">
	  <flash-messages></flash-messages>
	  <router-outlet></router-outlet>
	  </div>
	  </main>
	  <script type="text/javascript" src=""></script>
	</body>
	`

})

export class AppLayoutComponent{

}

