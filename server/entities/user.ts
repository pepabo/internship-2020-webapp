import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id!: string

  @Column({ type: 'varchar', length: 255 })
  public emailEncrypted!: string

  @Column({ type: 'varchar', length: 255 })
  public salt!: string

  @Column({ type: 'varchar', length: 255 })
  public passwordHash!: string

  @CreateDateColumn({ name:'created_at', type: 'timestamp' })
  public createdAt!: Date
}
