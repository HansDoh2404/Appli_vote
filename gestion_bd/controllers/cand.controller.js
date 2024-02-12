const models = require('../models')
const Validator = require('fastest-validator')

function saveCand(req, res){//Fonction pour créer un candidat
    const cand = { // "cand" pour utilisateur
        nom: req.body.nom,
        description: req.body.descrip,
        vision: req.body.vision,
        slogan: req.body.slogan
    }

    const schema = {
        nom: {type:"string", optional: false, max:"100"},
        description: {type:"string", optional: true, max:"500"},
        vision: {type:"string", optional: true, max:"100"},
        slogan: {type:"string", optional: true, max:"100"}
    }

    const v = new Validator()
    const validationResponse = v.validate(cand, schema)

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation échouée",
            errors: validationResponse
        })
    }


    models.Candidat.create(cand).then(result => {
        res.status(201).json({
            message: "Candidat créé avec succès",
            util: result
            })
        }).catch(error => {
        res.status(500).json({
            message: "Un problème est survenu",
            error: error
        })
    })
               
}

function updateCand(req, res) {

    const id = 14

    const updateCand = {
        nom: req.body.nom,
        description: req.body.descrip,
        vision: req.body.vision,
        slogan: req.body.slogan
    }

    const name = req.body.nom

    const schema = {
        nom: {type:"string", optional: false, max:"100"},
        descrip: {type:"string", optional: true, max:"500"},
        slogan: {type:"string", optional: true, max:"100"},
        vision: {type:"string", optional: true, max:"100"}
    }

    const v = new Validator()
    const validationResponse = v.validate(updateCand, schema)

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation échouée",
            errors: validationResponse
        })
    }

    models.Candidat.update(updateCand, {where: {id:id}}).then(result => {
        res.status(200).json({
            message: "Utilisateur modifié avec succès",
            modif: updateCand
        })
    }).catch(error =>{
        res.status(500).json({
            message: "Un problème est survenu !",
            error: error
        })
    })
}

module.exports = {
    saveCand : saveCand,
    updateCand: updateCand
}