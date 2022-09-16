import jwt from "jsonwebtoken";
const secret = 'private'

export default {
  sign: (peyload) => jwt.sign(peyload, secret),
  verify: (payload) => jwt.verify(payload, secret)
}