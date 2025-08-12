const users = require("../modal/userModal");
const jwt = require("jsonwebtoken")

exports.registerController = async (req, res) => {
    const { username, password, email } = req.body
    console.log(username, email);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json('user already exist')
        } else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(402).json(error)
    }
}

exports.loginController = async (req, res) => {

    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, process.env.JWT_SECRETKEY)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(403).json("invalid credentials")
            }
        } else {
            res.status(406).json("user does not exist! please Register")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.googleLoginController = async (req, res) => {
    const { username, email, password, profile } = req.body
         console.log(profile);
         
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email }, process.env.JWT_SECRETKEY)
            res.status(200).json({ existingUser, token })
            console.log(existingUser);
            
        } else {
            const newUser = new users({
                username,
                email,
                password,
                profile
            })
            await newUser.save()
            console.log(newUser);
            
            const token = jwt.sign({ userMail: email }, process.env.JWT_SECRETKEY)
            res.status(200).json({ existingUser: newUser, token })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// ----------admin---------------

exports.getAllUsersController = async (req, res) => {
    const query = {
        email: {
            $ne: 'bookstoreAdmin@gmail.com'
        }
    }
    try {
        const allUsers = await users.find(query)
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update profile
exports.updateProfilecontroller = async (req, res) => {
    const userMail = req.payload
    const { username, password, bio, profile } = req.body
    const dp = req.file ? req.file.filename : profile
    console.log(dp);
    
    try {
        const updatedProfile = await users.findOneAndUpdate({email:userMail},{
            username,
            email:userMail,
            password,
            bio,
            profile:dp
        },{new:true})
        res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(500).json(error)
    }
}