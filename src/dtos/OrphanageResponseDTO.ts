import OrphanageModel from "../models/OrphanageModel"
import FilesResponseDTO from "./FilesResponseDTO"

export default {
    renderOne(model: OrphanageModel) {
        return {
            id: +model.id,
            name: model.name,
            latitude: model.latitude,
            longitude: model.longitude,
            about: model.about,
            instructions: model.instructions,
            opening_hours: model.opening_hours,
            open_on_weekends: model.open_on_weekends,
            images: FilesResponseDTO.renderMany(model.images)
        }
    },

    renderMany(model: OrphanageModel[]) {
        return {
            total: model.length,
            data: model.map(orphanage => this.renderOne(orphanage))
        }
    }
}