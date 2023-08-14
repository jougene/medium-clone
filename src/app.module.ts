import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserController } from './user/user.controller';
import { PostController } from './post/post.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    JwtModule.register({
      secret: 'super_secret_jwt_token',
    }),
  ],
  controllers: [UserController, PostController, AuthController],
  providers: [UserService, AuthService],
})
export class AppModule {}
