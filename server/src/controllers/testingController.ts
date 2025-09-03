import { Request, Response } from 'express'
import * as api from './webRouteController'
import pgClient from '../db/postgres/pgClient'

// GET '/'
// GET '/bins'
export const getBins = async (req: Request, res: Response) => {
  console.log("GET BINS TESTING")
  const query = 'SELECT * FROM bins WHERE session_id = $1'
  const values = ['test']
  const bins = await pgClient.query(query, values)
  res.json(bins.rows)
}

// GET '/bins/:bin_id/records'
export const getRecords = async (req: Request, res: Response) => {
  req.cookies.session_id = 'test'
  await api.getRecords(req, res)
}

// GET '/bins/:bin_id/'
export const getbin = async (req: Request, res: Response) => {
  const bin_id = req.params.bin_id
  const query = 'SELECT * FROM bin WHERE bin_id = $1'
  const queryResult = await pgClient.query(query, [bin_id])
  const bin = queryResult.rows[0]

  res.json(bin)
}

// POST /bins/:bin_id
export const createBin = async (req: Request, res: Response) => {
  req.cookies.session_id = 'test'
  await api.createBin(req, res)
}

// POST /:bin_id
export const createRecord = async (req: Request, res: Response) => {
  req.cookies.session_id = 'test'
  await api.createRecord(req, res)
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

