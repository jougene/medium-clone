import { Migration } from '@mikro-orm/migrations';

export class Migration20230812090036 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `users` (`id` integer not null primary key autoincrement, `email` text not null, `password` integer not null);',
    );

    this.addSql(
      'create table `posts` (`id` integer not null primary key autoincrement, `title` text not null, `content` text not null, `author_id` integer not null, constraint `posts_author_id_foreign` foreign key(`author_id`) references `users`(`id`) on update cascade);',
    );

    this.addSql(
      'create index `posts_author_id_index` on `posts` (`author_id`);',
    );
  }
}
