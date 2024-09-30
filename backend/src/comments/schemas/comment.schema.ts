import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  author: User;

  @Prop({ type: Types.ObjectId, ref: 'Comment', default: null })
  parentComment: Comment;

  @Prop({ type: [Types.ObjectId], ref: 'Comment' })
  replies: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
