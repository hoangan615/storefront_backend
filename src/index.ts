import * as dotenv from 'dotenv';
// Config env for the top-first project
dotenv.config();

import express, { Request, Response } from 'express';
import adminRoutes from './handler/AdminRoutes';
import userRoutes from './handler/UserRoutes';
import productRoutes from './handler/ProductRoutes';
import orderRoutes from './handler/OrderRoutes';

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(express.json());

adminRoutes(app);
userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`starting app on port: ${port}`);
});

export default app;
