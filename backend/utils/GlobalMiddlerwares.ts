import helmet from 'helmet'
import cors from 'cors'
import { Express } from 'express'
import Router from '../src/routes/Main'
import bodyParser from 'body-parser'


export default function ApplyMiddleWares(express: Express) {
    express.use(helmet())
    express.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }))
    express.use(bodyParser.json())
    express.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    express.use(Router)
}