const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../database/database')
const Cookies = require('cookies')


exports.authenticator = (req, res, next) => {
    // récupérer le token
    const cookies = new Cookies(req, res)

    const token = req.headers.authorization === undefined ? cookies.get('token') : req.headers.authorization
    if (token && process.env.SECRET_KEY) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            // si problème => erreur
            if (err) {
                res.status(401).json({ erreur: "accès refusé "+ err })
            }
            // décoder => next()
            else {
                cookies.set('email', decoded.email)
                next()
            }
        })
    } else {
        res.status(401).json({ erreur: "accès refusé" })
    }
}

exports.isAdmin = async (req, res) => {
    const email = cookies.get('email',{ signed: true })
    const result = await db.query('SELECT admin FROM client where email= ?', [email])
    if (result.length === 1 && (result[0].admin === 1)) {
        next()
    }
    else {
        res.status(403).json({ erreur: "access denied" })
    }
}

exports.isJournalist = async(req,res)=>{
    const result = await db.query('SELECT journaliste FROM client where email= ?', [email])
    if (result.length === 1 && (result[0].journalist === 1 )) {
        next()
    }
    else {
        res.status(403).json({ erreur: "access denied" })
    }

}