import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 3000;

connectDB();

// Routing
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el servidor ${PORT}`);
});
