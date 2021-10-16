const pool = require("../models/inventoryModel")
const bcrypt = require('bcryptjs');
const passport = require("passport");
const authController = {};

authController.register = (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;
  const findUserparam = [username]
  const usernameQuery = 'SELECT * FROM users WHERE username = $1';

  pool.query(usernameQuery, findUserparam, async (err, data) => {
    if (err) throw err;
    if (data.rows.length) {
      res.locals.registerMessage = 'exists';
      next();
    }
    else if (!data.rows.length) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserparams = [username, hashedPassword, firstName, lastName];
      const newUserQuery = 'INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *';
            
      pool.query(newUserQuery, newUserparams, (err, data) => {
        if (err) throw err;
        else {
          const user = data.rows[0];
          res.locals.registerMessage = 'registered';
          next();
        }
      });
    };
  })
}

authController.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json('Invalid login');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json(user);
      });
    }
  })(req, res, next);
};

module.exports = authController;