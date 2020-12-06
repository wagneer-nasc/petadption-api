import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImage1607193522192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'images',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',

                    },
                    {
                        name: 'path',
                        type: 'varchar',

                    },
                    {
                        name: 'pet_id',
                        type: 'uuid',
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
                foreignKeys: [
                    {
                        name: 'ImagePet',
                        columnNames: ['pet_id'],
                        referencedTableName: 'pets',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    }
                ]
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}
