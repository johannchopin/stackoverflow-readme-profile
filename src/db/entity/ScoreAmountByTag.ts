import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class ScoreAmountByTag {
  @PrimaryColumn({ type: 'integer' })
  score: number

  @PrimaryColumn()
  tag: string

  @Column({ type: 'integer' })
  amount: number
}
