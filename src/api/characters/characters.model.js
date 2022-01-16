const mongoose = require('mongoose');
const Schema =mongoose.Schema

const CharacterSchema = new Schema({
    name: {type: String, required: true, trim:true},
    img: {type: String, required: true, trim:true},
    gender: {type: String, required: true, trim:true},
    age: {type: Number, required: true, trim:true},
    race: {type: String, required: true, trim:true},
    affiliation: {type: String, required: true, trim:true},
    breathing: {type: String, trim:true},
    rank: {type: String, trim:true},
    pillar: {type: Boolean, trim:true},
    isAlive: {type: Boolean, required: true, trim:true},
}, {timestamps: true})

const CHaracter = mongoose.model('characters', CharacterSchema)
module.exports = CHaracter