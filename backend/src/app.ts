import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import categoryRoutes from './routes/categoryRoutes';
import commentRoutes from './routes/commentRoutes';
import tagRoutes from './routes/tagRoutes';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

//Configure CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function(origin : any, callback: any ) {
    if(whiteList.includes(origin)) {
    callback(null, true);
    }else{
      callback(new Error("Error de Cors"))
    }
  }
}

app.use(cors(corsOptions));

// Routing
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el servidor ${PORT}`);
});
