import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersController } from './users.controller';
import { PostsController } from './posts.controller';

@Module({
  imports: [MikroOrmModule.forRoot()],
  controllers: [UsersController, PostsController],
  providers: [],
})
export class AppModule {}
