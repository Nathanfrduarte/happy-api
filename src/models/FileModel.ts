import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Orphanage from './OrphanageModel'

@Entity('Files')
export default class FileModel {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    // Relacionamentos

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage
}
