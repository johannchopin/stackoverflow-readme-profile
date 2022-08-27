import {
  Column,
  Entity,
  PrimaryGeneratedColumn
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
