import { Router } from "express";
import jwt from 'jsonwebtoken';
import { createNewUser, verifyUser } from "../controllers/userController.js"
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const jwtSecretKey = process.env.jwtSecretKey;

// Middleware
const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/apiauth/login');
    try {
        const user = jwt.verify(token, jwtSecretKey);
        req.user = user;
        next();
    } catch {
        res.redirect('/apiauth/login');
    }
}

//Inscription
const register = async (req, res) => {
    const {username, password} = req.body;

    createNewUser(username,password);

    res.redirect("/apiauth/login")
}

//Authentification
const login = async (req, res) => {
    const {username, password} = req.body;

    const answer = await verifyUser(username,password);
    if(answer){
        const token = jwt.sign({username:username, role: "user"}, jwtSecretKey, { expiresIn: '1h' })
        res.cookie('token', token, {httpOnly : true});
        res.redirect("/apiauth/dashboard");
    } else {
        res.send("Mauvais Mot de Passe");
    }
    
}

// Inscription
router.get('/register', (req,res) => {
    res.render('register');
})

router.post('/register', register)

// Authentification
router.get('/login', (req,res) => {
    res.render('login');
})

router.post('/login', login)

// Dashboard
router.get('/dashboard', authenticate, (req,res) => {
    res.render('dashboard', { username: req.user });
})

router.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
})

export default router; 