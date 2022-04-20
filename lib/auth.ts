// helpers for authorization
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

// higher order func as middleware to protect API routes (gatekeeper)
export const validateRoute = (handler) => {
  // it will check if you have a token in your cookie
  // if it's a valid user then you can call the handler
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (token) {
      let user

      try {
        // check that it's still a valid user (in case of user being deleted from db)
        const { id } = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("Not a real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Catched error: Not Authorized" });
        return;
      }
      // passing it along to the next handler
      return handler(req, res, user)
    }

    res.status(401);
    res.json({ error: "Not Authorized" });
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello');
  return user;
}