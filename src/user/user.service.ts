import { EntityManager } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const passwordHash = crypto.createHmac('sha256', password).digest('hex');

    return this.em.findOne(User, { email, password: passwordHash });
  }

  async create(email: string, password: string): Promise<Partial<User>> {
    const passwordHash = crypto.createHmac('sha256', password).digest('hex');

    const user = new User({ email, password: passwordHash });

    await this.em.persistAndFlush(user);

    return {
      id: user.id,
      email: user.email,
    };
  }
}
