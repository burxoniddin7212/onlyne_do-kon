import { Router } from "express";
import {cheekToken} from "../middleweire/cheektoken.js"
import { GETCATEGORIES, GETSUBCATEGORYS, LOGIN, POSTCATEGORIES,UPDATECATEGORIES,DELETECATEGORIES, POSTSUBCATEGORIES ,UPDATESUBCATEGORIES,DELETESUBCATEGORIES} from "../controller/category.controller.js";

const categoryRouter = Router();


categoryRouter.post('/login', LOGIN)
categoryRouter.get('/categories', GETCATEGORIES)
categoryRouter.post('/categories', [cheekToken], POSTCATEGORIES)
categoryRouter.put('/categories', [cheekToken], UPDATECATEGORIES)
categoryRouter.delete('/categories/:id', [cheekToken], DELETECATEGORIES)
categoryRouter.get('/categories/:id', GETCATEGORIES)
categoryRouter.get('/subcategories', GETSUBCATEGORYS)
categoryRouter.get('/subcategories/:id', GETSUBCATEGORYS)
categoryRouter.post('/subcategories', POSTSUBCATEGORIES)
categoryRouter.put('/subcategories', UPDATESUBCATEGORIES)
categoryRouter.delete('/subcategories/:id', DELETESUBCATEGORIES)




export default categoryRouter;
