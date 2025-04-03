import { createUser, findUser } from '../models/userModel.js';
import bcrypt from 'bcrypt';

const createNewUser = async (username,password) => {
    const user = await findUser(username);

    if(user[0].length != 0){
        return;
    }

    bcrypt.hash(password, 10, (err, hash) => {
        createUser(username,hash)
    })
}

const verifyUser = async (nameToVerify,passToVerify) => {
    const user = await findUser(nameToVerify);
    
    const result = await bcrypt.compare(passToVerify,user[0][0].password)

    return result;
}

const getUserRole = async (nameToVerify) => {
    const user = await findUser(nameToVerify);
    
    const result = user[0][0].role;

    return result;
}

export {createNewUser, verifyUser, getUserRole}



