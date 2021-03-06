import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne } from 'typeorm'
import { UserEntity } from './user'

@Entity({ name: 'sessions' })
export class SessionEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id!: string

  @Column({ type: 'uuid' })
  @OneToOne(() => UserEntity)
  public userId!: string

  @Column({ type: 'varchar', length: 255 })
  public token!: string

  @CreateDateColumn({ name:'created_at', type: 'timestamp' })
  public createdAt!: Date
}
