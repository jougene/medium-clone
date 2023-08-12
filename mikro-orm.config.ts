import { Post } from './src/entities/post.entity';
import { User } from './src/entities/user.entity';

export default {
  entities: [User, Post],
  dbName: 'db.sqlite3',
  type: 'sqlite',
  migrations: {
    // path: './src/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
    snapshot: true,
  },
};
