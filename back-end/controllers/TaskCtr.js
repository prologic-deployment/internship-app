const InternshipOffer = require('../models/InternshipOffer');
const Task = require('../models/Task');

require('dotenv').config();

module.exports.findAll = async (req, res, next) =>{
    try {
        const tasks = await Task.find()
        .populate('internshipOffer assignedTo')
        return res.status(200).send({ message : 'Tasks retrieved successfully', data : tasks })
    } catch (error) {
        next(error)
    }
}
module.exports.findUserTasks = async (req, res, next) =>{
    const userId = req.params.id
    try {
        const tasks = await Task.find({
            assignedTo : userId || null
        })
        .populate('internshipOffer assignedTo')
        return res.status(200).send({ message : 'Tasks retrieved successfully', data : tasks })
    } catch (error) {
        next(error)
    }
}
module.exports.findTaskById = async (req, res, next) =>{
    const taskId = req.params.id

    try {
        const task = await Task.findById(taskId)
        .populate('internshipOffer assignedTo')
        return res.status(200).send({ message : 'Task retrieved successfully', data : task })
    } catch (error) {
        next(error)
    }
}

module.exports.changeTaskProgress = async (req, res, next) =>{
    const offerId = req.params.id
    const progress = req.body.progress
    let task
    try {
        if (progress == 100){
            task = await Task.findByIdAndUpdate(offerId,{
                progress : req.body.progress ,
                status : "COMPLETED",
                closedAt : Date.now()
            });
        }else if (progress <= 100 || progress >= 0) {
            task = await Task.findByIdAndUpdate(offerId,{
                progress : req.body.progress,
                status : "IN_PROGRESS"
            });
        }
        const updatedTask = await Task.findById(task._id).populate('internshipOffer assignedTo');
  
        await updateProjectProgress(updatedTask.internshipOffer._id.toString());
        return res.status(200).send({ message : 'Task progress updated successfully', data : updatedTask })
    } catch (error) {
        next(error)
    }
}



module.exports.findTasksByOffer = async (req, res, next) =>{
    const offerId = req.params.id
    try {
        const tasks = await Task.find({internshipOffer : offerId})
        return res.status(200).send({ message : 'Task retrieved successfully', data : tasks })
    } catch (error) {
        next(error)
    }
}


module.exports.delete = async (req, res, next) =>{
    const taskId = req.params.id
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if(!task){
            throw Error("Task not found");
        }
        await Task.findByIdAndDelete(taskId);
        await updateProjectProgress(task.internshipOffer._id.toString());
        return res.status(200).send({ message : 'Task deleted successfully', data : { _id : req.params.id } })
    } catch (error) {
        next(error)
    }
}

module.exports.update = async function (req, res, next) {
    const taskId = req.params.id;
    try {
        const body  = {...req.body};
        const task = await Task.findByIdAndUpdate(taskId, { $set: body }, { new : true });
        await updateProjectProgress(task.internshipOffer._id.toString());
        const updatedTask = await Task.findById(task._id).populate('internshipOffer assignedTo');
        return res.status(200).json({ message: "Task updated successfully", data : updatedTask });
    } catch (error) {
        next(Error("Error while updating task"));
    }
}

module.exports.create = async function (req, res, next) {
    try {
        const body = {...req.body}
        const task  = await Task.create(body)
        await updateProjectProgress(task.internshipOffer._id.toString());
        return res.status(201).send({ message : "Task saved successfully", data : task });
    } catch (error) {
        console.error(error);
        next(Error("Error while saving task"))
    }
};

module.exports.findEngineerTasks = async (req, res, next)=>{
    try {
        const pending = await findTasks({ Status : 'Pending', Executor : req.params.userId  }, true)
        const closed = await findTasks({ Status : 'Closed', Executor : req.params.userId  }, true)
        const all = await findTasks({ Executor : req.params.userId  }, true);
        const tasks = { 
            pending : pending.total,
            closed : closed.total,
            all : all.total
         }
        return res.status(200).send({ message : 'Tasks retrieved successfully', data : tasks })
    } catch (error) {
        
    }
}

async function updateProjectProgress(projectId){
    const projectTasksAll = await Task.find({ internshipOffer : projectId });
    const project = await InternshipOffer.findById(projectId);
    const projectTasksCompleted = await Task.find({ internshipOffer : projectId, Status : "COMPLETED" });
    const percentage = Math.round((projectTasksCompleted.length/projectTasksAll.length)*100);
    if(percentage >= 100){
        await InternshipOffer.findByIdAndUpdate({_id : projectId}, { $set: { progress : 100, closedAt : Date.now() } }, { new : true });
    }else{
        await InternshipOffer.findByIdAndUpdate({_id : projectId}, { $set: { progress : percentage } }, { new : true });
    }
}
// global method
async function findTasks(filter, multiple){ 
    let query = {};
    if(filter.id) query._id = filter.id;
    if(filter.Status) query.Status = filter.Status;
    if(filter.Project) query.Project = filter.Project;
    if(filter.Title) query.Title = { $regex : filter.Title, $options : 'i' };
    //suppose roles are separated by a dash -
    if(filter.Executor) query.Executor = { $in : filter.Executor.split('-') };
    if (filter.TeamLeader) query.TeamLeader = filter.TeamLeader;
    if (filter.Status) query.Status = filter.Status;
    try {
        const request = multiple ? 
        Task.find(query): 
        Task.findOne(query);
        const tasks = await request
        .populate({
            path : 'Project',
            populate : [
                { 
                    path : 'TeamLeader',
                    select : '-password -isEnabled'
                },
                { 
                    path : 'equipe',
                    select : '-password -isEnabled'
                },
                { 
                    path : 'client',
                    select : '-password -isEnabled'
                }
            ]
        })
        .populate({
            path : 'Executor',
            select : '-password -isEnabled'
        })
        const total = await Task.countDocuments(query);
        return { tasks, total};
    } catch (error) {
      throw Error("Error white getting tasks")
    }
  }
