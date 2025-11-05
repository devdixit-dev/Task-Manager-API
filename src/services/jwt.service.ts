import jwt from 'jsonwebtoken';

export const signJWT = (payload: any) => {
  const signed = jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: "30m" })
  return signed;
}

export const verifyJWT = (token: any) => {
  const verified = jwt.verify(token, `${process.env.JWT_SECRET}`)
  return verified;
}