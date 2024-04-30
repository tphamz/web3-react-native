import WalletSchema from "./wallet.json";
import Realm from "realm";

class DB{
	constructor(schema){
		this.schema = schema;
	}

	async init(){
		this.connection = await Realm.open({schema: [this.schema], schemaVersion: this.schema.schemaVersion}).catch(err=>{
			console.log(err)
			return null;
		});	
	}

	close(){
		if(!this.connection) return;
		this.connection.close();
	}

	async get(query){
		if(!this.connection) return;
		if(!query) return this.connection.objects(this.schema.name);
		return this.connection.objects(this.schema.name).filtered(query);
	}

	async create(val){
		if(!this.connection) return;
		return new Promise((res, err)=>{
			this.connection.write(() => {
			 	const data = this.connection.create(this.schema.name, val);
			 	return res(data);
			});
		});
	}

	async update(val){
		if(!this.connection) return;
		const data = this.connection.objects(this.schema.name);
		return new Promise((res, err)=>{
			this.connection.write(()=>{
				for(let key in val)
					data[key] = val[key];
				return res(data);
			})
		})
		
	}
}

export {DB, WalletSchema};