import { createUser,getAllUser } from '../models/userModel.js';
import bcrypt from 'bcrypt';

const createNewUser = (username,password) => {
    bcrypt.hash(password, 10, (err, hash) => {
        createUser(username,hash)
    })
}

const verifyUser = async (nameToVerify,passToVerify) => {
    const userTable = await getAllUser();
    for (let i = 0; i < userTable[0].length; i++) {
        if(userTable[0][i].username === nameToVerify){
            const result = await bcrypt.compare(passToVerify,userTable[0][i].password)

            return result;
            // if(result) {
            //     return `Vous êtes bien l'utilisateur ${userTable[0][i].username}`;
            // } else {
            //     return "Mot de passe incorrect";
            // }
        }
    }
}

export {createNewUser, verifyUser}



