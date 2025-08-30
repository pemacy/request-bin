import { Request, Response } from 'express'

export const createRecord = async (_req: Request, res: Response) => {
  console.log('Record Created')
  res.status(200).send()
}

export const helloWorld = async (_req: Request, res: Response) => {
  res.send('Hello World')
}
