import {
  Entity,
  ObjectIdColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Avatar } from './Avatar'

@Entity()
export class User {
   @ObjectIdColumn()
   id: number

   @Column()
   username: string

   @Column()
   reputation: string

   @Column()
   gold?: number

   @Column()
   silver?: number

   @Column()
   bronze?: number

   @Column()
   location?: string

   @Column()
   website?: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

   @OneToOne(() => Avatar)
    @JoinColumn()
    avatar: Avatar;
}
