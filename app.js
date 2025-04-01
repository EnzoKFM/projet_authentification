import express from 'express';
import authentificationRouter from './routes/authentificationRoutes.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authentificationRouter);

app.get('/', (req, res, next) => {
    res.send('on index');
})

app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})