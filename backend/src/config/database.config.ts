import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { User } from '../modules/user/entities/user.entity';
import { Novel } from '../modules/novel/entities/novel.entity';
import { Outline } from '../modules/novel/entities/outline.entity';
import { Chapter } from '../modules/chapter/entities/chapter.entity';
import { Review } from '../modules/chapter/entities/review.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'better-sqlite3',
  database: process.env.DB_DATABASE || 'data/novel.db',
  entities: [User, Novel, Outline, Chapter, Review],
  migrations: [join(__dirname, '..', '..', 'database', 'migrations', '*.js')],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
