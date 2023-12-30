import express from 'express'
import { DeleteProductController, GetProductsController, GetTimeBeforeExpirationController, RegisterEntryController, RegisterExitController, RegisterProductController, SearchProductController, UpdateProductController } from '../controllers/Product.Controller'

const ProductRoute = express()



ProductRoute.post('/RegisterProduct', RegisterProductController)
ProductRoute.get('/getProducts', GetProductsController)
ProductRoute.get('/:key/searchProduct', SearchProductController)
ProductRoute.delete('/:ID/deleteProduct', DeleteProductController)
ProductRoute.get('/:ID/getTimeLeft', GetTimeBeforeExpirationController)
ProductRoute.post('/RegisterEntry', RegisterEntryController)
ProductRoute.post('/RegisterExit', RegisterExitController)
ProductRoute.put('/updateProduct', UpdateProductController)



export default ProductRoute