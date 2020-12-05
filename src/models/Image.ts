import {
    Column, Entity, PrimaryGeneratedColumn,
    CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn
} from 'typeorm'

import Pet from './Pet';

@Entity('images')
class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string;

    @ManyToOne(() => Pet, pet => pet.images)
    @JoinColumn({ name: 'pet_id' })
    pet: Pet;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}

export default Image;