import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';

const AVG_WORD_PER_MINUTE_READING_SPEED = 238; // from internet

@Entity({ tableName: 'posts' })
export class Post {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property({ name: 'readingTime', persist: false })
  get readingTime(): number {
    const wordsCount = this.content.split(' ').length;

    return Math.round((wordsCount / AVG_WORD_PER_MINUTE_READING_SPEED) * 60);
  }

  @ManyToOne(() => User)
  author: User;

  constructor({ title, content, author }) {
    this.title = title;
    this.content = content;
    this.author = author;
  }
}
