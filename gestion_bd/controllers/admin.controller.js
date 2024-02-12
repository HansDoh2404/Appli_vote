const models = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

function signUp_ad(req, res){

    //Sign up
    models.Admin.findOne({where:{login:req.body.login}}).then(result =>{
         if(result){
            res.status(409).json({
                message: "L'email exite déjà"
            })
         }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const admin = {
                        login: req.body.login,
                        password: hash
                    }
                    models.Admin.create(admin).then(result => {
                        res.status(201).json({
                            message: "Administrateur créé avec succès"
                        })
                    }).catch(error => {
                        res.status(500).json({
                            message: "Un problème est survenu !"
                        })
                    });
                })
            })
        }
    })
}

function login_ad(req, res){
    models.Admin.findOne({where:{login: req.body.login}}).then(admin =>{
        if(admin === null){
            res.status(401).json({
                message: "Veuillez revérifier votre e-mail"
            })
        }else{
            bcryptjs.compare(req.body.password, admin.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        login: admin.login,
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentification réussie",
                            token: token
                        })
                    })
                }else{
                    res.status(401).json({
                        message: "Mot de passe ou e-mail invalide"
                    })
                }
            })
        }
    }).catch(error => {
        res.status(409).json({
            message: "Un problème est survenu !",
            token: token
        }) 
    })
}

module.exports = {
    signUp_ad: signUp_ad,
    login_ad: login_ad
}