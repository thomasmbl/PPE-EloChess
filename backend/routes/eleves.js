const express = require('express')
const router = express.Router()

const Eleve = require('../models/eleve')

//Get All
router.get('/', async (req, res) => {
    try {
        const eleves = await Eleve.find()
        res.json(eleves)        
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Get One
router.get('/:id', getEleve, async (req, res) => {
    res.json(res.eleve)
})

//Create One
router.post('/', async (req, res) => {
    const eleve = new Eleve({
        nom: req.body.nom,
        prenom: req.body.prenom,
        section: req.body.section,
        classe: req.body.classe,
        pseudo: req.body.pseudo,
        
        elo: parseInt(req.body.elo),
        maison: req.body.maison,
        nbPartiesJoue: req.body.nbPartiesJoue,
        nbPartiesGagne: req.body.nbPartiesGagne,
        idEcole: req.body.idEcole,
        
    })
    try {
        const newEleve = await eleve.save()
        res.status(201).json(newEleve)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Update One
router.patch('/:id', getEleve, async (req, res) => {
    if(req.body.nom != null) {
        res.eleve.nom = req.body.nom
    }
    if(req.body.prenom != null) {
        res.eleve.prenom = req.body.prenom
    }
    if(req.body.section != null) {
        res.eleve.section = req.body.section
    }
    if(req.body.classe != null) {
        res.eleve.classe = req.body.classe
    }
    if(req.body.pseudo != null) {
        res.eleve.pseudo = req.body.pseudo
    }
    
    if(req.body.elo != null) {
        res.eleve.elo = req.body.elo
    }
    if(req.body.maison != null) {
        res.eleve.maison = req.body.maison
    }
    if(req.body.nbPartiesJoue != null) {
        res.eleve.nbPartiesJoue = req.body.nbPartiesJoue
    }
    if(req.body.nbPartiesGagne != null) {
        res.eleve.nbPartiesGagne = req.body.nbPartiesGagne
    }
    if(req.body.idEcole != null) {
        res.eleve.idEcole = req.body.idEcole
    }
   try {
    const updatedEleve = await res.eleve.save()
    res.json(updatedEleve)
   } catch (err) {
    res.status(400).json({ message: err.message })
   }
})

//Delete One
router.delete('/:id', getEleve, async (req, res) => {
   try {
    await res.eleve.remove()
    res.json({ message: 'Deleted Eleve'})
   } catch (err) {
    res.status(500).json({ message: err.message })
   }
})

async function getEleve(req, res, next) {
    let eleve
    try {
        eleve = await Eleve.findById(req.params.id)
        if (eleve == null) {
            return res.status(404).json({message: 'Cannot find eleve'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.eleve = eleve
    next()
}


module.exports = router