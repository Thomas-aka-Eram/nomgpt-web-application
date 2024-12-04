import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { OAuth2Client } from "google-auth-library";
import UserModel from '../Models/UserModel.js';

// Create a JWT token
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

//Create GOogle client
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);

// Verify a JWT token
const verifyToken = (token) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.verify(token, jwtkey);
};

// Register a new user
const registerUser = async (req, res) => {



    try {
        const { username, image, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, and 1 number.",
            });
        }

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const newUser = await UserModel.create({ username, email, image, password: hashedPassword });

        // Create a token
        const token = createToken(newUser._id);

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Google authentication handler
const googleAuth = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: "Google ID token is required" });
        }

        // Verify Google ID token
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_ID,
        });


        const { sub: googleId, email, name, picture } = ticket.getPayload();

        // Check if the user already exists
        let user = await UserModel.findOne({ googleId });

        if (!user) {
            // If the user doesn't exist, create a new one
            user = await UserModel.create({
                googleId,
                email,
                username: name,
                image: picture,
            });
        }

        // Create a JWT token
        const token = createToken(user._id);

        res.status(200).json({ message: "Google authentication successful", token });
    } catch (error) {
        console.error("Error during Google authentication:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Log in an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Create a token
        const token = createToken(user._id);

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Middleware to protect routes
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = verifyToken(token);
        req.user = await UserModel.findById(_id).select("_id");
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid token" });
    }
};

const getUserData = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);

        // Fetch user data from database
        const user = await UserModel.findById(decoded._id).select('username email image');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user data' });
    }
};


export { registerUser, loginUser, requireAuth, googleAuth, getUserData };
