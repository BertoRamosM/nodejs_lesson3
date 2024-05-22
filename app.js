// here we are using commonJS
const express = require('node:express')

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({message: 'Hello World'})
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening in port http://localhost:${PORT}`)
})