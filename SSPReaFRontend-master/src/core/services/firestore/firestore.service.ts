import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from 'src/core/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {

  }

  async getMessage(firstUserId: string, secondUserId: string) {

    let messages:Message[]=[];
    var res = await this.firestore.collection("chats").ref.where('userIds', 'array-contains', {"firstUserId":firstUserId, "secondUserId":secondUserId}).get();
    console.log("res:"+res.docs.length);
    if (res.docs.length == 0) {
      return messages;
    } else {
      var documentId = res.docs[0].id;
      var docRef = await this.firestore.collection("chats").doc(documentId).collection("messages").ref.orderBy('createdAt').get();
      docRef.docs.forEach((doc) => {
        messages.push(new Message(doc.data()["senderId"] as string, doc.data()["message"] as string, doc.data()["createdAt"] as Date));
      }
      );
      messages.forEach((message)=>{
        console.log("message:"+message.message+" created at:"+message.createdAt+" sender id:"+message.senderId);
      } );
      return messages;
    }

  }
  async addMessage(data: Message, firstUserId: string, secondUserId: string) {
    var res = await this.firestore.collection("chats").ref.where('userIds', 'array-contains', {"firstUserId":firstUserId, "secondUserId":secondUserId}).get();
    if (res.docs.length == 0) {
      await this.firestore.collection("chats").add({ userIds: [{"firstUserId":firstUserId, "secondUserId":secondUserId},{"firstUserId":secondUserId, "secondUserId":firstUserId}] });
      var res2 = await this.firestore.collection("chats").ref.where('userIds', 'array-contains', {"firstUserId":firstUserId, "secondUserId":secondUserId}).get();
      var documentId = res2.docs[0].id;
      await this.firestore.collection("chats/"+documentId+"/messages").add(data);
      

    }
    else {
      var documentId = res.docs[0].id;
      await this.firestore.collection("chats/"+documentId+"/messages").add(data);
    }

  }
  async getMessageCollectionSnapshot(firstUserId: string, secondUserId: string) {
    let messages:Message[]=[];
    var res = await this.firestore.collection("chats").ref.where('userIds', 'array-contains', {"firstUserId":firstUserId, "secondUserId":secondUserId}).get();
    console.log("res:"+res.docs.length);
    if (res.docs.length == 0) {
      return null;
    } else {
      var documentId = res.docs[0].id;
      return this.firestore.collection("chats").doc(documentId).collection("messages").valueChanges();
     
     
     
    }

  }
}
function subscribe(arg0: (docs: any) => void) {
  throw new Error('Function not implemented.');
}

