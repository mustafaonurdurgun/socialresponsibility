export class DialogData{
    title?: string;
    message?: string;
    id?:number;
    entityType?:any;
    constructor(title:string,message:string, id?:number, entityType?:any){
        this.title=title;
        this.message=message;
        this.id=id;
        this.entityType=entityType;
        
    }
}