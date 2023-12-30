import express from 'express'
import ProductRoute from './Product'
import ManagerRouter from './Manager'
const Router = express()

Router.use('/Product', ProductRoute)
Router.use('/Manager', ManagerRouter)

export default Router