import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class Avatar {
   @PrimaryColumn()
   id: number

   @Column('longtext')
   avatar?: string
}
