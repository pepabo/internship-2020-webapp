import { Request, Response, NextFunction } from 'express'

type RouteFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
export const wrap = (fn: RouteFunction): RouteFunction => async (req, res, next) => fn(req, res, next).catch(next)
