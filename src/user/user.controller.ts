import { EntityManager } from '@mikro-orm/sqlite';
import { Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { Post } from '../entities/post.entity';
import { PostListDto } from '../dto/post.list.dto';
import { UserListDto } from '../dto/user.list.dto';

@Controller('users')
export class UserController {
  constructor(private readonly em: EntityManager) {}

  @Get()
  @UseGuards(AuthGuard)
  async list(@Query() query: UserListDto) {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);

    const [posts, count] = await this.em.findAndCount(User, {}, { limit: perPage, offset: (page - 1) * perPage });

    return { page, perPage, total: count, items: posts };
  }

  @Get(':id/posts')
  async listUserPosts(@Param('id') id: number, @Query() query: PostListDto) {
    const userId = Number(id);

    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);

    const user = await this.em.findOne(User, { id: userId });

    if (!user) throw new NotFoundException();

    const [posts, count] = await this.em.findAndCount(
      Post,
      { author: user },
      { limit: perPage, offset: (page - 1) * perPage },
    );

    return { page, perPage, total: count, items: posts };
  }
}
