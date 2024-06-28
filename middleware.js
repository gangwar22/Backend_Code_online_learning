import jwt from 'jsonwebtoken';
const JWT_SECRET = '@rahul123'

// create token here
const createToken = (email)=>{
    return jwt.sign({email},JWT_SECRET , {expiresIn:'1h'})
}


//verifyToken
const verifyToken = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export {createToken , verifyToken}