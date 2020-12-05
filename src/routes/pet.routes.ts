import { Router } from 'express'
import multer from 'multer';
import uploadConfig from '../config/upload';

const petsRoutes = Router();
const upload = multer(uploadConfig);



export default petsRoutes;