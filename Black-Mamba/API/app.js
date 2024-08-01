import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.json({ message: 'working'}))

app.listen(PORT, () => {
  console.log(`Working on http://localhost:${PORT}`)
})