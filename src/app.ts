import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import connectDB from './config/db';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

connectDB();

// Routing
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el servidor ${PORT}`);
});
