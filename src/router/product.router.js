import { Router } from "express";
import { cheekToken } from "../middleweire/cheektoken.js"
import { POSTPRODUCT, UPDATEPRODUCT, DELETEPRODUCT,GETQUERY } from "../controller/product.controller.js"

const productRouter = Router();

productRouter.post('/products', POSTPRODUCT)
productRouter.put('/products', UPDATEPRODUCT)
productRouter.delete('/products/:id', DELETEPRODUCT)
productRouter.get('/products', GETQUERY)
productRouter.get('/products/:id', GETQUERY)





export default productRouter;
