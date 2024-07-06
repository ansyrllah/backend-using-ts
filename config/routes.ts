import express from 'express'
import controllers from '../app/controllers'
import uploadOnMemory from '../app/middleware/multerMemory'
import api from '../app/controllers/api'
import { authorization, checkAccess } from '../app/middleware/authorization'

import  swaggerUi from 'swagger-ui-express';
import  swaggerDocument from '../openapi.json';


const apiRouter = express.Router()


apiRouter.route('/cars')
   .get(authorization, controllers.api.cars.getCars)
   .post(authorization,checkAccess (['admin','superadmin']), uploadOnMemory.single('cars_image'), controllers.api.cars.addCars)

apiRouter.route('/cars/:id')
   .get(authorization,checkAccess (['admin','superadmin']), controllers.api.cars.getCarsById)
   .put(authorization,checkAccess (['admin','superadmin']), uploadOnMemory.single('cars_image'), controllers.api.cars.updateCars)
   .delete(authorization,checkAccess (['admin','superadmin']), controllers.api.cars.deleteCars)

apiRouter.post("/register",authorization,checkAccess (['superadmin']), controllers.api.users.register)
apiRouter.post("/register-member", controllers.api.users.registerMember)
apiRouter.post("/login", controllers.api.users.login)

apiRouter.get("/whoami",authorization, controllers.api.users.whoami)


apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));


apiRouter.use(controllers.api.main.onLost) //error404
apiRouter.use(controllers.api.main.onError) //error500

export default {
   apiRouter,
};