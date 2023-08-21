const { Router } = require('express')
const { ObjectId } = require('mongodb')

const userRouter = Router()

userRouter.use((req, res, next) => {
  console.log('user middleware')
  next()
})

// crud
// v1/users/v1/users
userRouter.post('/', async (req, res) => {
  console.log(req.body, `<=================== body ==================`);
  
  const { username, email } = req.body
  
  const user = await req.db.collection('users').insertOne({ username, email })
  
  res.status(200).json({
    message: 'success',
    data: user
  })
})


userRouter.get('/', async (req, res) => {
  const users = await req.db.collection('users').find({ is_deleted: { $exists: false }}).toArray()
  
  res.status(200).json({
    message: 'success',
    data: users
  })
  
})

userRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const { username, email } = req.body
  console.log(req.query, `<=================== query ==================`);
  
  const user = await req.db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { username, email } })
  
  res.status(200).json({
    message: 'success',
    data: user
  })
})

userRouter.delete("/:id",  async (req, res) => {
  const { id } = req.params;

  const user = await req.db.collection('users').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { is_deleted: true } })
  
  res.status(200).json({
    message: 'success',
  })
})


module.exports = userRouter