import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createFiles1605053488482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cada foreign key é representada por um objeto
        await queryRunner.createTable(new Table({
            name: 'files',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_file_orphanage',          // Nome da chave estrangeira
                    columnNames: ['orphanage_id'],      // Nome da coluna da chave estrangeira
                    referencedTableName: 'orphanages',  // Nome da Tabela que a chave estrangeira referencia
                    referencedColumnNames: ['id'],      // Nome da coluna na tabela referenciada pela chave estangeira
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('files')
    }

}
