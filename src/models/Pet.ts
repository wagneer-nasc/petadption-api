import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import Image from './Image';

@Entity('pets')
class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    name_race: string;
    @Column()
    specie: string;
    @Column()
    about: string;
    @Column()
    sex: string;
    @Column()
    address: string;
    @Column()
    age: string;
    @Column()
    wieght: string;
    @Column()
    contact: string;
    @OneToMany(() => Image, image => image.pet, {
        cascade: ['insert', 'update']
     })
     @JoinColumn({ name: 'pet_id' })
     images: Image[];
     
     @UpdateDateColumn()
     updated_at: Date
  
     @CreateDateColumn()
     created_at: Date
}
export default Pet ;