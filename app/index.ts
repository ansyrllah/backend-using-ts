import express, { Express} from 'express';
import path from 'path'
require('dotenv').config()
const {CLIENT, DATABASE, USER,PASSWORD, PORT_PG} = process.env
//knex
import knex from 'knex'
import { Model } from 'objection';
import routes from '../config/routes';

const app: Express = express();

//knex
const knexInstance = knex({
    client: CLIENT,
    connection: {
      database: DATABASE,
      user: USER,
      password: PASSWORD,
      port: PORT_PG ? parseInt(PORT_PG, 10) : 5432
    }
})

Model.knex(knexInstance);
//endknex

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(routes.apiRouter)
app.use('/api/v1/', routes.apiRouter)

export default app;