import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
 

app.use('/', (request, response) => {
    return response.json({hello: 'World'})
})

app.listen(3001, () => {
    console.log('Starteeeer!!')
});