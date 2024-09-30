Frontend README
Blog Frontend
A React application for the blog frontend.

Quick Start
Clone the repository


Copy code
git clone https://github.com/yourusername/blog-frontend.git
cd blog-frontend
Install dependencies


Copy code
npm install
Configure the API Base URL

Open src/services/api.js
Set the baseURL to your backend API URL (e.g., http://localhost:3000)
javascript
Copy code
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
});

export default api;
Start the application


Copy code
npm start
The app will run at http://localhost:3000
Backend README
Blog Backend
A NestJS application for the blog backend.

Quick Start
Clone the repository


Copy code
git clone https://github.com/yourusername/blog-backend.git
cd blog-backend
Install dependencies


Copy code
npm install
Ensure MongoDB is running

If using local MongoDB, make sure it's running.
If using a remote MongoDB instance, update the connection string.
Configure environment variables

Create a .env file in the root directory.

Add the following variables:

env
Copy code
MONGODB_URI=mongodb://asadmehdi9554:Asad11221124@cluster0-shard-00-00.st3h5.mongodb.net:27017,cluster0-shard-00-01.st3h5.mongodb.net:27017,cluster0-shard-00-02.st3h5.mongodb.net:27017/youtube?ssl=true&replicaSet=atlas-x6o0tv-shard-0&authSource=admin&retryWrites=true&w=majority

Start the application


Copy code
npm run start:dev
The API will be available at http://localhost:3000
Connecting Frontend and Backend
Backend API URL

Ensure the frontend's baseURL matches the backend's URL.
CORS Configuration

The backend should have CORS enabled to accept requests from the frontend.

typescript
Copy code
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enables CORS
  await app.listen(3000);
}
bootstrap();
Starting the Projects
Start the Backend First

Run npm run start:dev in the backend project directory.
Ensure the backend is running and accessible.
Start the Frontend

Run npm start in the frontend project directory.
The frontend will open in your default browser.
Final Notes


If the frontend cannot communicate with the backend, check that:

The backend is running.
The baseURL in the frontend is correct.
CORS is enabled in the backend.
