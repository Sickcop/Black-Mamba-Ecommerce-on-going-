import express from 'express';
import router from './routes/routes.js';
import homeRoutes from './routes/homeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT || 3307;


app.get('/', (req, res) => res.json({ message: 'working'}));

app.use('/products', router);
app.use('/home', homeRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Working on http://localhost:${PORT}`);
});

