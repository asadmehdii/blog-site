import {
  Controller,
  Post as HttpPost,
  Body,
  Param,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';



@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @HttpPost()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    const userId = req.user.userId;
    return this.commentsService.create(createCommentDto, userId);
  }

  @HttpPost('guest')
  async createAsGuest(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto, null);
  }
}
