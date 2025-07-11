import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import process from 'process';

import { authentication } from './src/middlewares/authentication.js';
import authRouter from './src/routes/auth.routes.js';
import productRouter from './src/routes/products.routes.js';

const __dirname = import.meta.dirname;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Routers
app.use('/auth', authRouter);
app.use('/api', authentication, productRouter);

// Handling 404 errors
app.use((req, res, next) => {
  res.status(404).send('Resource not found.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});