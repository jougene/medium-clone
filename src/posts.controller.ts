import { EntityManager } from '@mikro-orm/sqlite';
import {
  Body,
  Controller,
  Get,
  Post as PostMethod,
  Query,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create.post.dto';
import { User } from './entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly em: EntityManager) {}

  @Get()
  async list(@Query() query: { page?: number; perPage?: number }) {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);

    const [posts, count] = await this.em.findAndCount(
      Post,
      {},
      { limit: perPage, offset: (page - 1) * perPage },
    );

    return {
      page,
      perPage,
      total: count,
      items: posts,
    };
  }

  @PostMethod()
  async create(@Body() createPostDto: CreatePostDto): Promise<any> {
    // TODO get user from auth
    const author = new User({
      email: 'jon@email.com',
      password: 'password_hash',
    });

    const { title, content } = createPostDto;

    const post = new Post({ title, content, author });

    await this.em.persistAndFlush(post);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  }
}
