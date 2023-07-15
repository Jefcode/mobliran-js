import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import productRoutes from './routers/productRoutes';
import userRoutes from './routers/userRoutes';
import categoryRoutes from './routers/categoryRoutes';
import orderRoutes from './routers/orderRoutes';
import connectDB from './config/db';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import path from 'path';

dotenv.config();
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

const DIRNAME = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(DIRNAME, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(DIRNAME, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API Running');
  });
}

// Middleware for error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
