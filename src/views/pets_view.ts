import Pet from '../models/Pet';
import imagesView from '../views/images_view';

export default {
    render(pet: Pet) {
        return {
            id: pet.id,
            name: pet.name,
            name_race: pet.name_race,
            specie: pet.specie,
            about: pet.about,
            sex: pet.sex === 'F' ? 'Fêmea' : 'Macho',
            address: pet.address,
            age: pet.age,
            wieght: pet.wieght,
            contact: pet.contact,
            view: pet.view,
            images: imagesView.renderMany(pet.images),
        }
    },
    renderMany(pets: Pet[]) {
        return pets.map(pet => this.render(pet));
    }
}