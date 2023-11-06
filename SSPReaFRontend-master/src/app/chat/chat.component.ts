import { Component, Input } from '@angular/core';
import { DocumentChangeAction, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Message } from 'src/core/models/message.model';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { FirestoreService } from 'src/core/services/firestore/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() user?: User;
  messages: Message[] = [];
  sendingMessage: string = "";
  currentUser?: User;
  messageSnapshot?: Observable<DocumentData[]> | null;
  constructor(private fireStore: FirestoreService, private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user as User;
    });
  
    this.getSnapShot();
   

  }
  async getSnapShot() {
    this.messages=[];
    console.log("getSnapShot çalıştı");
     await this.fireStore.getMessageCollectionSnapshot(this.currentUser!.id.toString(), this.user!.id.toString()).then((data) => {
      data?.subscribe((data) => {
        this.messages = [];
        data.sort((a,b)=>a["createdAt"]-b["createdAt"] ).forEach((doc) => {
          this.messages.push(new Message(doc["senderId"] as string, doc["message"] as string, doc["createdAt"] as Date));
        });
      } );
     });
     this.messages.forEach((message)=>{
      console.log("message:"+message.message+" created at:"+message.createdAt+" sender id:"+message.senderId);
    } );
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    //Write your code here
    this.getSnapShot();
    }   
  async sendMessage() {

    if (this.user != null) {
      this.messages=[];
      this.fireStore.addMessage({ senderId: this.currentUser!.id.toString(), message: this.sendingMessage, createdAt: new Date() }, this.currentUser!.id.toString(), this.user.id.toString());
      this.sendingMessage = "";
      await this.getSnapShot();

    }
  }
  ngAfterViewChecked(): void {
    const scrollingContainer: HTMLElement | null = document.getElementById('scrolling-container');

    if (scrollingContainer) {
      // Scroll çubuğunu en alttan başlatın
      scrollingContainer.scrollTop = scrollingContainer.scrollHeight;
    }
    
  }
  async getMessages() {
    this.messages=[];
    this.messages = await this.fireStore.getMessage(this.currentUser!.id.toString(), this.user!.id.toString());

    

  }
}
