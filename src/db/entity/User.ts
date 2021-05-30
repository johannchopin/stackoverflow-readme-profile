import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class User {
  @ObjectIdColumn()
  id: number

  @Column()
  username: string

  @Column()
  avatarLink: string

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
}
