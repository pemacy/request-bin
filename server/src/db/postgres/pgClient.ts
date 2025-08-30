import { Client } from 'pg'

console.log('Attempting Postgres Connection in environment:', process.env.NODE_ENV)
console.log('PGUSER:', process.env.PGUSER)
console.log('PGPASSWORD:', process.env.PGPASSWORD)
console.log('PGHOST:', process.env.PGHOST)
console.log('PGPORT:', process.env.PGPORT)
console.log('PGDATABASE:', process.env.PGDATABASE)

const pgClient = new Client()

export default pgClient
