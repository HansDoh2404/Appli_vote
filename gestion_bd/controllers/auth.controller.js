const models = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')

function signUp(req, res){ //Fonction pour créer un utilisateur

    //Sign up
    models.users.findOne({where:{email:req.body.email}}).then(result =>{
         if(result){
            res.status(409).json({
                message: "L'email exite déjà"
            })
         }else{

            const util = { // "util" pour utilisateur
                nom: req.body.nom,
                email: req.body.email,
                password: req.body.password,
                adminId: req.userData
            }

            console.log(util.password)

            const schema = {
                nom: {type:"string", optional: false, max:"100"},
                email: {type:"string", optional: false, max:"100"},
                password: {type:"string", optional: false, max:"100"}
            }
        
            const v = new Validator()
            const validationResponse = v.validate(util, schema)
        
            if(validationResponse !== true){
                return res.status(400).json({
                    message: "Validation échouée",
                    errors: validationResponse
                })
            }

            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    util.password = hash
                
                    models.users.create(util).then(result => {
                        res.status(201).json({
                            message: "Utilisateur créé avec succès"
                        })
                    }).catch(error => {
                        res.status(500).json({
                            message: "Un problème est survenu !"
                        })
                    });
                })
            })

         }
    }).catch(error => {
        res.status(409).json({
            message: "L'email existe déjà !"
        })

    })


}

function login(req, res){
    models.users.findOne({where:{email: req.body.email}}).then(user =>{
        if(user === null){
            res.status(401).json({
                message: "Veuillez revérifier votre e-mail"
            })
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        id: user.id
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

function updatePasswd(req, res) { // Modifier mot de passe
    const id = req.userData.adminId

    console.log(id)

    const updatePutil = {
        password: req.body.password
    }

    const schema = {
        password: {type:"string", optional: false, max:"100"}
    }

    const v = new Validator()
    const validationResponse = v.validate(updatePutil, schema)

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation échouée",
            errors: validationResponse
        })
    }

    bcryptjs.genSalt(10, function(err, salt){
        bcryptjs.hash(req.body.password, salt, function(err, hash){
            updatePutil.password = hash

            models.users.update(updatePutil, {where: {id:id}}).then(result => {
                res.status(200).json({
                    message: "Utilisateur modifié avec succès",
                    modif: updatePutil
                })
            }).catch(error =>{
                res.status(500).json({
                    message: "Un problème est survenu !",
                    error: error
                })
            })
            
        })
    })
}

module.exports = {
    signUp: signUp,
    login: login,
    updatePasswd: updatePasswd
}