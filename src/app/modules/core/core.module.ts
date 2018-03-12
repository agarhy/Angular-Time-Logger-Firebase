import { NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';

//FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Services
import { AuthService } from '../../services/auth.service';

export const firebaseConfig=environment.firebaseConfig;

@NgModule({

	imports: [
	  //Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
	],
	providers: [
    AuthService
  ],
})
export class CoreModule { }
