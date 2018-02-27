import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { TimeLog } from '../models/time-log';

@Injectable()
export class LogsService {

 timeLogsCollection: AngularFirestoreCollection<TimeLog>;
 timelogs: Observable<TimeLog[]>;

  constructor(
  	private _angularFireStore: AngularFirestore
  	) { 

  	this.timeLogsCollection=_angularFireStore.collection<TimeLog>('timelogs');
  	this.timelogs= this.timeLogsCollection.snapshotChanges().map(logs =>{
  		return logs.map(record =>{
		  const data = record.payload.doc.data() as TimeLog;
          const id = record.payload.doc.id;
          return { id, ...data };
  		})
  	});
  }

  getLogs(){
  	return this.timelogs;
  }

  addLog(log:TimeLog){
  	this.timeLogsCollection.add(log);
  }

  deleteLog(id:string){
  	const recordDoc= this._angularFireStore.doc<TimeLog>('timelogs/'+id);
  	recordDoc.delete();

  }

  getLogById(id:string){
  	const recordDoc= this._angularFireStore.doc<TimeLog>('timelogs/'+id);
  	return recordDoc.valueChanges();
 
  }
}

