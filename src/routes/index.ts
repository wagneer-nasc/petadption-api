import { Router } from 'express';
import petRoutes from './pet.routes';

const routes = Router();
 
routes.use('/pets', petRoutes);

export default routes;