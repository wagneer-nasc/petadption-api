import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPet1607193176843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pets',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',

                    },
                    {
                        name: 'name',
                        type: 'varchar',

                    },
                    {
                        name: 'address',
                        type: 'varchar',

                    },
                    {
                        name: 'about',
                        type: 'varchar',
                         
                    },
                    {
                        name: 'specie',
                        type: 'varchar',
                    },
                    {
                        name: 'name_race',
                        type: 'varchar',
                    },
                    {
                        name: 'sex',  
                        type: 'varchar', 
                    },
                    {
                        name: 'age',  
                        type: 'varchar', 
                    },
                    {
                        name: 'wieght',  
                        type: 'varchar', 
                    },
                    {
                        name: 'contact',  
                        type: 'varchar', 
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'

                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'

                    },
                ],
            }),
        )
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pets')

    }

}
