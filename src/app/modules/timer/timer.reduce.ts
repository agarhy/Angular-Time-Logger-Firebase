import * as TimerActions from './timer.actions'
import { TimeLog } from './time-log';

export type Action = TimerActions.All;

export interface timerState{
	TimerStore:{
	  timer:TimeLog
  }
}

const defaultState:TimeLog ={
	title:'',
	running:false,
	durations:<any>[],
	count:"00:00:00.0",
	countMilliseconds:0,  
	time:{
		mseconds:"0",
		seconds:"00",
		minutes:"00",
		hours:"00"
	},
	createdAt:null,
	updatedAt:null 


}
const newState = (state, newData)=>{
	return Object.assign({}, state, newData.timer)
} 

export function timerReducer(state: TimeLog = defaultState, action:Action){

	switch (action.type ) {
		case TimerActions.UPDATE_TIMELOG:		
		return newState(state, {timer:action.payload });	
		case TimerActions.UPDATE_TIMELOG:			
		return defaultState;		  
		default:
		return state;

	} 
}
