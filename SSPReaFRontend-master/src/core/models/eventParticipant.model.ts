
import { Event } from "./event.model";
import { User } from "./user.model";



export class EventParticipant {
  id?: number;
  userId?: number;
  eventId?: number;
  user?:User;
  event?:Event;

}
