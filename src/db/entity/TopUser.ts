import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class TopUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer')
  userId: number

  @Column('integer')
  score: number

  @Column('varchar')
  tag: string
}
