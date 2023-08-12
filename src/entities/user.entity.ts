import {
  Entity,
  Property,
  PrimaryKey,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Post } from './post.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  email: string;

  @Property()
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);

  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}
