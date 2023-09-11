import { prismaClient } from "../application/database";

export const authMiddleware = async(req, res, next) => {
  req.get('Authorization');
  if(!token) {
    res.status(401).json({
      errors: "Unauthorized"
    }).end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token
      }
    });

    if (!user) {
      res.status(401).json({
        errors: "Unauthorized"
      }).end();
    } else {
      req.user = user;
      next();
    }
  }
}