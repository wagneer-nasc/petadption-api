import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import './database'
import routes from './routes'
import cors from 'cors';
import path from 'path';



const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/', (request, response) => {
    return response.json({hello: 'World'})
})

app.listen(3001, () => {
    console.log('Starteeeer!!')
});