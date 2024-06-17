const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    pass: 'Jump@123',
    database: 'dashboard'
})

app.post('/signup', (req, res) => {
    // INSERT INTO registration (name, userid, password) VALUES ('nish','ns','N!$hB17@7')
    const sql = "INSERT  INTO registration (name, userid, password) VALUES (?)"
    values = [req.body.name, req.body.userid, req.body.password]
    connection.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM registration WHERE `userid` = ?  and `password` = ?"
    values = [req.body.userid, req.body.password]
    connection.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(err)
        }
        if (data.length > 0) {
            return res.json('Success')
        } else {
            return res.json('Failed')
        }
    })
})

app.listen(3002, () => {
    console.log("listening On 3002")
    connection.connect((dberror) => {
        if(dberror) throw dberror
        console.log("Database")
    })
    connection.end()
})
