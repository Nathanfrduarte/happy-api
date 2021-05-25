import FileModel from "../models/FileModel"

export default {
    renderOne(model: FileModel) {
        return {
            id: +model.id,
            url: `http://localhost:3333/uploads/${model.path}`
        }
    },

    renderMany(model: FileModel[]) {
        return model.map(orphanage => this.renderOne(orphanage))
    }
}