import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService{
	
	private msgSrc= new Subject<string>();
	currentMsg = this.msgSrc.asObservable();

	changeMessage(msg:string){
		console.log('subject created');
		this.msgSrc.next(msg);
	}
	clearMsg(){
		this.msgSrc.complete();
	}
}
