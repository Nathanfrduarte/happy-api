"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const uploadConfig_1 = __importDefault(require("./config/uploadConfig"));
const OrphanagesController_1 = __importDefault(require("./controllers/OrphanagesController"));
const routes = express_1.Router();
const upload = multer_1.default(uploadConfig_1.default);
routes.post('/orphanages', upload.array('images'), OrphanagesController_1.default.create);
routes.get('/orphanages/:id', OrphanagesController_1.default.findOne);
routes.get('/orphanages', OrphanagesController_1.default.list);
exports.default = routes;
