import jwt from 'jsonwebtoken';  
import { erroHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next (erroHandler(401, 'Access denied!'))

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return next(erroHandler(403, 'please try again'))
    req.user = user;
    next();
  });
};

