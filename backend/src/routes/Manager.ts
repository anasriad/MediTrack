import { AddAccountController, CheckManagerCodeController, RetrieveAccountDataController } from '../controllers/Manager.controller'
import express from 'express'
const ManagerRouter = express()
ManagerRouter.get('/:code/CheckManager', CheckManagerCodeController)
ManagerRouter.post('/retrieveAccount', RetrieveAccountDataController)
ManagerRouter.post('/AddAccount', AddAccountController)
export default ManagerRouter