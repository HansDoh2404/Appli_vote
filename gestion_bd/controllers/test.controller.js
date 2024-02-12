const models = require('../models')

//Fonction de vote :
//Incrémentation du nombre de voix pour chaque candidat
//Obligation de voter une seule fois

async function test(req, res) { 

    const votant = await models.users.findOne({where:{email:req.userData.email}})
    console.log(req.userData)
    if(votant.voted){
        res.status(409).json({
            message: "Vous avez déjà voté"
        })
    }else{
        const id_cand = 10

        votant.candidatId = id_cand
        votant.voted = true

        const cand = await models.Candidat.findByPk(id_cand)
        cand.nb_voie++

        await votant.save()
        await cand.save()

        res.status(200).json({
            data: cand.nom,
            messsage: "Nombre de voie obtenue : " + cand.nb_voie
        })
    }      
}

async function nbVotes(req, res){
    
    const total = 37
    const total_votes = await models.Candidat.sum('nb_voie')

    res.status(200).json({
        messsage: "Total des étudiants de la 7è promotion : " + total,
        particip: "Nombre de votants : " + total_votes,
        nuls: "Nombre de bulletins nuls : " + (total - total_votes)
    }) 
}

module.exports = {
    test:test,
    nbVotes: nbVotes
}