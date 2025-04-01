import express from 'express';
import authentificationRouter from './routes/authentificationRoutes.js'

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded())
app.use('/apiauth', authentificationRouter);

app.get('/', (req, res, next) => {
    res.render('index', { nom: 'John Doe', age: 25})
})

app.get('/connect', (req, res, next) => {
    res.render('connect', { error: "" })
})

app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})