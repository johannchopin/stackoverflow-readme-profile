import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class ScoreAmountByTag {
  @PrimaryColumn()
  score: number

  @PrimaryColumn()
  tag: string

  @Column()
  amount: number
}
