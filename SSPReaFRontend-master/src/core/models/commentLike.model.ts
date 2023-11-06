import { Comment } from './comment.model';
import { User } from './user.model';

export class CommentLike {
  id?: number;
  commentId?: number;
  userId?: number;
  user?: User;
  comment?: Comment;
}
