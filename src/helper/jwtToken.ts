import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { id: string; email: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
