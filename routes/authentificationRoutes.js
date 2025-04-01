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
    const username = req.body.username;
    const password = req.body.password;

    const answer = await verifyUser(username,password);
    if(answer){
        res.render('signin');
    } else {
        res.json("Mauvais Mot de Passe");
    }
    
}

router.post('/signup', signUp)

router.post('/signin', signIn)

export default router; 