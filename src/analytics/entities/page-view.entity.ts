import {BaseEntity, Column, Entity, OneToOne, PrimaryColumn} from 'typeorm'
import {ShortenedUrl} from '../../url/entities/shortened-url.entity'
import {JoinColumn} from 'typeorm'

@Entity()
export class PageView extends BaseEntity {
  @PrimaryColumn()
  urlId: string

  @OneToOne(type => ShortenedUrl)
  @JoinColumn({name: 'urlId'})
  url: ShortenedUrl

  @Column({default: 0})
  views: number
}