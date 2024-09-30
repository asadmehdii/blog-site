import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(commentData, userId: string | null): Promise<Comment> {
    const createdComment = new this.commentModel({
      ...commentData,
      author: userId ? new Types.ObjectId(userId) : null,
    });

    if (commentData.parentComment) {
      const parent = await this.commentModel.findById(
        commentData.parentComment,
      );
      if (!parent) {
        throw new NotFoundException('Parent comment not found');
      }
      parent.replies.push(createdComment._id as Types.ObjectId);
      await parent.save();
    }

    return createdComment.save();
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ post: postId, parentComment: null })
      .populate('author', 'username')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'username' },
      })
      .exec();
  }
}
