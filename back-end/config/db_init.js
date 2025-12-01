const User = require("../models/user");
const Docs = require("../models/adDocs");
const { hashPassword } = require("../tools/password_utility")

async function init_stagiaire_account(){
//     console.log('-------- INIT STAGIAIRE ACCOUNT -----------')
//     try {
//         const exist_admins = await User.find({ email : 'user@mail.com' });
//         if(exist_admins.length > 0){
//             return;
//         }
//         const hashed_password = await hashPassword('Connect*123');
//         await User.create({
//             email : 'user@mail.com',
//             firstName : 'user',
//             lastName : 'user',
//             role : 'STAGIAIRE',
//             password : hashed_password,
//             isEnabled : true
//         });
//         console.log("----- STAGIAIRE ACCOUNT CREATED ------");
//     } catch (error) {
//         console.log("Error while init user account", error)
//     }
}
async function init_stagiaire_docs(){
    console.log('-------- INIT STAGIAIRE docs -----------')
    try {
        const users = await User.find();
        
        for (let i=0; i<users.length;i++){
            await Docs.create({
                user : users[i]._id,
                demande_stage : '',
                cin : '',
                lettre_affectation : '',
                fiche_presence : '',
                rapport : '',
                attestation : ''
            });
            console.log("----- STAGIAIRE DOC CREATED ------");
        }
    } catch (error) {
        console.log("Error while init user docs", error)
    }
}


module.exports = { init_stagiaire_account ,init_stagiaire_docs}
