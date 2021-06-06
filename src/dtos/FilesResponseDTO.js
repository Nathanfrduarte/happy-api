"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    renderOne(model) {
        return {
            id: +model.id,
            url: `http://localhost:3333/uploads/${model.path}`
        };
    },
    renderMany(model) {
        return model.map(orphanage => this.renderOne(orphanage));
    }
};
