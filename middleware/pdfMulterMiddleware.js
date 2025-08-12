const multer  = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,callback) =>{
        callback(null,"./pdfUploads")
        },
        filename : (req, file, callback) => {
            const fname = `resume-${file.originalname}`
            callback(null,fname)
        }
    })

const fileFilter = (req,file,callback) =>{
    if(file.mimetype == 'application/pdf'){
        callback(null,true)
    }else {
        callback(null,false)
        return callback(new Error('only accepts pdf files'))
    }
}

    const pdfMulterConfig = multer({ storage,
        fileFilter
     })

     module.exports = pdfMulterConfig