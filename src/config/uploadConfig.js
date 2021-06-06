"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Multer é uma biblioteca para lidar com uploads de arquivos
// Path é do proprio node, é uma forma de fazer caminhos relativos dentro da aplicação
/**
 * Configurações do Multer (upload de arquivos)
 */
exports.default = {
    storage: multer_1.default.diskStorage({
        // Indica para onde irão os arquivos (Dentro da aplicação no caso)
        destination: path_1.default.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            callback(null, fileName);
        }
    })
};
