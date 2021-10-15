const pool = require("./models/inventoryModel");
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const passport = require("passport");

module.exports = function() {

    passport.use(new LocalStrategy((username, password, done) => { 
      pool.query('SELECT * FROM users WHERE username=$1', [username], (err, result) => {
          if(err) {
            return done(err)
          }
          if(result.rows.length > 0) {
            const first = result.rows[0]
            bcrypt.compare(password, first.password, function(err, res) {
              if(res) {
                done(null, { id: first.user_id, username: first.username })
               } else {
                done(null, false)
               }
             })
           } else {
             done(null, false)
           }
        })
      }))

      
}

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  pool.query("SELECT * FROM users WHERE user_id = $1 ",[parseInt(user.id, 10)], (err, results) => {
    if(err) return done(err);  
    done(null, results.rows[0]);
  });
})