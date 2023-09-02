const sqlite3 = require('sqlite3').verbose();

function connect() {
    const db = new sqlite3.Database('./database.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Successfully connected to the database.');
    });
    return db;
}

function close(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Successfully closed the database connection.');
    });
}

async function insertUser(username, password) {
    const db = connect();
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

    try {
        await new Promise((resolve, reject) => {
            db.run(query, [username, password], function (err) {
                if (err) {
                    console.error('Error inserting user:', err);
                    reject(err);
                } else {
                    console.log('User inserted successfully.');
                    resolve();
                }
            });
        });
    } catch (error) {
        throw error;
    } finally {
        close(db);
    }
}

function getUserPassword(username) {
    const db = connect();
    const query = `SELECT password FROM users WHERE username = ?`;

    return new Promise((resolve, reject) => {
        db.get(query, [username], (err, row) => {
            if (err) {
                console.error('Error retrieving user password:', err);
                reject(err);
            } else {
                resolve(row ? row.password : null);
            }
            close(db);
        });
    });
}

async function getUserInfo(username) {
    const db = connect();
    const query = `SELECT username, courses, currentlystudying, learningpath FROM users WHERE username = ?`;

    try {
        return await new Promise((resolve, reject) => {
            db.get(query, [username], (err, row) => {
                if (err) {
                    console.error('Error retrieving user info:', err);
                    reject(err);
                } else {
                    resolve(row ? row : null);
                }
            });
        });
    } catch (error) {
        throw error;
    } finally {
        close(db);
    }
}

module.exports = {
    connect,
    close,
    insertUser,
    getUserPassword,
    getUserInfo,
};
