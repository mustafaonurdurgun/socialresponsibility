import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private angularFireMessaging:AngularFireMessaging) { }
}
