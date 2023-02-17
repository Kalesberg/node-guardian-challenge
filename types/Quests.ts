export interface Quest {
	id: number,
	skillTree: string, 
	skill: string,
	title: string,
	difficulty: number,
	experience: number,
	gold: number,
	type: string,
	cover: string,
	description?: string,
	rewards?: {
		experience?: number,
		gold?: number
	}
};