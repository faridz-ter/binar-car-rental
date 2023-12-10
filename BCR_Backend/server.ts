import express, { Express } from 'express';
import path from 'path';
import cors from "cors";

import ApiCars from './routes/api/ApiCars';
import ApiAuth from './routes/api/ApiAuth';
import swaggerDocs from "./utils/swagger";

const { PORT = 8000 } = process.env;
const PUBLIC_DIR = path.join(__dirname, 'public');

class Server {
  private app: Express;
  constructor() {
    this.app = express();

    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
      })
    )
    
    this.app.use('/api/cars', ApiCars);
    this.app.use('/api/auth', ApiAuth);

    swaggerDocs(this.app, 8000);
  }
  run() {
    this.app.listen(PORT, () => {
      console.log('Server running on http://localhost:%s', PORT);
    });
  }
}

new Server().run();
