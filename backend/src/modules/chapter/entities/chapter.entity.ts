import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Novel } from '../../novel/entities/novel.entity';
import { Review } from './review.entity';

export const CHAPTER_STATUS = {
  DRAFT: 'draft',
  WRITING: 'writing',
  REVIEWING: 'reviewing',
  COMPLETED: 'completed',
} as const;

export type ChapterStatus = typeof CHAPTER_STATUS[keyof typeof CHAPTER_STATUS];

@Entity('chapters')
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  novelId: string;

  @ManyToOne(() => Novel, (novel) => novel.chapters)
  @JoinColumn({ name: 'novelId' })
  novel: Novel;

  @Column({ type: 'int' })
  chapterNumber: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 0 })
  wordCount: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: CHAPTER_STATUS.DRAFT,
  })
  status: ChapterStatus;

  @Column({ type: 'varchar', length: 100, nullable: true })
  aiModel: string;

  @Column({ type: 'text', nullable: true })
  prompt: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @OneToMany(() => Review, (review) => review.chapter)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
