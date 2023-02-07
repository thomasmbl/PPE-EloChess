const mongoose = require('mongoose')

const elevesSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        required: true
    },
    mdp: {
        type: String,
        required: true
    },
    elo: {
        type: String,
        required: true
    },
    maison: {
        type: String,
        required: true
    },
    nbPartiesJoue: {
        type: String,
        required: true
    },
    nbPartiesGagne: {
        type: String,
        required: true
    },
    idEcole: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Eleves', elevesSchema)

/*

    section: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        required: true
    },
    mdp: {
        type: String,
        required: true
    },
    elo: {
        type: String,
        required: true
    },
    maison: {
        type: String,
        required: true
    },
    nbPartiesJoue: {
        type: String,
        required: true
    },
    nbPartiesGagne: {
        type: String,
        required: true
    },
    idEcole: {
        type: String,
        required: true
    },

    */