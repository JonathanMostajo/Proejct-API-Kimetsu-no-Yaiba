const Character = require("./characters.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character();
    newCharacter.name = req.body.name;
    newCharacter.gender = req.body.gender;
    newCharacter.age = req.body.age;
    newCharacter.race = req.body.race;
    newCharacter.affiliation = req.body.affiliation;
    newCharacter.breathing = req.body.breathing;
    newCharacter.rank = req.body.rank;
    newCharacter.pillar = req.body.pillar;
    newCharacter.isAlive = req.body.isAlive;
    if (req.file) {
      newCharacter.img = req.file.path;
    }
    const characterDB = await newCharacter.save();
    return res.status(201).json(characterDB);
  } catch (error) {
    return next(setError(500, "Character not saved"));
  }
};

const getAllCharacters = async (req, res, next) => {
  try {
    const charactersDB = await Character.find();
    res.status(200).json(charactersDB);
  } catch (error) {
    return next(setError(500, "All Character failed server"));
  }
};

const getRaceCharacters = async (req, res, next) => {
  try {
    const { id } = req.params;
    const charactersDB = await Character.find({ race: id });
    console.log(charactersDB);
    res.status(200).json(charactersDB);
  } catch (error) {
    return next(setError(500, "Filtered Character failed server"));
  }
};

const getGenderCharacters = async (req, res, next) => {
  try {
    const { id } = req.params;
    const charactersDB = await Character.find({gender: id}); 
    console.log(id) 
    /* if (id != req.params.id) {
        return next(setError(404, 'Gender not found'))
    }
    return */ res.status(200).json(charactersDB);
  } catch (error) {
    return next(setError(500, "Filtered gender failed server"));
  }
};

const getAffiliationCharacters = async (req, res, next) => {
  try {
    const { id } = req.params;
    const charactersDB = await Character.find({ affiliation: id });
    console.log(charactersDB);
    res.status(200).json(charactersDB);
  } catch (error) {
    return next(setError(500, "Affiliaion Character failed server"));
  }
};

const getCharacterByName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterDB = await Character.findOne({ name: id });
    if (!characterDB) {
      return next(setError(404, "Character not found"));
    }
    return res.status(200).json(characterDB);
  } catch (error) {
    return next(setError(500, "Single Character server error"));
  }
};

const getCharacterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterDB = await Character.findById(id);
    if (!characterDB) {
      return next(setError(404, "Character not found"));
    }
    return res.status(200).json(characterDB);
  } catch (error) {
    return next(setError(500, "Single Character server error"));
  }
};

const patchCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchCharacter = new Character(req.body);
    patchCharacter._id = id;
    if (req.file) {
      patchCharacter.img = req.file.path;
    }
    const characterDB = await Character.findByIdAndUpdate(id, patchCharacter);
    if (!characterDB) {
      return next(setError(404, "Character not found"));
    }
    if (characterDB.img) deleteFile(characterDB.img);
    return res.status(200).json({ new: patchCharacter});
  } catch (error) {
    return next(setError(500, "Character Patch server error"));
  }
};

module.exports = {
  postNewCharacter,
  getAllCharacters,
  getRaceCharacters,
  getGenderCharacters,
  getAffiliationCharacters,
  getCharacterByName,
  getCharacterById,
  patchCharacter,
};
