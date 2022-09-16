import { ForbiddineError} from "../utilis/errorr.js";
import jwt from "../utilis/jwt.js";


export const cheekToken = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      next(new ForbiddineError(403, "required token"))
    }
    token = jwt.verify(token);
    next()
  } catch (error) {
    next(new ForbiddineError(403, "tokenda muammo bor"))
  }
}