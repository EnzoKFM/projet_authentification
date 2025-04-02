import express from 'express';
import authentificationRouter from './routes/authentificationRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());

app.get('/', (req, res, next) => {
    res.render('index')
})

app.use('/apiauth', authentificationRouter);

app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})