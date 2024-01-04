const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cookies = require('cookies')
require('dotenv').config()

exports.getAllUser = async(req, res)=> {
    const sql = "SELECT * from user";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}

exports.register = async(req,res)=>{
    const {email, password} = req.body
    const  result = await db.query("select * from utilisateur where email = ?",[email])
    if(result.length>0){
        return res.status(401).json(error("déja existant"))
    }
    const hashMdp = await bcrypt.hash(password, 10)
    await db.query("INSERT INTO utilisateur (nom, prenom, email, mdp)VALUES('Testeur','testi',?,?)",[email,hashMdp])
    const token = jwt.sign(email, process.env.SECRET_KEY,{expiresIn : '10h'})
    res.json(token)
}

exports.login = async(req,res)=>{
    const {email,password} = req.body
    const  result = await db.query("select mdp from utilisateur where email = ?",[email])
    const client= result[0]
    const samePad= await bcrypt.compare(password,client.mdp)
    if(!samePad)
        return res.status(401).json({error: "mdp incrrect"})
    
    const token = jwt.sign({'email':email}, process.env.SECRET_KEY,{expiresIn : "10h"})
    const cookies = new Cookies(req, res)
    cookies.set('token', token)
    res.redirect('/com/getAll')
}
