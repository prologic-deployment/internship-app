const mongoose = require('mongoose');
const { InternStatus } = require('./enum');
let avatar ="User.jpg"

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already in use"],
      },    
    password: { type: String },
    role: { type: String, default:"STAGIAIRE" },
    image: { type: String ,default: avatar},
    FS: { type: String},
    birthDate: { type: Date},
    address: { type: String},
    departement: { type: String},
    university: { type: String},
    diploma: { type: String},
    gender: { type: String },
    isEnabled: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    cv: { type: mongoose.Schema.Types.ObjectId, ref: "Cv" },
    status: { type: String, enum: Object.values(InternStatus) },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    bio: { type: String},
    pfe_year: { type: String},
    archived: { type: Boolean, default: false} 

},
{ timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);


