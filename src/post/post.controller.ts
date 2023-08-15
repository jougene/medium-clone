import { EntityManager } from '@mikro-orm/sqlite';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post as PostMethod,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Post } from '../entities/post.entity';
import { PostCreateDto } from '../dto/post.create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PostGetDto } from '../dto/post.get.dto';
import { PostListDto } from '../dto/post.list.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly em: EntityManager) {}

  @Get()
  async list(@Query() query: PostListDto) {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);

    const [posts, count] = await this.em.findAndCount(Post, {}, { limit: perPage, offset: (page - 1) * perPage });

    return { page, perPage, total: count, items: posts };
  }

  @PostMethod()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async create(@Body() postCreateDto: PostCreateDto, @Req() req: Request): Promise<any> {
    const authUser = req['user'];

    const author = { id: authUser.id };

    const { title, content } = postCreateDto;

    const post = new Post({ title, content, author });

    await this.em.persistAndFlush(post);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      readingTime: post.readingTime,
    };
  }

  @Get(':id')
  async get(@Param() params: PostGetDto) {
    const id = Number(params.id);

    const post = await this.em.findOne(Post, { id });

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      readingTime: post.readingTime,
    };
  }
}
