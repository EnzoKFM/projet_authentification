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

const getAllUser = async () => {
    const userTable = await db.query("SELECT * from user")
    return userTable;
}

export {createUser, getAllUser}

