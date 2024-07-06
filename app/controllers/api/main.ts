import { Request, Response, NextFunction } from 'express';

const onLost = (req: Request, res: Response) => {
   res.status(404).json({
      status: "FAIL",
      message: 'Route Not found'
   });
}

const onError = (err: any, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({
      status: "Error",
      error: {
         name : err.name,
         message: err.message
      }
   });
}

export default {
   onLost,
   onError
}