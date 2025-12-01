const express =require('express');
const router =express.Router();
const virtualizationEnvCtr = require("../controllers/labCtr");

router.post("/addaddVirtEnv", virtualizationEnvCtr.addVirtEnv);
router.get("/getVirtEnv/:id", virtualizationEnvCtr.getVirtEnvById);
router.get("/getUserLabEnv/:id",virtualizationEnvCtr.getUserLabEnv);
router.get("/getAllInternLabs",virtualizationEnvCtr.getAllInternLabs);

router.get("/getMentorLabs/:id", virtualizationEnvCtr.getMentorLabs);
router.get("/getLabsByOffer/:id", virtualizationEnvCtr.getLabsByOffer);
router.put("/approve/:id", virtualizationEnvCtr.approveLab);
router.put("/managerApprove/:id", virtualizationEnvCtr.managerApproveLab);
router.put("/decline/:id", virtualizationEnvCtr.declineLab);

module.exports = router;




































/*router.post('/add',async(req,res)=>{try{
   data=req.body;
   lab= new Lab(data);
 savedlab= await lab.save();
 res.status(200).send(savedlab);
 
 } catch(error){
 
 res.status(400).send(error)
 }
 
 
 })
 
 
 router.get('/all',async(req,res)=>{try{
    labs=await Lab.find();
    res.status(200).send(labs);
 
 
 } catch(error){
 
 res.status(400).send(error)
 }
 
 
 })
 
 
 router.get('/getbyid/:id',async(req,res)=>{try{
    id= req.params.id;
    lab=await Lab.findById({_id:id});
    res.status(200).send(user);
 
 
 } catch(error){
 
 res.status(400).send(error)
 }
 
 
 })
 
 
 router.delete('/del/:id',async(req,res)=>{try{
    id= req.params.id;
    dellab=await Lab.findByIdAndDelete({_id:id});
    res.status(200).send(dellab);
 
 
 } catch(error){
 
 res.status(400).send(error)
 }
 
 
 })
 
 router.put('/update/:id',async(req,res)=>{try{
    id= req.params.id;
    newlab=req.body;
    updatelab =await Lab.findByIdAndUpdate({_id:id} , newlab);
    res.status(200).send(updatelab);
 
 
 } catch(error){
 
 res.status(400).send(error)
 }
 
 
 })

*/









