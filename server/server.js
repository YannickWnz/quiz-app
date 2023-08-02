import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'

const salt = 10

const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET'],
    credentials: true
}))
app.use(cookieParser())



const db = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "bookapp"
})

app.get('/users', (req, res) => {

    const query = "select * from users"
    db.query(query, (err, data) => {
        if(err) { return res.json('smth wrong ') }
        return res.json(data)
    } )

})

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        // return res.json({Error: 'not authorized. Please login 1'});
        return res.status(401).json({ error: 'Not authorized. Please login 1' });
    } 
    else {
        jwt.verify(token, 'jwt-key', (err, decoded) => {
            if(err) {
                return res.status(401).json({ error: 'Not authorized. Please login 2' });
            }
            next()
        })
    }
}

app.get('/checkToken', verifyToken, (req, res) => {
    // return res.json('success')
    return res.json({Status: 'success'})
}) 

app.post('/signup', async (req, res) => {

    const query = `INSERT INTO quizappusers (name, password) VALUES (?)`

    const q = 'SELECT name FROM quizappusers WHERE name = ?'

    db.query(q, [req.body.name], (err, results) => {

        if(results.length > 0) return res.json({Error: 'name already exists'})
    
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if(err) return res.json({Error: 'error hashing'})
    
            const values = [
                req.body.name,
                hash
            ]
    
            db.query(query, [values], (err, results) => {
                if(err) return res.json({Error: 'err'})
                if(results) {

                    const name = req.body.name

                    const token = jwt.sign({name}, 'jwt-key', {expiresIn: '1d'});
                    res.cookie('token', token)

                    return res.json({Status: 'users registered'})
                }
            } )
    
        })

    })

})

app.post('/signin', async (req, res) => {

    const query = ' SELECT * FROM quizappusers WHERE name = ?'

    db.query(query, [ req.body.username ], (err, data) => {

        if(err) return res.json({Error: 'username does not exist'})
        if(data.length > 0) {

            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: 'Error occurred'})

                if(response) {

                    const name = data[0].name

                    const token = jwt.sign({name}, 'jwt-key', {expiresIn: '1d'})
                    res.cookie('token', token)

                    return res.json({Status: 'Success'})
                    
                } else {
                    return res.json({Error: 'password does not match'})
                }

            })

        } else {
            return res.json({Error: 'No user found'})
        }

    })

})


app.listen(1556, () => {
    console.log('listening to you my friend ')
})