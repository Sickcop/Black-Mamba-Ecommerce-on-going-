import express from 'express';
import productsRouter from './routes/routes.js';
import homeRouter from './routes/homeRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import loginRouter from './routes/routes.login.js'

const app = express();
const PORT = process.env.PORT || 3307;
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'working'}));

app.use('/products', productsRouter);
app.use('/home', homeRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/login', loginRouter)

app.listen(PORT, () => {
  console.log(`Working on http://localhost:${PORT}`);
});

