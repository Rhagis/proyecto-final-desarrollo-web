import User from '../models/user.model.js';
import cookies from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

//login
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 36000000
        });
        res.status(200).json({ message: 'Login successful', token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error)
    }
};

//registrar nuevo usuario
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already in use' });
        }
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
        console.log(error);
    }
};

//obtener perfil de usuario
export const getProfile = async (req, res) => {
    
    try {
        const user = await User.findById(req.userId).select('-password');
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error)
    }
}

//usuario logeado
export const getCurrentUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        
    }
};

//logout
export const logout = (req, res) => {
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.status(200).json({ message: 'Logout successful' });
};