export interface User {
	uid?:string
	name:string,
	email:string,	
	settings:{
		notifications:{
			a:boolean,
			b:boolean,
			c:boolean
		},
		timezone:string,
		dateformat:string,
		timeformat:string,
		durationformat:string
	},
	timelogs:{}
	
}