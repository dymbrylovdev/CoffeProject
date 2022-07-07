const Pool = require("pg").Pool
const pool = new Pool({
    host: "localhost",
    user: "postgres" ,
    password: "reversepolarity",
    port: 5432,
    database:"pizza",
})

module.exports = pool;