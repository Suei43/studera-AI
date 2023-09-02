import { Request, Response } from 'express'
const bcrypt = require('bcrypt')
const db = require('../database.js');

const userController = async (req: Request, res: Response) => {
    const { username, password } = req.query;

    try {
        const existingUser = await db.getUserPassword(username);
        
        if (!existingUser) {

            const hashedPassword = await bcrypt.hash(password, 10);

            db.insertUser(username, hashedPassword);
            
            res.status(201).json({ message: 'User created successfully.' });
        } else {

            const userInfo = await db.getUserInfo(username);

            if (!userInfo) {
                res.status(404).json({ message: 'User not found.' });
            } else {
                res.status(200).json({data: userInfo});
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred.' });
    }
};

module.exports = {userController};
