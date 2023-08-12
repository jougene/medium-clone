import { EntityManager } from '@mikro-orm/sqlite';
import {
  // Body,
  // Controller,
  Get,
  // Post as PostMethod,
  Query,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly em: EntityManager) {}

  @Get()
  async list(@Query() query: { page?: number; perPage?: number }) {
    const page = Number(query.page ?? 1);
    const perPage = Number(query.perPage ?? 10);

    const [posts, count] = await this.em.findAndCount(
      User,
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
}
