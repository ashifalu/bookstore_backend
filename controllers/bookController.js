const books = require('../modal/bookModal');
const { findByIdAndUpdate } = require('../modal/jobModal');
const stripe = require('stripe')(process.env.STRIPE_SK)

// add- book
exports.addBookController = async(req,res)=>{

    const {title,author,publisher,language,no_ofpages,isbn,imageUrl,category,price,dprice,abstract} = req.body
    // console.log(req.files);
    console.log(req.payload);
try {
       const existingBook = await books.findOne({title,userMail:req.payload})
       if(existingBook){
        console.log(existingBook);
        
        res.status(401).json("Book already exist")
       }else{
        const newBook = new books({
            title,author,publisher,language,no_ofpages,isbn,imageUrl,category,price,dprice,abstract,uploadImgs:req.files,userMail:req.payload
        })
        await newBook.save()
        res.status(200).json(newBook)
       }

} catch (error) {
    res.status(500).json(error)
}    
}

// get books to home
exports.homeBooksController = async(req,res) => {
    try {
        const recentBooks= await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(recentBooks)
    } catch (error) {
        
    }
}

// get all books -userside
exports.getAllBooksUser = async(req,res)=>{
    const{search} = req.query
    const userMail = req.payload
    try {
        const query = {
            title : {
                $regex:search, $options:'i'
            },
            userMail : {
                $ne:userMail
            }
        }
        const allBooks = await books.find(query)
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// to view book
exports.viewBookController = async (req,res)=> {
    const {id} = req.params
    try {
        const bookDetails = await books.findOne({_id:id})
        res.status(200).json(bookDetails)
    } catch (error) {
        res.status(500).json(error)
    }
}

// to get all user added books
exports.UserAddedBooksController = async(req,res)=>{
    try {
        const userMail =req.payload
        const addedBooks = await books.find({userMail})
        res.status(200).json(addedBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// to get all user purchased books
exports.purchasedBooksController = async(req,res)=>{
    try {
        const userMail = req.payload
        const purchasedBooks = await books.find({broughtBy:userMail})
        res.status(200).json(purchasedBooks)
    } catch (error) {
        res.status(500).json(error)

    }
}
// to delete a book
exports.deleteBookController = async(req,res)=>{
    const {id} = req.params
    try {
        await books.findByIdAndDelete({_id:id})
        res.status(200).json('Book deleted successfully')
    } catch (error) {
        res.status(500).json(error)
    }

}

// make payment
exports.paymentController = async(req,res)=>{
    const email = req.payload
    // console.log(userMail);
    const {bookDetails} = req.body
    console.log(bookDetails);
    

    try {
                const existingBook = await books.findByIdAndUpdate({_id:bookDetails._id},{  
                    title : bookDetails.title,
                    author : bookDetails.author,
                    publisher: bookDetails.publisher,
                    language : bookDetails.language,
                    isbn: bookDetails.isbn,
                    no_ofpages: bookDetails.no_ofpages,
                    imageUrl: bookDetails.imageUrl,
                    category: bookDetails.category,
                    price: bookDetails.price,
                    dprice:bookDetails.dprice,
                    abstract: bookDetails.abstract,
                    uploadImgs :bookDetails.uploadImgs,
                    userMail: bookDetails.userMail,
                    status: 'sold',
                    broughtBy: email
                },{new:true})
                                    console.log("hii");

                const lineItem = [{
                    price_data: {
                        currency:'usd',
                        product_data:{
                            name:bookDetails.title,
                            description:`${bookDetails.author} | ${bookDetails.publisher}`,
                            images: [bookDetails.imageUrl],
                            metadata:{
                                language : bookDetails.language,
                                no_ofpages: `${bookDetails.no_ofpages}`,
                                category: bookDetails.category,
                                price: `${bookDetails.price}`,
                                dprice:`${bookDetails.dprice}`,
                                isbn: bookDetails.isbn,
                                abstract: String(bookDetails.abstract || '').slice(0, 20),
                                userMail: bookDetails.userMail,
                                broughtBy: email
                            }
                            
                        },
                        unit_amount:Math.round(bookDetails.dprice*100),
                
                    
                    },
                    quantity:1
                }]
                                    console.log("hi");
                // create a checkout session for stripe
                const session = await stripe.checkout.sessions.create({
                    // payment type
                    payment_method_types:['card'],                    
                    // detatails of product
                    line_items:lineItem,
                    mode:'payment',
                    success_url:'https://bookstore-frontend-two-kappa.vercel.app/payment-success',
                    cancel_url:'https://bookstore-frontend-two-kappa.vercel.app/payment-error'
                })
                                    console.log("hello");
                console.log(session);
                res.status(200).json({sessionId:session.id})

    } catch (error) {
        res.status(500).json(error)
    }
    
}



//------------admin-------------
exports.getAllBooksAdminController = async(req,res)=> {
    try {
        const allBooks = await books.find()
        
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

// approve book
exports.approveBookController = async (req,res)=>{
    try {
        const {id} = req.params
        const existingBook = await books.findOne({_id:id})
        const updatedBook = await books.findByIdAndUpdate({_id:id},{
            title : existingBook.title,
            author : existingBook.author,
            publisher: existingBook.publisher,
            language : existingBook.language,
            isbn: existingBook.isbn,
            no_ofpages: existingBook.no_ofpages,
            imageUrl: existingBook.imageUrl,
            category: existingBook.category,
            price: existingBook.price,
            dprice:existingBook.dprice,
            abstract: existingBook.abstract,
            uploadImgs :existingBook.uploadImgs,
            userMail: existingBook.userMail,
            status: 'approved',
            broughtBy: existingBook.broughtBy
        },{new:true})
        res.status(200).json(updatedBook)

    } catch (error) {
        req.status(500).json(error)
    }
}