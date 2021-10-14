const pool = require("./models/inventoryModel");
const bcrypt = require('bcryptjs');
const Strategy = require('passport-local');
const passport = require("passport");

module.exports = function() {

    passport.use(
        new Strategy((username, password, done) => {
            const param = [username];
            const userQuery = 'SELECT * FROM users WHERE username = $1';
            pool.query(userQuery, param, (err, rows) => {
                console.log(rows);
                if (err) throw err;
                if (!rows.length) return done(null, false);
                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, rows[0]);
                    } else {
                        return done(null, false)
                    }
                })
            })
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.user_id)
    })

    passport.deserializeUser((id, done) => {
        pool.query("SELECT * FROM users WHERE id = $1 ",[id], (err, rows) => {
            done(err, rows[0]);
        });
    })
}