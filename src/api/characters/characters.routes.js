const CharacterRoutes = require('express').Router()
const { isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/files')
const { postNewCharacter, getAllCharacters, getRaceCharacters, getGenderCharacters , getAffiliationCharacters, getCharacterByName, getCharacterById, patchCharacter} = require('./characters.controller')


CharacterRoutes.get('/', getAllCharacters)
CharacterRoutes.get('/:id', getCharacterById)
CharacterRoutes.get('/name/:id', getCharacterByName)
CharacterRoutes.get('/race/:id', getRaceCharacters)
CharacterRoutes.get('/gender/:id', getGenderCharacters)
CharacterRoutes.get('/affiliation/:id', getAffiliationCharacters)


CharacterRoutes.post('/', [isAdmin], upload.single('img'), postNewCharacter)
CharacterRoutes.patch('/:id', [isAdmin], upload.single('img'), patchCharacter)




module.exports = CharacterRoutes