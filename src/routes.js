const router = require('express').Router()

const { add, subtract } = require('./calc')
const { getTodo } = require('./external')

router.get('/add', (_, res) => {
  const response = add(2, 3)
  res.json({
    res: response
  })
})

router.get('/subtract', async (_, res) => {
  const response = await subtract(5, 2)
  res.json({
    res: response,

  })
})

router.get('/todo', async (_, res) => {
  const response = await getTodo()
  res.json(response)
})

module.exports = router
