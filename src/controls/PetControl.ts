import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm'
import Pet from '../models/Pet';

export default {

    async create(request: Request, response: Response) {
        const petRepository = getRepository(Pet);

        const {
            name, name_race, specie, about, sex, address, age, wieght, contact,
        } = request.body;

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const pet = petRepository.create({
            name, name_race, specie, about, sex, address, age, wieght, contact, images
        })
        await petRepository.save(pet);

        return response.json(pet);

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

        pets.map((item) => {
            if (item.sex === 'F') item.sex = 'Fêmea'
            else item.sex = 'Macho'
            item.images.map((item) => {
                item.path = `http://192.168.15.19:3001/uploads/${item.path}`
            })
        })
        return response.json(pets);
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
        pets.map((item) => {
            if (item.sex === 'F') item.sex = 'Fêmea'
            else item.sex = 'Macho'
            item.images.map((item) => {
                item.path = `http://192.168.15.19:3001/uploads/${item.path}`
            })
        })
        return response.json(pets);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const petRepository = getRepository(Pet);

        const pet = await petRepository.findOneOrFail(id, {
            relations: ['images']
        });

        pet.images.map((item) => {
            item.path = `http://192.168.15.19:3001/uploads/${item.path}`
        })


        return response.json(pet);

    },
    async updateView(request: Request, response: Response) {
        const { id } = request.params;
        console.log(`chegou o id ${id} aqui`)

        try {
            await getConnection()
                .createQueryBuilder()
                .update(Pet)
                .set({
                    view: () => "view + 1"
                })
                .where("id = :id", { id: id })
                .execute();
            return response.json({ ok: 'atualizado' })
        } catch (err) {
            console.log(err)
        }

    },
    async indexRecomedation(request: Request, response: Response) {
        console.log('chegou no indexRecomedation') 
        const petRepository = getRepository(Pet);
        const pets = await petRepository.find({
            relations: ['images'],
            order: {
                view: "DESC",
            },
            take: 10,
        });

        pets.map((item) => {
            if (item.sex === 'F') item.sex = 'Fêmea'
            else item.sex = 'Macho'
            item.images.map((item) => {
                item.path = `http://192.168.15.19:3001/uploads/${item.path}`
            })
        })
        return response.json(pets);
    },


}
