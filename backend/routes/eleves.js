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
router.get('/:id', (req, res) => {
    
})

//Create One
/*
section: req.body.section,
        classe: req.body.classe,
        pseudo: req.body.pseudo,
        mdp: req.body.mdp,
        elo: req.body.elo,
        maison: req.body.maison,
        nbPartiesJoue: req.body.nbPartiesJoue,
        nbPartiesGagne: req.body.nbPartiesGagne,
        idEcole: req.body.idEcole,

*/
router.post('/', async (req, res) => {
    const eleve = new Eleve({
        nom: req.body.nom,
        prenom: req.body.prenom,
        section: req.body.section,
        classe: req.body.classe,
        pseudo: req.body.pseudo,
        mdp: req.body.mdp,
        elo: req.body.elo,
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
router.patch('/:id', (req, res) => {
   
})

//Delete One
router.delete('/:id',  (req, res) => {
   
})




module.exports = router