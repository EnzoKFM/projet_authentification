import { Router } from "express";
import { createNewUser, verifyUser } from "../controllers/userController.js"

const router = Router();

//Inscription
const signUp = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    res.json(createNewUser(username,password));
}

//Authentification
const signIn = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    const response = await verifyUser(username,password);
    res.json(response);
}

router.post('/signup', signUp)

router.post('/signin', signIn)

export default router; 