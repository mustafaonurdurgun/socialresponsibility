import { Event } from '../event.model';
import { User } from '../user.model';

export class Comment {
  id?: number;
  description?: string;
  eventId?: number;
  userId?: number;
  event?: Event;
  user?: User;
  createdAt?: Date;
}
