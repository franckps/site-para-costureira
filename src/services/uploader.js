const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, path.resolve(__dirname, '..', 'uploads' ) )
    },
    filename: function (request, file, cb) {
      const name = Date.now() + file.originalname
      request.body.image = name
      cb(null, name)
    }
  })
   
const upload = multer({ storage: storage })

module.exports = upload.single('image')