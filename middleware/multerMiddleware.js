const multer  = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,callback) =>{
        callback(null,"./imgUploads")
        },
        filename : (req, file, callback) => {
            const fname = `image-${file.originalname}`
            callback(null,fname)
        }
    })

const fileFilter = (req,file,callback) =>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' ||  file.mimetype == 'image/jpeg'){
        callback(null,true)
    }else {
        callback(null,false)
        return callback(new Error('only accepts png,jpg and jpeg files'))
    }
}

    const multerConfig = multer({ storage,
        fileFilter
     })

     module.exports = multerConfig