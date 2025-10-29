import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Chapter } from '../../chapter/entities/chapter.entity';
import { Outline } from './outline.entity';
import { User } from '../../user/entities/user.entity';

export const NOVEL_STATUS = {
  DRAFT: 'draft',
  OUTLINE: 'outline',
  WRITING: 'writing',
  REVIEWING: 'reviewing',
  COMPLETED: 'completed',
} as const;

export type NovelStatus = typeof NOVEL_STATUS[keyof typeof NOVEL_STATUS];

@Entity('novels')
export class Novel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  genre: string;

  @Column({ type: 'varchar', length: 100 })
  style: string;

  @Column({ type: 'text' })
  setting: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: NOVEL_STATUS.DRAFT,
  })
  status: NovelStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  totalChapters: number;

  @Column({ type: 'int', default: 0 })
  completedChapters: number;

  @Column({ type: 'int', default: 0 })
  totalWords: number;

  @OneToOne(() => Outline, (outline) => outline.novel)
  outline: Outline;

  @OneToMany(() => Chapter, (chapter) => chapter.novel)
  chapters: Chapter[];

  @ManyToOne(() => User, (user) => user.novels)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
