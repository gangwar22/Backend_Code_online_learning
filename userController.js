import User from './User.js'
import { createToken } from './middleware.js';
import bcrypt from 'bcrypt';



const signup = async (req, res) => {
const { name, email, password } = req.body;
try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: 'User already exists. Please Login!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    const result = await newUser.save();
    res.status(201).json({ message: "Signup successful", result });
} catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server Error' });
}
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password. Please check..' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(email)
            res.cookie('token', token)
            res.status(200).json({ message: "user login successfully..", token })
        } else {
            return res.status(401).json({ message: 'invalid password..' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


const viewUser = async(req , res) =>{
    try {
        const Data = await User.find({})
        res.status(200).json({Data})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Errors');
    }
}

export {signup , login , viewUser}