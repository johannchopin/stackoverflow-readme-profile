import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class ScorePercentileByTag {
  @Column()
  score: number

  @PrimaryColumn()
  percentage: number

  @PrimaryColumn()
  tag: string
}
