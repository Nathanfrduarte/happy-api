import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import OrphanageResponseDTO from '../dtos/OrphanageResponseDTO'
import OrphanageModel from '../models/OrphanageModel'
import * as Yup from 'yup'

export default {

    async findOne(req: Request, res: Response) {

        const { id } = req.params

        const orphanagesRepository = getRepository(OrphanageModel)

        const foundedOrphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(OrphanageResponseDTO.renderOne(foundedOrphanage))
    },

    async list(req: Request, res: Response) {
        const orphanagesRepository = getRepository(OrphanageModel)

        const orphanagesList = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.json(OrphanageResponseDTO.renderMany(orphanagesList))
    },

    async create(req: Request, res: Response) {

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body

        const orphanagesRepository = getRepository(OrphanageModel)

        // Express.Multer.File[] é usado para lidar com um 'problema na tipagem de arrays do Multer'
        const requestImages = req.files as Express.Multer.File[]

        // A informação vai pro banco é o nome nos arquivos
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

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
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        // Executa a validação
        await schema.validate(data, {
            abortEarly: false,       // Irá esperar a validação de todos os campos para lançar excessão, caso aja
        })

        // @ts-ignore
        const newOrphanage = orphanagesRepository.create(data)

        await orphanagesRepository.save(newOrphanage)

        return res.status(201).json(newOrphanage)
    }
}