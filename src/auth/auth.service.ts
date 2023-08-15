import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmailAndPassword(email, password);

    if (user === null) {
      throw new NotFoundException();
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async register(email: string, password: string): Promise<any> {
    return this.userService.create(email, password);
  }
}
