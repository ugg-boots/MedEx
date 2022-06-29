const { Pool } = require("pg");

// old database from Lynda:
// const PG_URI = "postgres://rocfqfgu:0E_896SmK-YxM-PPLgz6PZXWNxNTdjKc@fanny.db.elephantsql.com/rocfqfgu";
  // "postgres://sowqmvmc:C8VcOF5uXm7v7Utsy-wL7WEor3YPR-Tq@fanny.db.elephantsql.com/sowqmvmc"

// old database from Heather:
const PG_URI = "postgres://rocfqfgu:0E_896SmK-YxM-PPLgz6PZXWNxNTdjKc@fanny.db.elephantsql.com/rocfqfgu"

// new database to be used once ready:
// const PG_URI = "postgres://sssalwhd:qu-2RjmASG1jsAJZIuwVDbJnd8M1Sh7V@fanny.db.elephantsql.com/sssalwhd"
// const PG_URI = "postgres://oqlouqei:JUJKAaZvugUDfsiOPe5ZpWmyfaIv2BdR@fanny.db.elephantsql.com/oqlouqei"


// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
})

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text)
    return pool.query(text, params, callback)
  },
}
