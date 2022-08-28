import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export enum LogType {
  LEAGUE_COMPUTATION_START = 'start_compute',
  LEAGUE_COMPUTATION_STOP = 'stop_compute',
  LEAGUE_COMPUTATION_END = 'end_compute',
  MESSAGE = 'message',
  ERROR = 'error'
}

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "enum",
    enum: LogType,
    default: LogType.MESSAGE
  })
  type?: LogType

  @Column({ nullable: true })
  message?: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
