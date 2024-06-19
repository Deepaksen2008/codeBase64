const pg = require("pg")

const connection = new pg.Client({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "12345",
    database: "base64"
})

connection.connect(function (err) {
    if (err) {
        console.log("Connection error");
    } else {
        console.log("Connected...");
    }
})

module.exports = connection;