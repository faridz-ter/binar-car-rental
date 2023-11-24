import express, { Express } from 'express';
import path from 'path';

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
    
    this.app.use('/api/cars', ApiCars.routes());
    this.app.use('/api/auth', ApiAuth.routes());

    swaggerDocs(this.app, 8000);
  }
  run() {
    this.app.listen(PORT, () => {
      console.log('Server running on http://localhost:%s', PORT);
    });
  }
}

new Server().run();
