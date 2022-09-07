import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class ScoreAmountByTag {
  @PrimaryColumn({ type: 'smallint' })
  score: number

  @PrimaryColumn({ type: 'smallint' })
  tag: string

  @Column({ type: 'integer' })
  amount: number
}
