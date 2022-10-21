import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { LogType } from '../constants';



@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: LogType,
    default: LogType.MESSAGE
  })
  type?: LogType

  @Column({ nullable: true })
  message?: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
