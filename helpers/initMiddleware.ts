// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
import { NextApiRequest, NextApiResponse } from 'next';

type MiddlewareType = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (err?: any) => any
) => void | Promise<void>

export default function initMiddleware(middleware: MiddlewareType) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
