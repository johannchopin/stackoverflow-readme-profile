import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn()
  id: number

  @Column()
  username: string

  @Column()
  avatarLink: string

  @Column()
  reputation: string

  @Column({ nullable: true })
  gold?: number

  @Column({ nullable: true })
  silver?: number

  @Column({ nullable: true })
  bronze?: number

  @Column({ nullable: true })
  location?: string

  @Column({ nullable: true })
  website?: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
