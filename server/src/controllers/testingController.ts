import { Request, Response } from 'express'
import * as api from './webRouteController'

// GET '/:bin_id/show'
export const showRecords = async (req: Request, res: Response) => {
  const recordsWithDocs = await api.getRecords(req, res)
  res.render('showRecords', { req, recordsWithDocs })
}

export const showBins = async (req: Request, res: Response) => {
  const records = await api.getBins(req, res)
  res.render('showBins', { req, records })
}

export const createBin = async (req: Request, res: Response) => {
  const records = await api.getBins(req, res)
  res.redirect('/testing/')
}

export const createRecord = async (req: Request, res: Response) => {
  //const recrods = await getBins(req, res)
  //res.render('showRecords', { req, recordsWithDocs })
}

// GET '/hello_world'
export const helloWorld = async (req: Request, res: Response) => {
  console.log("COOKIES:", req.cookies)
  console.log("HEADERS:", req.headers)
  if (req?.cookies?.hello) {
    res.send('hello cookie value: ' + req.cookies.hello)
  } else {
    res.cookie('hello', 'World')
    res.send('No hello cookie in request')
  }
}

