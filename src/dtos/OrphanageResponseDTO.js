"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FilesResponseDTO_1 = __importDefault(require("./FilesResponseDTO"));
exports.default = {
    renderOne(model) {
        return {
            id: +model.id,
            name: model.name,
            latitude: model.latitude,
            longitude: model.longitude,
            about: model.about,
            instructions: model.instructions,
            opening_hours: model.opening_hours,
            open_on_weekends: model.open_on_weekends,
            images: FilesResponseDTO_1.default.renderMany(model.images)
        };
    },
    renderMany(model) {
        return {
            total: model.length,
            data: model.map(orphanage => this.renderOne(orphanage))
        };
    }
};
