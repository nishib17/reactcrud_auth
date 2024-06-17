const jsonServer = require('json-server')
const multer = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        let date = new Date()
        let imageFilename = date.getTime() + '_' + file.originalname
        req.body.imageFilename = imageFilename
      cb(null, imageFilename)
    }
  })
  
  const bodyParser = multer({ storage: storage }).any()

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser)
server.post('/users',(req, res, next) => {
    // console.log("yess")
    let date = new Date()
    req.body.createdAt = date.toISOString()
    let hasErrors = false
    let errors = { }
    if(req.body.user.length < 2){
      hasErrors = true
      errors.user =  "The user length atleast 2 characters"
    }
    if(hasErrors){
      res.status(400).jsonp(errors)
      return
    }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})