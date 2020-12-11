import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm'
import Pet from '../models/Pet';
import petView from '../views/pets_view';

export default {

    async create(request: Request, response: Response) {
        const petRepository = getRepository(Pet);

        const {
            name, name_race, specie, about, sex,
            address, age, wieght, contact,
        } = request.body;

        const requestImages = request.files as Express.Multer.File[];
        let images = requestImages.map(image => {
            return { path: image.filename }
        });

        const pet = petRepository.create({
            name, name_race, specie, about, sex,
            address, age, wieght, contact, images
        });
        await petRepository.save(pet);

        return response.status(201).json(pet);

    },
    async index(request: Request, response: Response) {
        const { type } = request.params;
        const petRepository = getRepository(Pet);
        const pets = await petRepository.find({
            relations: ['images'],
            where: {
                specie: type,
            }
        });

        return response.status(200).json(petView.renderMany(pets));
    },

    async findFilterPet(request: Request, response: Response) {
        const { type, sex } = request.params;
        const petRepository = getRepository(Pet);
        const pets = await petRepository.find({
            relations: ['images'],
            where: {
                specie: type, sex: sex
            }
        });

        return response.status(200).json(petView.renderMany(pets));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const petRepository = getRepository(Pet);

        const pet = await petRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.status(200).json(petView.render(pet));
    },

    async updateView(request: Request, response: Response) {
        const { id } = request.params;

        await getConnection()
            .createQueryBuilder()
            .update(Pet)
            .set({
                view: () => "view + 1"
            })
            .where("id = :id", { id: id })
            .execute();
        return response.status(200).json({ ok: 'atualizado' });
    },

    async indexRecomedation(request: Request, response: Response) {
        const petRepository = getRepository(Pet);
        let pets = await petRepository.find({
            relations: ['images'],
            order: {
                view: "DESC",
            },
            take: 10,
        });

        return response.status(200).json(petView.renderMany(pets));
    },

}
