import express from 'express';
import authentificationRouter from './routes/authentificationRoutes.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = 3000;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

app.use(session({ secret: 'unsecret', resave: false, saveUninitialized:true }));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());

app.get('/', (req, res, next) => {
    res.render('index')
})

app.use('/apiauth', authentificationRouter);

// Authentification Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),(req, res) => res.redirect('/profile')
);

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
        res.send(`<h1>Profil Google</h1><pre>${JSON.stringify(req.user, null,2)}</pre>`);
});

app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})