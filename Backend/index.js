const express = require("express")
const bodyParser = require('body-parser');
const cors = require("cors")
const connection = require("./dbconnection")

let app = express();
let port = 5000;
app.use(cors())
// app.use(express.json())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", (req, res) => {
    res.send("Hiiii")
})

app.listen(port, function(){
 console.log(`Server runnung.....`)
})

app.get("/view", (req, res) => {
    let pgquery = "SELECT * FROM employee";
    connection.query(pgquery, function (err, result) {
        if (err) {
            console.log(err.message);
        } else {
            res.send(result.rows);
        }
    });
});

app.post("/add", (req, res) => {
    let data = req.body;
    let pgsql = "INSERT INTO employee (name, date_of_joining, image) VALUES ($1, $2, $3)";
    connection.query(pgsql, [data.name, data.date_of_joining, data.image], (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

app.delete("/remove", (req, res) => {
    let id = req.query.id;
    let pgsql = "DELETE FROM employee WHERE id = $1";
    connection.query(pgsql, [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send("Internal Server Error");
        }else{
            res.send("Employee deleted successfully");
        }
    });
});