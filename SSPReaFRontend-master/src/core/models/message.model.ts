export class Message{
    senderId?:string;
    message?:string;
    createdAt?:Date;
    constructor(senderId:string,message:string,createdAt:Date){
        this.senderId=senderId;
        this.message=message;
        this.createdAt=createdAt;
    }
}