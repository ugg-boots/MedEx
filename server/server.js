const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// require('dotenv').config();
// const { PRIORITY_LOW } = require("constants");

const app = express();
const port = process.env.PORT || 3000;

// const DIST_DIR = path.join(__dirname, "dist");
// const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("dist"));

app.use(session({
  secret: "secretcode",
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}));

app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

require('./passportConfig')(passport);

const apiRouter = require('./routes/api.js');

app.use('/api', apiRouter); 

//router handler to respond with main app
// app.get("/", (req, res) => {
//   res.sendFile(HTML_FILE, function(err){
//      if(err){
//         res.status(500).send(err);
//      }
//   });
// });


// global error handler
app.use((err, req, res, next) => {
   const defaultErr = {
     log: 'Express error handler caught unknown middleware error',
     status: 500,
     message: { err: 'An error occurred' },
   };
   const errorObj = Object.assign({}, defaultErr, err);
   console.log(errorObj.log);
   return res.status(errorObj.status).json(errorObj.message);
 });

 app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});
