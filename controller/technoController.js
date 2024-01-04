const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.getAll = async(req, res)=> {
    const sql = "SELECT * from technologie";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}

exports.add = async(req, res)=>{
    const {nomTechno,nomCreateur} = req.body
    const sql = "INSERT into technologie(nom_techno,date_creation,nom_createur) VALUES (?,"+new Date().toJSON().slice(0,10)+",?) "
    const resultat = await db.query(sql,[nomTechno,nomCreateur])
    res.status(200).json(resultat)
}

exports.delete = async(req,res)=>{
    const id= req.param.id
    const sql = "DELETE FROM technologie WHERE id_techno=?"
    const resultat = await db.query(sql,id)
    res.status(200).json(resultat)
}

exports.update = async(req,res)=>{
    res.status(200).json("fait")
}