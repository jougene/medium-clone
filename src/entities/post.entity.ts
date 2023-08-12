import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @ManyToOne(() => User)
  author: User;

  constructor({ title, content, author }) {
    this.title = title;
    this.content = content;
    this.author = author;
  }
}
