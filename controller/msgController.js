const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getAll = async(req, res)=> {
    const sql = "SELECT * from commentaire";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}

exports.add = async(req,res)=>{
    const com = req.body
    const sql = "INSERT into commentaire(commentaire, date_creation, id_techno, id_user) VALUES (?,"+new Date().toJSON().slice(0,10)+",1,1) "
    const resultat = await db.query(sql,[com])
    res.status(200).json(resultat)
}