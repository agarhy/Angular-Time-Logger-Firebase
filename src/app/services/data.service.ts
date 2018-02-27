import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService{
	
	private msgSrc= new BehaviorSubject<string>();
	currentMsg = this.msgSrc.asObservable();

	changeMessage(msg:String){
		this.msgSrc.next(msg);
	}
}
