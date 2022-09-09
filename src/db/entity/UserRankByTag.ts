import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class UserRankByTag {
  @PrimaryColumn({ type: 'integer' })
  id: number

  @PrimaryColumn()
  tag: string

  @Column({ type: 'float4' })
  topPercentage: number

  @Column({ type: 'smallint' })
  score: number

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
