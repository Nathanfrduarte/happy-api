"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const OrphanageResponseDTO_1 = __importDefault(require("../dtos/OrphanageResponseDTO"));
const OrphanageModel_1 = __importDefault(require("../models/OrphanageModel"));
const Yup = __importStar(require("yup"));
exports.default = {
    async findOne(req, res) {
        const { id } = req.params;
        const orphanagesRepository = typeorm_1.getRepository(OrphanageModel_1.default);
        const foundedOrphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return res.json(OrphanageResponseDTO_1.default.renderOne(foundedOrphanage));
    },
    async list(req, res) {
        const orphanagesRepository = typeorm_1.getRepository(OrphanageModel_1.default);
        const orphanagesList = await orphanagesRepository.find({
            relations: ['images']
        });
        return res.json(OrphanageResponseDTO_1.default.renderMany(orphanagesList));
    },
    async create(req, res) {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, } = req.body;
        const orphanagesRepository = typeorm_1.getRepository(OrphanageModel_1.default);
        // Express.Multer.File[] é usado para lidar com um 'problema na tipagem de arrays do Multer'
        const requestImages = req.files;
        // A informação vai pro banco é o nome nos arquivos
        const images = requestImages.map(image => {
            return { path: image.filename };
        });
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };
        // Yup é uma lib de validação de dados
        // Criação da validação abaixo
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });
        // Executa a validação
        await schema.validate(data, {
            abortEarly: false,
        });
        // @ts-ignore
        const newOrphanage = orphanagesRepository.create(data);
        await orphanagesRepository.save(newOrphanage);
        return res.status(201).json(newOrphanage);
    }
};
