import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs'
import 'dotenv/config'
import pool from './db.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import generateRouter from './routes/generate.js';

const runSQLFile = async (filePaths) => {
  for (const filePath of filePaths) {
    const pathArr = filePath.split('/')
    const name = pathArr[pathArr.length - 1].slice(0, -4);
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.execute(sql);
  }
};
runSQLFile([
  path.join(__dirname, 'queries/createDb.sql'),
  path.join(__dirname, 'queries/createItemTable.sql'),
  path.join(__dirname, 'queries/createCombinationsTable.sql'),
  path.join(__dirname, 'queries/createResponsesTable.sql'),
])
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/generate', generateRouter);

export default app;
