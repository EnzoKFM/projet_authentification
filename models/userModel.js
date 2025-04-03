import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database : "authentification"
});

const createUser = async (username, pass) => {
    await db.query(`INSERT INTO user (username, password) VALUES ("${username}", "${pass}" );`)
}

const findUser = async (name) => {
    const user = await db.query(`SELECT * from user where username="${name}"`)
    return user;
}

export {createUser, findUser}

