const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationEmail } = require('../../utils/validators/validations')
const { setError } = require('../../utils/error/error')
require('dotenv').config();
const adminPassword = process.env.ADMIN_PASSWORD;

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
}, { timestamps: true, collection: 'users'})

userSchema.pre("save", function (next) {
    if (!validationEmail(this.email)) { 
        return next(setError(400, "El email debe cumplir el patrón, ejemplo@ejemplo.com"))
    }
    if (adminPassword === this.password) { 
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    } else {
        return next (setError(400, "Si quiere ser admin, mande un correo electrónico a kimetsuapi@gmail.com y nos pondremos en contacto con usted."))
    }  
});

const User = mongoose.model('users', userSchema)
module.exports = User