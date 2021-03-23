const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

app.get('/', async (request, response) => {
  const content = await axios.get('https://como-fazer-devpleno-lab.firebaseio.com/teste.json')
  console.log(content.data)
  response.render('index', { i: content.data })
})
app.get('/categorias/nova', (req, res) => {
  res.render('categorias/nova')
})

app.post('/categorias/nova', async (req, res) => {
  // console.log(req.body)
  await axios.post('https://como-fazer-devpleno-lab.firebaseio.com/categorias.json', {
    categoria: req.body.categoria
  })
  res.send(req.body)
})

app.get('/categorias', async (req, res) => {
  const content = await axios.get('https://como-fazer-devpleno-lab.firebaseio.com/categorias.json')
  res.render('categorias/index', { categorias: content.data })
})

// await axios.post('https://como-fazer-devpleno-lab.firebaseio.com/categorias.json', {
//   categoria: 'Receitas'
// })

app.listen(port, err => {
  if (err) {
    console.log('error')
  } else {
    console.log('Como-Fazer Server is running on port:', port)
  }
})