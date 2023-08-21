const express = require('express');
const { MongoClient, ObjectId } = require('mongodb')
const userRouter = require('./routes/users-routes.js')
const bookRoutes = require('./routes/book-routes.js')

const app = express();

app.use( async (req, res, next) => {
  let db
  try {
    const client = await new MongoClient('mongodb://127.0.0.1:27017').connect()
    db = client.db('revou')
  } catch (error) {
    console.log(error, `<=================== error ==================`);
  }
  
  req.db = db
  
  next()
})

app.use(express.json())
app.get('/', (req, res) => {
  res.send('My App')
})

app.use('/v1/users', userRouter)

app.use('/v1/books', bookRoutes)

const port = 3000;

app.listen(port, () => {
  console.log(`Running on port http://localhost:${port}`)
})

