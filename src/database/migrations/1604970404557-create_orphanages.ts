import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1604970404557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cada coluna é representada por um objeto
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',                         // Nome da coluna
                    type: 'integer',                    // Tipo da coluna
                    unsigned: true,                     // Não permite número negativo
                    isPrimary: true,                    // Chave primária
                    isGenerated: true,                  // Coluna gerada automáticamente
                    generationStrategy: 'increment',    // Lógica incremental na geração
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name: 'instructions',
                    type: 'text',
                },
                {
                    name: 'opening_hours',
                    type: 'varchar',
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,                     // Valor padrão do campo
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages')
    }

}
