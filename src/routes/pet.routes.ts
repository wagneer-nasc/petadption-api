import { Router } from 'express'
import multer from 'multer';
import uploadConfig from '../config/upload';
import PetControl from '../controls/PetControl';

const petsRoutes = Router();
const upload = multer(uploadConfig); 

petsRoutes.post('/',  upload.array('images'), PetControl.create);
petsRoutes.get('/:type', PetControl.index);
petsRoutes.get('/:id/show', PetControl.show);
petsRoutes.get('/:type/:sex/show', PetControl.findFilterPet); 
petsRoutes.put('/:id/update', PetControl.updateView); 
petsRoutes.get('/show/recomedation', PetControl.indexRecomedation); 



export default petsRoutes;