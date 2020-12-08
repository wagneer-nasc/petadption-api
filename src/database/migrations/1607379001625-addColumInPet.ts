import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumInPet1607379001625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pets', new TableColumn({
            name: 'view',
            type: 'int', 
            default: 0,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pets', 'view');
    }

}
