const models = require('../models')
const bcryptjs = require('bcryptjs')
const Validator = require('fastest-validator')
//const jwt = require('jsonwebtoken')

// Nous utiliserons la fonction signUp définie dans le auth.controller
// pour créer les utilisateurs, elle joue le même rôle que cette fonction "save"

/*function save(req, res){//Fonction pour créer un utilisateur
    const util = { // "util" pour utilisateur
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password,
        adminId: req.userData
    }

    console.log(req.userData.user)

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


    models.users.create(util).then(result => {
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            util: result
            })
        }).catch(error => {
        res.status(500).json({
            message: "Un problème est survenu",
            error: error
        })
    })
               
}*/ 

/*function signUp(req, res){

    //Sign up
    const util = { // "util" pour utilisateur
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password,
        adminId: req.userData
    }
    
    models.users.findOne({where:{email:req.body.email}}).then(result =>{
         if(result){
            res.status(409).json({
                message: "L'email exite déjà"
            })
         }else{

            console.log(util.adminId.login)

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
}*/

function show(req, res){ //Fonction pour lire un utilisateur dans la BD
    const id = req.params.id

    console.log(id)

    models.users.findByPk(id).then(result =>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message: "Utilisateur non trouvé"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Un problème est survenu !"
        })
    })
}

function index(req, res){ // Fonction pour retrouver tous les utilisateurs
    models.users.findAll().then(result =>{
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong !"
        })
    })
}

function update(req, res) {
    const id = req.params.id

    const updatedUtil = {
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password
    }

    const schema = {
        nom: {type:"string", optional: false, max:"100"},
        email: {type:"string", optional: false, max:"100"},
        password: {type:"string", optional: false, max:"100"}
    }

    const v = new Validator()
    const validationResponse = v.validate(updatedUtil, schema)

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation échouée",
            errors: validationResponse
        })
    }

    bcryptjs.genSalt(10, function(err, salt){
        bcryptjs.hash(req.body.password, salt, function(err, hash){
            updatedUtil.password = hash

            models.users.update(updatedUtil, {where: {id:id}}).then(result => {
                res.status(200).json({
                    message: "Utilisateur modifié avec succès",
                    modif: updatedUtil
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

function destroy(req, res){
    const id = req.params.id
    //const userId = req.userData.user

    models.users.destroy({where: {id:id}}).then(result => {
        res.status(200).json({
            message: "Utiiisateur supprimé avec succès",
        })
    }).catch(error =>{
        res.status(500).json({
            message: "Un problème est survenu !",
            error: error
        })
    })
}



module.exports = {
    //save: save,
    show: show,
    index: index, //obtenir tous les utilisateurs
    update: update,
    destroy: destroy,
    //signUp: signUp
}