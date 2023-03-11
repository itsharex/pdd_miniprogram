import express, { Express } from 'express';
import * as dotenv from 'dotenv'
import 'express-async-errors'
import { connectDB } from './db/connection.js';
import { notFound } from './errors/not-found.js';
import { errorHandlerMiddleWare } from './errors/error-handler.js';
import order from './routes/order.js'

dotenv.config()

const app: Express = express();


app.use(express.json());
app.use('/api/v1/orders', order)
app.use(notFound)
app.use(errorHandlerMiddleWare)

connectDB(process.env.MONGO_URI!).then(async() => {
  app.listen(3000, () => {
    console.log(` running at http://localhost:3000`);
  });

}).catch(err => {
  console.log(err)
})

