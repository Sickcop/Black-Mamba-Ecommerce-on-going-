import express from 'express'
import router from './routes/routes.js'
import homeRouter from './routes/router.home.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());

app.get('/', homeRouter)

app.use('/products', router)

app.listen(PORT, () => {
  console.log(`Working on http://localhost:${PORT}`)
})