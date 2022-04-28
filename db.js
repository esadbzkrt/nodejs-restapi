const Pool = require('pg').Pool;

const pool= new Pool({
    host:"localhost",
    user:"postgres",
    password: "esad",
    database:"perntodo",
    port: "5432"
});

module.exports=pool;