import UserModel from '../Models/UserModel'
import "bcrypt"
import "validator"
import "jsonwebtoken"

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

const verifyToken = (token) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.verify(token, jwtkey)
}


const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body
    } catch {

    }

}