const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/article-images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'img/jpg' || file.mimetype == 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

module.exports = upload