import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Files from './FileModel'

@Entity('Orphanages')
export default class OrphanageModel {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: string

    // Relacionamentos

    @OneToMany(() => Files, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    
    @JoinColumn({name: 'orphanage_id'})
    images: Files[]
}
