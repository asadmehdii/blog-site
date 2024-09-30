import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from '../dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(@Query('page') page = 1) {
    const limit = 5;
    const { posts, totalPosts } = await this.postsService.findAll(+page, limit);
    return {
      totalPosts,
      currentPage: +page,
      totalPages: Math.ceil(totalPosts / limit),
      posts,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: CreatePostDto,
    @Request() req,
  ) {
    return this.postsService.update(id, updatePostDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.postsService.delete(id, req.user.userId);
  }
}
