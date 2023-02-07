const express = require('express')
const router = express.Router()
const Saison = require('../models/saison')

//Get All
router.get('/', async (req, res) => {
    try {
        const saisons = await Saison.find()
        res.json(saisons)        
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Get One
router.get('/:id', getSaison, (req, res) => {
    res.json(res.saison)
})
//Create One
router.post('/', async (req, res) => {
    const saison = new Saison({
        saisonNumber: req.body.saisonNumber,
        deathsNumber: req.body.deathsNumber,

        nom: req.body.nom,
    })
    try {
        const newSaison = await saison.save()
        res.status(201).json(newSaison)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

 })
//Update One
router.patch('/:id', getSaison, async (req, res) => {
    if (req.body.saisonNumber != null) {
        res.saison.saisonNumber = req.body.saisonNumber
    }
    if (req.body.deathsNumber != null) {
        res.saison.deathsNumber = req.body.deathsNumber
    }

    if (req.body.nom != null) {
        res.saison.nom = req.body.nom
    }
    try {
        const updatedSaison = await res.saison.save()
        res.json(updatedSaison)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
//Delete One
router.delete('/:id', getSaison, async (req, res) => {
    try {
        await res.saison.remove()
        res.json({ message: 'Deleted Saison' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSaison(req, res, next) {
    let saison
    try {
        saison = await Saison.findById(req.params.id)
        if (saison == null) {
            return res.status(404).json({message: 'Cannot find saison'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.saison = saison
    next()
}


module.exports = router