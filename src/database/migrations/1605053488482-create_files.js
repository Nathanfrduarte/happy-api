"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFiles1605053488482 = void 0;
const typeorm_1 = require("typeorm");
class createFiles1605053488482 {
    async up(queryRunner) {
        // Cada foreign key é representada por um objeto
        await queryRunner.createTable(new typeorm_1.Table({
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
                    name: 'FK_file_orphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('files');
    }
}
exports.createFiles1605053488482 = createFiles1605053488482;
