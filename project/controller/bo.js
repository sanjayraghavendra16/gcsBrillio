const { Existing } = require("../boSchema");
const { Timesheet } = require("../boSchema");
const { Project } = require("../boSchema");
const { category1 } = require("../boSchema");

const router = require("express").Router();


//existing allocations 
router.get("/get-all-data-existingAllocations", async (req, res) => {
    const allRequest = await Existing.find();
    res.send(allRequest);
  });
router.post("/add-data-existingAllocations", async (req, res) => {
    try {
      const { Type,categoryType, Practice, ProjectID,Project, Region, Customer, PManager, DManager, description, Cc, status} = req.body;

      const exist = await Existing.create({
        Type: Type,
        categoryType: categoryType,
        Practice:Practice ,
        ProjectID: ProjectID,
        Project:Project,
        Region:Region,
        Customer:Customer,
        PManager: PManager,
        DManager:DManager,
        description:description,
        Cc:Cc,
      status:status,
      });
      
      res.send(exist);
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/existingAllocationsupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Existing.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });

    router.delete("/existingAllocationsdelete", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Existing.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"existing allocations deleted Successfully"})
        }
        });

//timesheet  
router.get("/get-all-data-timesheet", async (req, res) => {
    const allRequest = await Timesheet.find();
    res.send(allRequest);
  });
router.post("/add-data-timesheet", async (req, res) => {
    try {
      const { Type,categoryType, Practice, description,Cc, status } = req.body;
    
      const timesheet = await Timesheet.create({
        Type: Type,
        categoryType: categoryType,
        Practice:Practice ,
        description: description,
      Cc:Cc,
      status:status,
      });
      
      res.send(timesheet);
    } catch (error) {
      console.log(error);

    }
  
  });
  router.post("/timesheetupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Timesheet.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });

    router.delete("/timesheetdelete", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Timesheet.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"timesheet deleted Successfully"})
        }
        });


//projectcreations
router.get("/get-all-data-projectcreation", async (req, res) => {
    const allRequest = await Project.find();
    res.send(allRequest);
  });
router.post("/add-data-projectcreation", async (req, res) => {
    try {
      const { Type,categoryType, Practice, Region, PManager,description,Cc, status } = req.body;
    
      const project = await Project.create({
        Type: Type,
        categoryType: categoryType,
        Practice:Practice ,
        Region:Region ,
        PManager:PManager,
        description: description,
        Cc:Cc,
        status:status,
      });
      
      res.send(project);
    } catch (error) {
      console.log(error);
    }
  
  });
  router.post("/projectcreationupdate", async (req, res) => {
    const { id } = req.query;
    //const {titleupdate}  =req.body; 
    const{ description} = req.body;
    if(!id){
        return res.status(404).send({
            status:false,
            message:"id is required"
        });
    } else{
    const title1 = await Project.findOneAndUpdate({_id:id},{description:description}
    )
    return res.status(500).send({
        status:true,
        message:"description updated Successfully"})
     }
    });

    router.delete("/projectcreationdelete", async (req, res) => {
        const { id } = req.query;
        if(!id){
            return res.status(404).send({
                status:false,
                message:"id is required"
            });
        }else{
        const title1 = await Project.findOneAndDelete({
            _id:id
        })
        return res.status(500).send({
            status:true,
            message:"project creation deleted Successfully"})
        }
        });

//all business operations
router.get("/get-bo", async (req, res) => {
    const { filter } = req.query;
    const ExistingAllocationsRequest = await Existing.find({
      categoryType: filter,
    });
    const TimesheetRequest = await Timesheet.find({
      categoryType: filter,
    });
    const ProjectCreationRequest = await Project.find({
      categoryType: filter,
    });
    res.send({
      status: true,
      ExistingAllocationList: ExistingAllocationsRequest,
      TimesheetList: TimesheetRequest,
      ProjectCreationList: ProjectCreationRequest,
    });
  });

module.exports = router;