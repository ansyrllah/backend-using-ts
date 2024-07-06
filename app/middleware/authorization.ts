import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { UsersModel } from "../models/users"

export async function authorization(req: any, res: Response, next: NextFunction) {
   try{
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const payload = jwt.verify(token, 'secretkey') as any

      req.user = await UsersModel
      .query()
      .findOne({id: payload.id})

      next();

   }catch(err){
      res.status(401).json({message: "Unauthorized"})
   }
}

export function checkAccess(role: string[]) {
   return (req: any, res: Response, next: NextFunction) => {
      if(!role.includes(req.user.role)) {
         return res.status(403).json({message: "Forbidden"})
      }

      next()
   }
}