const mongoose = require('mongoose')

const saisonSchema = new mongoose.Schema({
    saisonNumber: {
        type: String, 
        required: true
    },
    deathsNumber: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('saison', saisonSchema )
