import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Novel } from './novel.entity';

@Entity('outlines')
export class Outline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  novelId: string;

  @OneToOne(() => Novel, (novel) => novel.outline)
  @JoinColumn({ name: 'novelId' })
  novel: Novel;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'simple-json', nullable: true })
  structure: {
    chapters: Array<{
      number: number;
      title: string;
      summary: string;
    }>;
  };

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  aiModel: string;

  @Column({ type: 'text', nullable: true })
  prompt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
