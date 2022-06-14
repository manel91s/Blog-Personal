import express from 'express';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

const app = express();

app.use(express.json());

const PORT = 3000;

connectDB();

//Routing
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el servidor ${PORT}`);
});
