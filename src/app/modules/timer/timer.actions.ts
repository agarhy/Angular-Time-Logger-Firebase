import { Action } from '@ngrx/store';

export const UPDATE_TIMELOG = '[Post] update';
export const RESET_TIMELOG = '[Post] reset';

export class UpdateTimer implements Action{
	readonly type=UPDATE_TIMELOG;
	
	constructor(public payload:any) {}
}
export class ResetTimer implements Action{
	readonly type=RESET_TIMELOG;
}

export type All
 =UpdateTimer
 |ResetTimer