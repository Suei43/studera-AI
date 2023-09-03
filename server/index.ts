import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { redisClient } from './services/redis';
const cors = require('cors')

const app = express();
require('dotenv').config();
const { storePrompt, promptController, regeneratePromptController } = require('./controllers/promptController')
const {userController} = require('./controllers/userController');

// redisConnect(redisClient)

app.use(cors());

app.use(storePrompt)

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.post('/study-materials', storePrompt, promptController);

app.post('/re-study-materials', storePrompt, regeneratePromptController)

app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        message: "Success"
    });
});

app.listen(port, () => {
    console.log(`Running -> http://localhost:${port}`);
});



function checkAdmin (req: Request,res: Response){
    const username = req.query.username;
    const password = req.query.password;

    if(username === 'test' && password === 'test') {
        return res.status(200).json({
            message: "success",
            username: username,
            isLoggedIn: true 
        });
    } else {
        return res.status(400).json({
            message: "failure",
            isLoggedIn: false
        });
    }
}
async function redisConnect (redisClient: any){
    await redisClient.connect();
}