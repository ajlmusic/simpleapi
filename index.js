import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(process.env.TOKEN_SECRET);

app.options('*', cors());

app.get('/', (req, res) => {
    let msg = {msg: 'Welcome to the Files API'}
    res.json(msg);
});


app.get('/categories', (req, res) => {
    let categories = [
        {id: 1, name: 'books'},
        {id: 2, name: 'colleges'},
        {id: 3, name: 'events'},
        {id: 4, name: 'locations'}
    ]
    res.json(categories);
});

app.get('/files', function(req, res){
    let options = {
        root: path.join(__dirname)
    };
     console.log(__dirname);
    let fileName = 'welcome.pdf';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});




app.listen(port, () => console.log(`App running at http://localhost:${port}`));
