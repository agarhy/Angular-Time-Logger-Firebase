import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { TimeLog } from '../models/time-log';

@Injectable()
export class LogsService {

 timeLogsCollection: AngularFirestoreCollection<TimeLog>;
 timelogs: Observable<TimeLog[]>;
 recordDoc: AngularFirestoreDocument<TimeLog>;

  constructor(
  	private _angularFireStore: AngularFirestore
  	) { 

  }

  getLogs(){
    this.timeLogsCollection=this._angularFireStore.collection<TimeLog>('timelogs');
    this.timelogs= this.timeLogsCollection.snapshotChanges().map(logs =>{
      return logs.map(record =>{
      const data = record.payload.doc.data() as TimeLog;
          const $id = record.payload.doc.id;
          return { $id, ...data };
      })
    });
  	return this.timelogs;
  }

  addLog(log:TimeLog){
  	this.timeLogsCollection.add(log);
  }

  updateLog(log:TimeLog){

     this.recordDoc= this._angularFireStore.doc<TimeLog>('timelogs/'+log.$id); 
     this.recordDoc.update(log);
  }

  deleteLog(_id:string){
    this.recordDoc= this._angularFireStore.doc<TimeLog>('timelogs/'+_id);
  	this.recordDoc.delete();

  }

  getLogById(_id:string){
  	this.recordDoc= this._angularFireStore.doc<TimeLog>('timelogs/'+_id);
  	return this.recordDoc.snapshotChanges().map(record =>{
        const data = record.payload.data() as TimeLog;
        const $id = record.payload.id;
        return { $id, ...data };
    });
  }
}

