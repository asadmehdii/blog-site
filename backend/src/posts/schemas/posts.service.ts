import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostDocument, Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(postData, userId: string): Promise<Post> {
    const createdPost = new this.postModel({
      ...postData,
      author: userId,
    });
    return createdPost.save();
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ posts: Post[]; totalPosts: number }> {
    const skip = (page - 1) * limit;
    const totalPosts = await this.postModel.countDocuments().exec();
    const posts = await this.postModel
      .find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    return { posts, totalPosts };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel
      .findById(id)
      .populate('author', 'username')
      .exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: string, postData, userId: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.author.toString() !== userId) {
      throw new UnauthorizedException('You cannot edit this post');
    }
    Object.assign(post, postData);
    return post.save();
  }

  async delete(id: string, userId: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.author.toString() !== userId) {
      throw new UnauthorizedException('You cannot delete this post');
    }
    await post.deleteOne();
    return post;
  }
}
