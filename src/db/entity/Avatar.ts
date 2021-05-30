import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Avatar {
  @ObjectIdColumn()
  id: number

  @Column('longtext')
  base64: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
