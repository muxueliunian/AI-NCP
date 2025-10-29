import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chapter } from './chapter.entity';

export const REVIEW_TYPE = {
  LOGIC: 'logic',
  WRITING: 'writing',
  CHARACTER: 'character',
  OVERALL: 'overall',
} as const;

export type ReviewType = typeof REVIEW_TYPE[keyof typeof REVIEW_TYPE];

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  chapterId: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.reviews)
  @JoinColumn({ name: 'chapterId' })
  chapter: Chapter;

  @Column({
    type: 'varchar',
    length: 20,
  })
  reviewType: ReviewType;

  @Column({ type: 'simple-json' })
  suggestions: {
    issues: Array<{
      type: string;
      description: string;
      severity: 'high' | 'medium' | 'low';
    }>;
    improvements: string[];
  };

  @Column({ type: 'float', nullable: true })
  score: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  aiModel: string;

  @CreateDateColumn()
  createdAt: Date;
}
