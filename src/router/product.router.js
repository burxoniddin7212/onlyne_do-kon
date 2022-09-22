import { Router } from "express";
import { cheekToken } from "../middleweire/cheektoken.js"
import { POSTPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, GETQUERY } from "../controller/product.controller.js"

const productRouter = Router();

productRouter.post('/products', [cheekToken], POSTPRODUCT)
productRouter.put('/products', [cheekToken], UPDATEPRODUCT)
productRouter.delete('/products/:id', [cheekToken], DELETEPRODUCT)
productRouter.get('/products', GETQUERY)
productRouter.get('/products/:id', GETQUERY)





export default productRouter;
