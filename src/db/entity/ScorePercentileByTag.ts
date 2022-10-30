import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class ScorePercentileByTag {
  @Column({ type: 'smallint' })
  score: number

  @PrimaryColumn({ type: 'float4' })
  percentage: number

  @PrimaryColumn()
  tag: string
}
