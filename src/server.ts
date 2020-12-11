import 'reflect-metadata';
import express from 'express';
import './database';
import routes from './routes';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3001, () => {
    console.log('Starteeeer!!');
});