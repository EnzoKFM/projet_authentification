import { Router } from "express";
import jwt from 'jsonwebtoken';
import { createNewUser, verifyUser, getUserRole } from "../controllers/userController.js"
import dotenv from 'dotenv';
import { or } from "sequelize";

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

const isUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/apiauth/login');
    try {
        const user = jwt.verify(token, jwtSecretKey);
        if((user.role==="user") || (user.role==="admin")){
            req.user = user;
            next();
        }else{
            return res.redirect('/apiauth/login');
        }
    } catch {
        res.redirect('/apiauth/login');
    }
}

const isAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/apiauth/login');
    try {
        const user = jwt.verify(token, jwtSecretKey);
        if(user.role==="admin"){
            req.user = user;
            next();
        }else{
            return res.redirect('/apiauth/dashboard');
        }
    } catch {
        res.redirect('/apiauth/logout');
    }
}


// Register & Login
const register = async (req, res) => {
    const {username, password} = req.body;

    createNewUser(username,password);

    res.redirect("/apiauth/login")
}

const login = async (req, res) => {
    const {username, password} = req.body;

    const answer = await verifyUser(username,password);
    if(answer){
        const role = await getUserRole(username);
        const token = jwt.sign({username:username, role:role}, jwtSecretKey, { expiresIn: '1h' })
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
    res.render('dashboard', { username: req.user.username });
})

// Détails de l'utilisateur
router.get('/userDetails', isUser, (req,res) => {
    res.render('userDetails', { username: req.user.username, role:req.user.role });
})

router.get('/adminPanel', isAdmin, (req,res) => {
    res.render('adminPanel', { username: req.user.username });
})

// Déconnexion
router.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/');
})

export default router; 