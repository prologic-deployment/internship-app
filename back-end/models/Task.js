const mongoose = require('mongoose');
const {TaskStatus,TaskPriority } = require('../models/enum');
const taskSchema = mongoose.Schema({
    title: {type:String ,required:true},
    description: {type:String ,required:true},
    status: { type: String, enum: Object.values(TaskStatus) ,default : TaskStatus.PENDING},
    startDate: {type: Date ,required: true},
    endDate:  {type: Date ,required: true},
    closedAt: {type: Date},
    internshipOffer: { type: mongoose.Schema.Types.ObjectId, ref: 'InternshipOffer', required: true},
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' || String }, // Référence au stagiaire
    progress: { type: String, default: "0" }, // Avancement de la tâche par le stagiaire (0-100%)
    priority: { type: String,enum: Object.values(TaskPriority)}, 
});

module.exports = mongoose.model('Task', taskSchema);
