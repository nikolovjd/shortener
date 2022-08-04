import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class ShortenedUrl extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  url: string
}