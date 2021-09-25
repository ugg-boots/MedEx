const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`The app server is running on port: ${port}`);
});

const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("dist"));

const apiRouter = require(path.join(__dirname, '/routes/api.js'))

app.use('/api', apiRouter);


// router handler to respond with main app
// app.get("/", (req, res) => {
//    res.sendFile(HTML_FILE, function(err){
//       if(err){
//          res.status(500).send(err);
//       }
//    });
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